module.exports = function ({ Id, Riesgo, PoliticaSeguridad }) {
  let db = "RiesgoPoliticas";
  return {
    Id,
    Riesgo,
    PoliticaSeguridad,
    queryGet: `SELECT Riesgo FROM ${db} WHERE PoliticaSeguridad = @PoliticaSeguridad;`,
    queryGetByID: `SELECT Riesgo FROM ${db} WHERE PoliticaSeguridad = @PoliticaSeguridad;`,
    queryInsert: `INSERT INTO ${db} 
            (Riesgo, PoliticaSeguridad) VALUES 
            (@Riesgo, @PoliticaSeguridad)`
  };
};
