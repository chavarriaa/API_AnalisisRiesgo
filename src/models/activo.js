module.exports = function({Id,Nombre}) {
 let db= 'Activos';
    return ({
        Id,Nombre,
        queryGet:`SELECT * FROM ${db};`,
        queryGetByID:`SELECT * FROM ${db} WHERE Id=@Id;`,
        queryInsert:`INSERT INTO ${db} 
            (Nombre) VALUES 
            (@Nombre)`,
        queryUpdate:`UPDATE ${db} SET 
            Nombre=@Nombre,
            WHERE Id=@Id`,
        queryDelete:`DELETE FROM ${db} WHERE Id=@Id`,
    })
}