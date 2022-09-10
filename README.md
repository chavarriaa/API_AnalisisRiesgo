# End Points

### Impacto -->  `/impacto`
* Id -> int
* Nivel -> varchar(64)
* Puntaje -> int unique
* Descripcion -> varchar(256)

### Posibilidad `/posibilidad`
* Id -> int
* Nivel -> varchar(64)
* Puntaje -> int unique
* Descripcion -> varchar(256)

### NivelRiesgos `/nivelRiesgo`
* Id -> int
* ValorMinimo -> int
* ValorMaximo -> int 
* Descripcion -> varchar(64)
* AccionTomar -> varchar(256)


### Activos `/activo`
* Id -> int
* Nombre -> varchar(256)

### Riesgo `/riesgo`
* Id -> int
* Nombre -> varchar(256)
* AfectaCosto -> bit (true or false) 
* ValorCosto -> decimal(12,2)
* AfectaTiempo -> bit (true or false)
* AfectaAlcance -> bit (true or false)
* AfectaCalidad -> bit (true or false)
* IdProbabilidad ->int
* PuntajePosibilidad -> int ---> **Adjunto, no va en el POST**
* NivelPosibilidad -> varchar  ---> **Adjunto, no van el POST**
* IdImpacto -> int
* PuntajeImpacto -> int ---> **Adjunto, no van el POST**
* NivelImpacto -> varchar  ---> **Adjunto, no van el POST**
* NivelRiesgo -> int  ---> **CALCULADO , no van el POST**


### Riesgo `/riesgo/:IdRiesgo/activo`
* Id -> int
* IdRiesgo -> int
* IdActivo -> int
* NombreActivo -> int  ---> **Adjunto, no van el POST**





### Politicas de Seguridad `/politica-seguridad/`

| Nombre | Tipo | Obs |  
|--|--|--| 
| `id` | int  | automatico, sólo lectura  |
| `Identificador` | varchar  | ejemplo: PS-315, POL12 ,etc |
| `FechaCreado` | date |   |
| `FechaActualizado` |date  ||
| `CreadorPor`| varchar |  |
| `AutorizadoPor` | varchar |  |
| `Nombre` | vachar |   |
| `Descripcion` | nvarchar(MAX) | Campo enriquecido, dese gusto llenando  |
 
 ###  Politicas Asociados a un Plan de Seguridad  `/plan-seguridad/:PlanSeguridad/politicas/asociar/`

| Nombre | Tipo | Obs |  
|--|--|--| 
| `id` | int  | automatico, sólo lectura  |
| `politicas` | array varchar  | ejemplo: [1,3,4,5] |
 
 
### Plan  de Seguridad `/plan-seguridad/`
 
| Nombre | Tipo | Obs |  
|--|--|--| 
| `id` | int  | automatico, sólo lectura  |
| `Identificador` | varchar  | ejemplo: PS-315, POL12 ,etc |
| `FechaInicio` | date |   |
| `FechaFin` |date  ||
| `Recursos`| varchar | ejemplo: Financiero, economico, etc  |
| `AutorizadoPor` | varchar |  |
| `Nombre` | vachar |   |
| `Descripcion` | nvarchar(MAX) | Campo enriquecido, dese gusto llenando  |

 ### Riesgos asociados con las políticas de seguridad `/riesg/:Riesgo/politicas/asociar/`

| Nombre | Tipo | Obs |  
|--|--|--| 
| `id` | int  | automatico, sólo lectura  |
| `politicas` | array varchar  | ejemplo: [1,3,4,5] |
 

### Plan  de Accion `/plan-seguridad/:PlanSeguridad/plan-accion`
 
| Nombre | Tipo | Obs |  
|--|--|--| 
| `id` | int  | automatico, sólo lectura  |
| `PlanSeguridad` | int  |  |
| `FechaInicio` | date |   |
| `FechaFin` |date  ||
| `Responsable`| varchar |   |
| `Auditor` | varchar |  |
| `Descripcion` | nvarchar(MAX) | Campo enriquecido, dese gusto llenando  |



### Incidente `/plan-seguridad/:PlanSeguridad/incidente/:Incidente/`
| Nombre | Tipo | Obs |  
|--|--|--| 
| `Id` | int  | automatico, sólo lectura  |
| `FechaInicio` | date |  |
| `FechaFin` | date |   |
| `ProcesoAfectado` |varchar ||
| `Nombre`| varchar |  
| `Descripcion`| varchar |  
| `PlanSeguridad`| int |  
 
### Plan  de Respuesta`/plan-seguridad/:PlanSeguridad/incidente/:Incidente/plan-respuesta	`
| Nombre | Tipo | Obs |  
|--|--|--| 
| `id` | int  | automatico, sólo lectura  |
| `incidente` | int  |  |
| `Fecha` | date |   |
| `Descripcion` |varchar ||
| `Responsable`| varchar |  
