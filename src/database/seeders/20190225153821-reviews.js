'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Reviews',
      [
        {
          text: 'Review 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          productId: 1,
        },
        {
          text: 'Review 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          productId: 1,
        },
        {
          text: 'Review 3',
          createdAt: new Date(),
          updatedAt: new Date(),
          productId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  },
};
