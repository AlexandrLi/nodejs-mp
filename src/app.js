import path from "path";
import config from "../config/config.json";
import Models from "./models";
import DirWatcher from "./services/dirwatcher";
import Importer from "./services/importer";

console.log(config.name);
const user = new Models.User();
const product = new Models.Product();

const folderPath = path.join(__dirname, "../data/");

const dirWatcher = new DirWatcher();
const watcher = dirWatcher.watch(folderPath, 1000);
console.log("Subscribe to dirWatcher");
const importer = new Importer(watcher);

console.log("Start importing data synchronously");
const filePath = path.join(folderPath, "products_1.csv");
console.log(importer.importSync(filePath));
console.log("Finish importing data synchronously");
