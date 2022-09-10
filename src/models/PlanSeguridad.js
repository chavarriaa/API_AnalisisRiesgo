module.exports = function({Id='',Identificador='', FechaInicio='', FechaFin='',CreadoPor='',AutorizadoPor='',Recursos='',Descripcion=''}) {
  let db = 'PlanSeguridad';
     return ({
      Id,Identificador, FechaInicio, FechaFin,CreadoPor,AutorizadoPor,Recursos,Descripcion,
         queryGet:`SELECT * FROM ${db};`,
         queryGetByID:`SELECT * FROM ${db} WHERE Id=@Id;`,
         queryInsert:`INSERT INTO ${db} 
             (Identificador, FechaInicio, FechaFin,CreadoPor,AutorizadoPor,Recursos,Descripcion) VALUES 
             (@Identificador, @FechaInicio, @FechaFin, @CreadoPor, @AutorizadoPor, @Recursos, @Descripcion)`,
         queryUpdate:`UPDATE ${db} SET 
         Identificador =@Identificador,
        FechaInicio = @FechaInicio,
        FechaFin = @FechaFin,
        CreadoPor = @CreadoPor,
        AutorizadoPor = @AutorizadoPor,
        Recursos = @Recursos,
        Descripcion= @Descripcion) VALUES 
        WHERE Id=@Id`,
         queryDelete:`DELETE FROM ${db} WHERE Id=@Id`,
         queryGetForSelects:`SELECT Id 'value',Identificador 'label' FROM ${db}`,
     })
 }