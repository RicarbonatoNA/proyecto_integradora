'use strict'

const auth = require("@adonisjs/auth");
const { queryWithOutScopes } = require("../../Models/User");

const Apartado = use('App/Models/Apartado');
const Queseria = use('App/Models/Queseria');
const AutorizacionService = use('App/Services/AutorizacionService');

class ApartadoController {
    async get({auth, request, params}){
        const user = await auth.getUser(); 
        const {_id} = params;
        const queso = await Queseria.find(_id) 
        return await queso.apartados().fetch()
    }

    async create({auth, request, params}){
        const user = await auth.getUser();
        const {nombre_apartado} = request.all();
        const {descripcion} = request.all();
        const {_id}= params;
        const Queso = await Queseria.find(_id);
        const A = new Apartado();
        A.fill({
            nombre_apartado,
            descripcion
        });
        await Queso.apartados().save(A)
        return A
    }

    async destroy({params}){
        const {_id}= params;
        const apar = await Apartado.find(_id)
        await apar.delete();
        return apar
    }
}

module.exports = ApartadoController
