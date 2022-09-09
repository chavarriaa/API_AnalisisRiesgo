module.exports = function({Id,ValorMaximo, ValorMinimo, Descripcion,AccionTomar}) {
 let db = 'NivelRiesgos';
    return ({
        Id,ValorMaximo,ValorMinimo,Descripcion,AccionTomar,
        queryGet:`SELECT * FROM ${db};`,
        queryGetByID:`SELECT * FROM ${db} WHERE Id=@Id;`,
        queryInsert:`INSERT INTO ${db} 
            (Nivel,Puntaje,Descripcion) VALUES 
            (@Nivel,@Puntaje,@Descripcion)`,
        queryUpdate:`UPDATE ${db} SET 
            ValorMaximo=@ValorMaximo,
            ValorMinimo=@ValorMinimo,
            Descripcion=@Descripcion,
            AccionTomar=@AccionTomar,
            WHERE Id=@Id`,
        queryDelete:`DELETE FROM ${db} WHERE Id=@Id`,
    })
}