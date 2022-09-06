module.exports = function({Id,planSeguridad, FechaInicio, FechaFin,ProcesoAfectado,Nombre,Descripcion}) {
  let db= 'Incidentes';
     return ({
        Id,planSeguridad, FechaInicio, FechaFin,ProcesoAfectado,Nombre,Descripcion,
         queryGet:`SELECT * FROM ${db} where planSeguridad = @planSeguridad;`,
         queryGetByID:`SELECT * FROM ${db} WHERE Id=@Id AND planSeguridad = @planSeguridad ;`,
         queryInsert:`INSERT INTO ${db} 
             (planSeguridad, FechaInicio, FechaFin,ProcesoAfectado,Nombre,Descripcion) VALUES 
             (@planSeguridad, @FechaInicio, @FechaFin, @ProcesoAfectado, @Nombre, @Descripcion)`,
         queryUpdate:`UPDATE ${db} SET 
            planSeguridad = @planSeguridad,
            FechaInicio = @FechaInicio,
            FechaFin = @FechaFin,
            ProcesoAfectado = @ProcesoAfectado,
            Nombre = @Nombre,
            Descripcion = @Descripcion) VALUES 
            WHERE Id = @Id`,
         queryDelete:`DELETE FROM ${db} WHERE Id=@Id`,
         queryGetForSelects:`SELECT Id 'value',Identificador 'label' FROM ${db}`,
     })
 }