module.exports = function({Id,Nivel, Puntaje, Descripcion}) {
 let db= 'Impacto';
    return ({
        Id,Nivel,Puntaje,Descripcion,
        queryGet:`SELECT * FROM ${db};`,
        queryGetByID:`SELECT * FROM ${db} WHERE Id=@Id;`,
        queryInsert:`INSERT INTO ${db} 
            (Nivel,Puntaje,Descripcion) VALUES 
            (@Nivel,@Puntaje,@Descripcion)`,
        queryUpdate:`UPDATE ${db} SET 
            Nivel=@Nivel,
            Puntaje=@Puntaje,
            Descripcion=@Descripcion
            WHERE Id=@Id`,
        queryDelete:`DELETE FROM ${db} WHERE Id=@Id`,
        queryGetForSelects:`SELECT Id 'value',Nivel 'label' ,Puntaje 'puntaje' FROM ${db}`,
    })
}