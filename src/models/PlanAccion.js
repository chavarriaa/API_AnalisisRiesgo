module.exports = function({Id,planSeguridad, FechaInicio, FechaFin,Responsable,Auditor,Descripcion}) {
  let db= 'PlanAccion';
     return ({
      Id,planSeguridad, FechaInicio, FechaFin,Responsable,Auditor,Descripcion,
         queryGet:`SELECT * FROM ${db} where planSeguridad = @planSeguridad;`,
         queryGetByID:`SELECT * FROM ${db} WHERE Id=@Id AND  planSeguridad = @planSeguridad ;`,
         queryInsert:`INSERT INTO ${db} 
             (planSeguridad, FechaInicio, FechaFin,Responsable,Auditor,Descripcion) VALUES 
             (@planSeguridad, @FechaInicio, @FechaFin, @Responsable, @Auditor, @Descripcion)`,
         queryUpdate:`UPDATE ${db} SET 
            planSeguridad = @planSeguridad,
            FechaInicio = @FechaInicio,
            FechaFin = @FechaFin,
            Responsable = @Responsable,
            Auditor = @Auditor,
            Descripcion = @Descripcion) VALUES 
            WHERE Id = @Id`,
         queryDelete:`DELETE FROM ${db} WHERE Id=@Id`,
         queryGetForSelects:`SELECT Id 'value',Identificador 'label' FROM ${db}`,
     })
 }