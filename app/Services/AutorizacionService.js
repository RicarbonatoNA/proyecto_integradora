const { ModelNotFoundException } = require("lucid-mongo/src/Exceptions");
const AccesoProhibidoException = use('App/Exceptions/AccesoProhibidoException')
const RecursoNoEncontradoException = use('App/Exceptions/RecursoNoEncontradoException')

class AutorizacionService {
    verificarPermiso(recurso){
        if (!recurso){
            throw new RecursoNoEncontradoException();
        }

    }
}
module.exports= new AutorizacionService();