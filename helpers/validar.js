const validarArticulo = async (parametros) => {
    let validar_titulo = !validator.isEmpty(parametros.titulo);
    let validar_contenido = !validator.isEmpty(parametros.contenido);

    if (!validar_titulo || !validar_contenido) {
        throw new Error("No se han validado los datos ingresados");
    }
}

module.exports = {
    validarArticulo
}