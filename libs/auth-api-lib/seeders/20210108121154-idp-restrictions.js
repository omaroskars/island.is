'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('idp_restrictions', [
      {
        name: 'sim',
        description: 'Sim Card',
        helptext: 'Allows users to login with sim cards',
        level: 4,
      },
      {
        name: 'card',
        description: 'Identity Card',
        helptext: 'Allows users to login with identity cards',
        level: 4,
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'idp_restrictions',
      {
        name: 'sim',
      },
      {
        name: 'card',
      },
    )
  },
}
