'use strict'
const Apartado = use('App/Models/Apartado');
const Sensor = use('App/Models/Sensor');

class SensorController {
    async get({params}){
        const {_id}= params;
        const apart = await Apartado.find(_id);
        return await apart.sensores().fetch();
    }

    async create({request, params,response}){
        const input = request.all();
        try{
        const {nombre_sensor} = request.all();
        const {tipo} = request.all();
        const {descripcion} = request.all();
        const {values} = request.all();
        const {imagen} = request.all();

        const {_id} = params;

        const apar = await Apartado.find(_id);
        const Sen = new Sensor();
        Sen.fill({
            nombre_sensor,
            tipo,
            descripcion,
            values,
            imagen
        });
        await apar.sensores().save(Sen)
        return response.status(200).json({
            status:'ok',
            message:'Exito!! sensor Registrado'
        });
        }catch(error){
            response.status(403).json({
                status:'error',
                message:'Valio Queso!! No se pudo registrar'
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
                message:'Valio Queso!! No se pudo Eliminar'
            });

        }
    }
}

module.exports = SensorController
