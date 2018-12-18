import fs from "fs";

export default class DirWatcher {
  watch(path, delay) {
    let debounce = {};
    let isFirstRun = true;

    const watcher = fs.watch(path, (e, file) => {
      if (isFirstRun && watcher.listenerCount("changed") > 0) {
        isFirstRun = false;
        fs.readdirSync(path).forEach(file => {
          this.emitEvent(watcher, path, file, debounce, delay);
        });
      } else if (file && e === "change") {
        this.emitEvent(watcher, path, file, debounce, delay);
      }
    });
    return watcher;
  }

  emitEvent(watcher, path, file, debounce, delay) {
    if (debounce[file]) return;
    debounce[file] = setTimeout(() => {
      debounce[file] = false;
    }, delay);
    console.log("Emit event for", path + file);
    watcher.emit("changed", path + file);
  }
}
