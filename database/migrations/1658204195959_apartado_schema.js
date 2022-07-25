'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApartadoSchema extends Schema {
  up () {
    this.create('apartados', (table) => {
      table.increments()
      table.integer('Queseria_id').unsigned().references('_id').inTable('queserias')
      table.timestamps()
    })
  }
  down () {
    this.drop('apartados')
  }
}

module.exports = ApartadoSchema
