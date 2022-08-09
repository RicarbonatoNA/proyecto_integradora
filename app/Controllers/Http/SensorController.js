'use strict'
const Apartado = use('App/Models/Apartado');
const Sensor = use('App/Models/Sensor');
const { validateAll, validate } = use ('Validator')

class SensorController {
    async get({params}){

        const {_id}= params;
        const apart = await Apartado.find(_id)
        return await apart.Sensores().fetch()
    }

    async create({request,response, params}){
        
        try{
        
        const {nombre_sensor} = request.all()
        const {tipo} = request.all();
        const {pines} = request.all();
        const {descripcion} = request.all();
        const values= []
        const {imagen} = request.all();
        const {_id} = params;
        
        const apar = await Apartado.find(_id)

        console.log("request: ",request.all())
        let Sen = new Sensor()

        Sen.nombre_sensor = nombre_sensor
        Sen.tipo = tipo
        Sen.pines = pines
        Sen.descripcion = descripcion
        Sen.values= values
        Sen.imagen = imagen
        console.log(request.all())
        
        let success = await apar.Sensores().save(Sen)
        console.log("Sen: ",Sen)
        return response.status(200).json({
            status:'ok',
            success: success,
            message: 'Se a creado con exito!'

        });
        }catch(error){
            response.status(403).json({
                status:'error',
                message: error.message
            });
        }
    }

    async destroy({params, response}){
        try {
        const {_id}= params;
        const sen = await Sensor.find(_id)
        await sen.delete();
        return response.status(200).json({
            status:'ok',
            message:'Sensor '+ sen.nombre_sensor + ' Eliminado !!'
        });
        }catch(error){
            response.status(403).json({
                status:'error',
                message:error.message
            });
        }
    }

    async update({params, response, request}){
        try{
        const {_id}= params;
        const sen = await Sensor.find(_id);
        sen.merge(request.only([
            'nombre_sensor',
            'tipo',
            'pines',
            'values',
            'descripcion',
            'imagen'
        ]));
        await sen.save(sen)
        return response.json({
            message: 'Exito!! '+  sen.nombre_sensor + ' Actualizado'
        });

        }catch(error){
            response.json({
                message: error.message
            });
        }
    }

    async DatosSensor({params,response}){
        try {
        const {_id}= params;
        const sen = await Sensor.find(_id);
        return sen

        }catch(error){
            response.json({
                message: error.message
            });
        }   
    }
}

module.exports = SensorController
