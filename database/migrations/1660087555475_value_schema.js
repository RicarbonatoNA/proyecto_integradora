'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ValueSchema extends Schema {
  up () {
    this.create('values', (table) => {
      table.increments()
      table.timestamps()
      table.integer('Sensor_id').unsigned().references('_id').inTable('sensors')
    })
  }

  down () {
    this.drop('values')
  }
}

module.exports = ValueSchema
