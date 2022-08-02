'use strict'
const Apartado = use('App/Models/Apartado');
const Sensor = use('App/Models/Sensor');

class SensorController {
    async get(){
        const sensores = await Sensor.all()
        return sensores
    }

    async create({request,response}){
        
        try{
        const nombre_sensor = request.input('nombre_sensor');
        const tipo = request.input('tipo');
        const pines = request.input('pines')
        const descripcion = request.input('descripcion')
        const values = request.input('values');
        const imagen = request.input('imagen')
        
        let Sen = new Sensor()
        Sen.nombre_sensor = nombre_sensor
        Sen.tipo = tipo
        Sen.pines = pines
        Sen.descripcion = descripcion
        Sen.values= values
        Sen.imagen = imagen
        let success = await Sen.save()
        return response.status(200).json({
            status:'ok',
            success: success,
            message:'Exito!! sensor Registrado'
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
                message:'Valio Queso!! No se pudo Eliminar'
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
