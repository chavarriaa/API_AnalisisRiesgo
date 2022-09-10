module.exports = function ({ Id, Riesgo, PoliticaSeguridad }) {
  let db = "RiesgoPoliticas";
  return {
    Id,
    Riesgo,
    PoliticaSeguridad,
    queryGet: `SELECT Riesgo FROM ${db} WHERE PoliticaSeguridad = @PoliticaSeguridad;`,
    queryGetByMultiple: (ids) => `SELECT Riesgo FROM ${db} WHERE PoliticaSeguridad IN (${ids});`,
    queryInsert: `INSERT INTO ${db} 
            (Riesgo, PoliticaSeguridad) VALUES 
            (@Riesgo, @PoliticaSeguridad)`
  };
};
