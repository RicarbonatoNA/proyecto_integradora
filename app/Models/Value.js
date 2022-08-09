'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Value extends Model {
    Sensores(){
        return this.belongsTo('App/Models/Sensor')
    }
}

module.exports = Value
