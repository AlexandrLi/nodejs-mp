const City = require('../models/City');

module.exports = {
  getCities,
  addCity,
  updateCity,
  deleteCity,
};

function getCities(req, res) {
  City.find((err, cities) => {
    if (err) {
      res.status(500).json({message: 'Unexpected error'});
    } else {
      res.json(cities);
    }
  });
}

function addCity(req, res) {
  const newCity = City(req.swagger.params.city.value);

  newCity.save(function(err, city) {
    if (err || !city) {
      console.log(err);

      res.status(500).json({message: 'Unexpected error'});
    } else {
      res.json(newCity);
    }
  });
}

function updateCity(req, res) {
  const cityId = req.swagger.params.cityId.value;
  const newCity = req.swagger.params.city.value;

  City.findByIdAndUpdate(
    cityId,
    newCity,
    {upsert: true, new: true, setDefaultsOnInsert: true},
    function(err, city) {
      if (err) {
        res.status(404).json({message: 'not found'});
      } else {
        res.json(city);
      }
    }
  );
}

function deleteCity(req, res) {
  const cityId = req.swagger.params.cityId.value;
  City.findByIdAndDelete(cityId, (err, city) => {
    if (err || !city) {
      res.status(404).json({message: 'not found'});
    } else {
      res.json(city);
    }
  });
}
