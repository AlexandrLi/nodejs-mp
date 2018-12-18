import fs from "fs";
import util from "util";
import {parseCsvToJson} from "../utils";

export default class Importer {
  constructor(subscription) {
    subscription.on("changed", path => {
      this.import(path).then(data =>
        console.log(parseCsvToJson(data.toString()))
      );
    });
  }

  import(path) {
    const readFileAsync = util.promisify(fs.readFile);
    return readFileAsync(path);
  }

  importSync(path) {
    const data = fs.readFileSync(path);
    return parseCsvToJson(data.toString());
  }
}
