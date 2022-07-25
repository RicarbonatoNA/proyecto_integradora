'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QueseriaSchema extends Schema {
  up () {
    this.create('queserias', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('_id').inTable('users')
      table.string('nombre_queseria', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('queserias')
  }
}

module.exports = QueseriaSchema
