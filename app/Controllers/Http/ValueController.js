'use strict'
const Sensor = use('App/Models/Sensor');
const Value = use ('App/Models/Value')

class ValueController {
    async get({params}){
        const {_id}= params;
        const sen = await Sensor.find(_id)
        return await sen.Values().fetch()

    }


    async Create({request,response, params}){
    try{
        const {value}= request.all()
        const {_id}=params;

        const sensor = await Sensor.find(_id)

        let sen = new Value()
        sen.value = parseFloat(value);
        let success = await sensor.Values().save(sen)
        return response.status(200).json({
            status:'ok',
            success: success,
            message:"success!"

        });

    }catch(error){
        response.status(403).json({
            status:'error',
            message: error.message
        });

    }

    }
}

module.exports = ValueController
