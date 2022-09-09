module.exports = function({Id,Incidente, Fecha, Descripcion,Responsable}) {
  let db = 'PlanRespuesta';
     return ({
        Id,Incidente, Fecha,Descripcion,Responsable,
         queryGet:`SELECT * FROM ${db} where Incidente = @Incidente;`,
         queryGetByID:`SELECT * FROM ${db} WHERE Id=@Id AND Incidente = @Incidente ;`,
         queryInsert:`INSERT INTO ${db} 
             (Incidente, Fecha,Descripcion,Responsable) VALUES 
             (@Incidente, @Fecha, @Descripcion, @Responsable)`,
         queryUpdate:`UPDATE ${db} SET 
            Incidente = @Incidente,
            Fecha = @Fecha,
            Descripcion = @Descripcion,
            Responsable = @Responsable,

            ) VALUES 
            WHERE Id = @Id`,
         queryDelete:`DELETE FROM ${db} WHERE Id=@Id`,
        
     })
 }