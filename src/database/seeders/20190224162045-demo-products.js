'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Pen',
          description: 'Ball pen',
          price: 10,
          reviews: [{text: 'Review 1'}],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Pencil',
          description: 'Graphite pencil',
          price: 8,
          reviews: [{text: 'Review 2'}],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'notepad',
          description: 'Simple notepad',
          price: 15,
          reviews: [{text: 'Review 3'}],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
