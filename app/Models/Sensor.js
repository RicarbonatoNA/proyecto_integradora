'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sensor extends Model {
    Apartado(){
        return this.belongsTo('App/Models/Apartado')
    }
    Values(){
        return this.hasMany('App/Models/Value')
    }
}

module.exports = Sensor
