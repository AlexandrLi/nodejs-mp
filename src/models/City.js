const {getDb} = require('../database');

class City {
  constructor(name, country, capital, location) {
    this.name = name;
    this.country = country;
    this.capital = capital;
    this.location = location;
  }

  static async findAll() {
    try {
      const db = getDb();
      const cities = await db
        .collection('cities')
        .find()
        .toArray();
      return cities;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = City;
