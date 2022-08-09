module.exports = function({Id,IdRiesgo,IdActivo}){
 let db= 'RiesgosActivos';
    return ({
        Id,IdRiesgo,IdActivo,
        queryGet:`SELECT 
            RA.Id,
            RA.IdRiesgo,
            RA.IdActivo,
            A.Nombre 'NombreActivo'
            From ${db} RA
            INNER JOIN Riesgos R
            ON RA.IdRiesgo = R.Id
            INNER JOIN Activos A
            ON RA.IdActivo = A.Id
            WHERE RA.IdRiesgo = @IdRiesgo;`,
        queryGetByID:`SELECT 
        RA.Id,
        RA.IdRiesgo,
        RA.IdActivo,
        A.Nombre 'NombreActivo'
        From ${db} RA
        INNER JOIN Riesgos R
        ON RA.IdRiesgo = R.Id
        INNER JOIN Activos A
        ON RA.IdActivo = A.Id
        WHERE RA.Id=@Id;`,
        queryInsert:`INSERT INTO ${db} 
            (IdRiesgo,IdActivo) VALUES 
            (@IdRiesgo,@IdActivo);`,
        queryUpdate:`UPDATE ${db} SET 
            IdActivo=@IdActivo,
            WHERE Id=@Id
            AND IdRiesgo=@IdRiesgo;`,
        queryDelete:`DELETE FROM ${db} WHERE Id=@Id AND IdRiesgo=@IdRiesgo;`
    })
}