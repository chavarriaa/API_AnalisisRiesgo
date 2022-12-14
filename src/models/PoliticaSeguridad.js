module.exports = function ({
  Id='',
  Identificador='',
  Version='',
  FechaCreado='',
  FechaActualizado='',
  CreadorPor='',
  AutorizadoPor='',
  Nombre='',
  Descripcion='',
}) {
  let db = "PoliticaSeguridad";
  return {
    Id,
    Identificador,
    Version,
    FechaCreado,
    FechaActualizado,
    CreadorPor,
    AutorizadoPor,
    Nombre,
    Descripcion,
    queryGet: `SELECT * FROM ${db};`,
    queryGetMultiple: (ids) => `SELECT * FROM ${db} WHERE Id IN (${ids});`,
    queryGetByID: `SELECT * FROM ${db} WHERE Id = @Id;`,
    queryInsert: `INSERT INTO ${db} 
        (Identificador, Version, FechaCreado, FechaActualizado, CreadorPor, AutorizadoPor, Nombre, Descripcion) 
        OUTPUT INSERTED.ID
        VALUES 
        (@Identificador, @Version, @FechaCreado, @FechaActualizado, @CreadorPor, @AutorizadoPor, @Nombre, @Descripcion)`,
    queryUpdate: `UPDATE ${db} SET 
        Identificador =@Identificador,
        Version = @Version,
        FechaCreado = @FechaCreado,
        FechaActualizado = @FechaActualizado,
        CreadorPor = @CreadorPor,
        AutorizadoPor = @AutorizadoPor,
        Nombre = @Nombre,
        Descripcion = @Descripcion
        WHERE Id = @Id`,
    queryDelete: `DELETE FROM ${db} WHERE Id = @Id`,
    queryGetForSelects: `SELECT Id 'value', Identificador + ' - ' + Nombre  'label' FROM ${db}`,
  };
};
