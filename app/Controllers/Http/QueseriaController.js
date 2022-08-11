'use strict'
const queseria = use('App/Models/Queseria');
const AutorizacionService = use('App/Services/AutorizacionService');
const { validateAll, validate } = use ('Validator')


class QueseriaController {
    async index({ auth}){
        const user = await auth.getUser();
        return await user.queserias().fetch();
    }

    async create ({auth, request, response}){
        try{
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
            //Validaciones (NO FUNCIONA, RECUERDA REVISARLO)
            const validation = await validate(request.all(), {
            'nombre_queseria': 'required|min:3|max:100',
            'telefono': 'required|min:7|max:10',
            'direccion': 'required|min:3|max:100',
            'horarios': 'required|min:3|max:100',
            'descripcion': 'required|min:3|max:300'
            })

            if(validation.fails()){
                return validation.messages();
            }

            await user.queserias().save(quese);
            return quese;
            
        }
        catch (error){
            console.log(error.message)
            response.status(403).json({
                status: 'error',
                debug_error: error.message,
            })
        }
        
    }

    async destroy ({auth, params}){
        const user = await auth.getUser();
        const {_id} = params;
        const quese = await queseria.find(_id);
        AutorizacionService.verificarPermiso(quese);
        await quese.delete();
        return quese;
    }

    async update({auth, params, request,response}){
        try{
            const user = await auth.getUser();
            const {id} = params;
            const quese = await queseria.find(id);
            AutorizacionService.verificarPermiso(quese);
            quese.merge(request.only(['nombre_queseria', 'telefono', 'direccion', 'horarios', 'descripcion']));
            await user.queserias().save(quese);
            return response.json({
                message:"Exito!! Queseria Actualizada"
            });
        }catch(error){
            message: error.message

        }
    }


    async Queseria({params}){
        const {id} = params;
        const quese = await queseria.find(id);
        return quese
    }
}

module.exports = QueseriaController
