'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
    models.Product.hasMany(models.Review);
  };
  return Product;
};
