'use strict'
const queseria = use('App/Models/Queseria');
const AutorizacionService = use('App/Services/AutorizacionService');


class QueseriaController {
    async index({ auth}){
        const user = await auth.getUser();
        return await user.queserias().fetch();
    }

    async create ({auth, request}){
        const user = await auth.getUser();
        const {
            nombre_queseria, 
            telefono,
            direccion,
            horarios,
            descripcion
        } = request.all();
        const quese = new queseria()
        quese.fill({
            nombre_queseria,
            telefono,
            direccion,
            horarios,
            descripcion
        });
        await user.queserias().save(quese);
        return quese;
    }

    async destroy ({auth, params}){
        const user = await auth.getUser();
        const {_id} = params;
        const quese = await queseria.find(_id);
        AutorizacionService.verificarPermiso(quese);
        await quese.delete();
        return quese;
    }

    async update({auth, params, request}){
        const user = await auth.getUser();
        const {id} = params;

        const quese = await queseria.find(id);
        AutorizacionService.verificarPermiso(quese, user);
        quese.merge(request.only('nombre_queseria', 'telefono', 'direccion', 'horarios'));
        await queseria.save();
        return quese;

    }

}

module.exports = QueseriaController
