module.exports = function({Id,Nombre,AfectaCosto,ValorCosto,AfectaTiempo,AfectaAlcance,AfectaCalidad,IdPosibilidad,IdImpacto}) {
 let db= 'Riesgos';
    return ({
        Id,Nombre,AfectaCosto,ValorCosto,AfectaTiempo,AfectaAlcance,AfectaCalidad,IdPosibilidad,IdImpacto,
        queryGet:`SELECT 
            R.Id,
            R.Nombre,
            R.AfectaCosto,
            R.ValorCosto,
            R.AfectaTiempo,
            R.AfectaAlcance,
            R.AfectaCalidad,
            R.IdPosibilidad,
            P.Puntaje 'PuntajePosibilidad',
            P.Nivel 'NivelPosibilidad',
            R.IdImpacto,
            I.Nivel 'NivelImpacto',
            I.Puntaje 'PuntajeImpacto',
            I.Puntaje * P.Puntaje 'NivelRiesgo'
        FROM ${db} R
        INNER JOIN Impactos I
            ON R.IdImpacto = i.Id
        INNER JOIN Posibilidades P
            ON R.IdPosibilidad = P.Id;`,
        queryGetByID:`SELECT 
            R.Id,
            R.Nombre,
            R.AfectaCosto,
            R.ValorCosto,
            R.AfectaTiempo,
            R.AfectaAlcance,
            R.AfectaCalidad,
            R.IdPosibilidad,
            P.Puntaje,
            P.Nivel,
            R.IdImpacto,
            I.Nivel,
            I.Puntaje,
            I.Puntaje * P.Puntaje 'NivelRiesgo'
         FROM ${db} R
            INNER JOIN Impactos I
                ON R.IdImpacto = i.Id
            INNER JOIN Posibilidades P
                ON R.IdPosibilidad = P.Id Id=@Id
        where R.Id=@Id;`,
        queryInsert:`INSERT INTO ${db} 
            (Nombre,AfectaCosto,ValorCosto,AfectaTiempo,AfectaAlcance,AfectaCalidad,IdPosibilidad,IdImpacto) VALUES 
            (@Nombre,@AfectaCosto,@ValorCosto,@AfectaTiempo,@AfectaAlcance,@AfectaCalidad,@IdPosibilidad,@IdImpacto)`,
        queryUpdate:`UPDATE ${db} SET 
            Nombre=@Nombre,
            AfectaCosto=@AfectaCosto,
            ValorCosto=@ValorCosto,
            AfectaTiempo=@AfectaTiempo,
            AfectaAlcance=@AfectaAlcance,
            AfectaCalidad=@AfectaCalidad,
            IdPosibilidad=@IdPosibilidad,
            IdImpacto=@IdImpacto
            WHERE Id=@Id`,
        queryDelete:`DELETE FROM ${db} WHERE Id=@Id`,
    })
}