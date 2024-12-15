const mongose = require("mongoose")

const connection = async() => {
    try{

        await mongose.connect("mongodb://localhost:27017/mi_blog")

        console.log("Conectado correctamente a la base de datos mi_blog")
        //parametros a pasar dentro de un objeto /Solo en caso de aviso
        //useNewUrlParser: true
        //useUnifiedTopology: true
        //useCreateIndex: true

    }catch(error){
        console.log(error)
        throw new Error("No se ha podido ingresar a la base de datos")
    }
}

module.exports = {
    connection
}