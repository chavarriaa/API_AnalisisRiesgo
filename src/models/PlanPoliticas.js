module.exports = function({Id,PlanSeguridad, PoliticaSeguridad}) {
  let db = 'PlanPoliticas';
     return ({
      Id,PlanSeguridad, PoliticaSeguridad,
         queryGet:`SELECT * FROM ${db} where PlanSeguridad = @PlanSeguridad;`,
         queryGetByID:`SELECT * FROM ${db} WHERE Id=@Id AND  PlanSeguridad = @PlanSeguridad ;`,
         queryInsert:`INSERT INTO ${db} 
             (PlanSeguridad, PoliticaSeguridad) VALUES 
             (@PlanSeguridad, @PoliticaSeguridad)`,
         queryDelete:`DELETE FROM ${db} WHERE PlanSeguridad=@PlanSeguridad`,
     })
 }