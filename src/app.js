import config from '../config/config.json';
import Models from './models';

console.log(config.name);
const user = new Models.User();
const product = new Models.Product();
