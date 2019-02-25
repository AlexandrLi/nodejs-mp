'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      text: DataTypes.STRING,
    },
    {}
  );
  Review.associate = function(models) {
    // associations can be defined here
    models.Review.belongsTo(models.Product, {
      onDelete: 'CASCADE',
      foreignKey: 'productId',
      targetKey: 'id',
    });
  };
  return Review;
};
