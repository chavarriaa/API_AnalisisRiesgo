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

