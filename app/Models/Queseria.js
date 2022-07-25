'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Queseria extends Model {
    user (){
        return this.belongsTo('App/Models/User')
    }

    apartados(){
        return this.hasMany('App/Models/Apartado')
    }
}

module.exports = Queseria
