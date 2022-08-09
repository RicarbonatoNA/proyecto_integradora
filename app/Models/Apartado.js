'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Apartado extends Model {

    Queseria(){
        return this.belongsTo('App/Models/Queseria')
    }

    Sensores(){
        return this.hasMany('App/Models/Sensor')
    }
}

module.exports = Apartado
