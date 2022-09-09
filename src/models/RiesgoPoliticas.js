module.exports = function ({ Id, Riesgo, PoliticaSeguridad }) {
  let db = "RiesgoPoliticas";
  return {
    Id,
    Riesgo,
    PoliticaSeguridad,
    queryGet: `SELECT * FROM ${db} WHERE Riesgo = @Riesgo;`,
    queryGetByID: `SELECT * FROM ${db} WHERE Id = @Id AND Riesgo = @Riesgo;`,
    queryInsert: `INSERT INTO ${db} 
            (Riesgo, PoliticaSeguridad) VALUES 
            (@Riesgo, @PoliticaSeguridad)`,
    queryDelete: `DELETE FROM ${db} WHERE Riesgo = @Riesgo`,
  };
};
