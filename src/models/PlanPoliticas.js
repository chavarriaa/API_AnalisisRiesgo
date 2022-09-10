module.exports = function({Id='',PlanSeguridad='', PoliticaSeguridad=''}) {
  let db = 'PlanPoliticas';
     return ({
      Id,PlanSeguridad, PoliticaSeguridad,
         queryGet:`SELECT PoliticaSeguridad FROM ${db} WHERE PlanSeguridad = @PlanSeguridad ;`,
         queryInsert:`INSERT INTO ${db} 
             (PlanSeguridad, PoliticaSeguridad) VALUES 
             (@PlanSeguridad, @PoliticaSeguridad)`,
     })
 }