
use [AnalisisRiesgoDB]
GO

CREATE TABLE [dbo].[Impactos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nivel] [varchar](64) NOT NULL,
	[Puntaje] [int] NOT NULL,
	[Descripcion] [varchar](256) NULL,
 CONSTRAINT [PK_Impactos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
CREATE TABLE [dbo].[NivelRiesgos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ValorMinimo] [int] NOT NULL,
	[ValorMaximo] [int] NOT NULL,
	[Descripcion] [varchar](64) NOT NULL,
	[AccionTomar] [varchar](128) NOT NULL,
 CONSTRAINT [PK_NivelRiesgo] PRIMARY KEY CLUSTERED 
(
[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Posibilidades](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nivel] [varchar](64) NOT NULL,
	[Puntaje] [int] NOT NULL,
	[Descripcion] [varchar](256) NULL,
 CONSTRAINT [PK_Posibilidades] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Riesgos](
	[Id] [int] NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Nombre] [varchar](256) NOT NULL,
	[AfectaCosto] [bit] NOT NULL,
	[ValorCosto] [decimal(12,2)] ,
	[AfectaTiempo] [bit] NOT NULL,
	[AfectaAlcance] [bit] NOT NULL,
	[AfectaCalidad] [bit] NOT NULL,
	[IdProbabilidad] [int] NOT NULL,
	[IdImpacto] [int] NOT NULL,
 CONSTRAINT [PK_Riesgos] PRIMARY KEY CLUSTERED 
(
 [Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE Activos (
	Id int IDENTITY(1,1) PRIMARY KEY,
	Nombre varchar(64),
);
GO
CREATE TABLE RiesgosActivos(
	Id int primary key identity(1,1),
	IdRiesgo int,
	IdActivo int,
	constraint FK_RiesgosActivos_Riesgos foreign key (IdRiesgo) references Riesgos(Id),
	constraint FK_RiesgosActivos_Activos foreign key (IdActivo) references Activos(Id)
);
GO

SET IDENTITY_INSERT [dbo].[Impactos] ON 
INSERT [dbo].[Impactos] ([Id], [Nivel], [Puntaje], [Descripcion]) VALUES
(1, N'Insignificante', 1, N'Sin Heridas, Pérdidas Financieras bajas'),
(2, N'Menor', 2, N'Tratamiento de primeros auxilios, Pérdidas Financieras Moderadas'),
(3, N'Moderado', 3, N'Moderado	3	Tratamiento médico requerido, Pérdidas Financieras Altas'),
(5, N'Mayor', 4, N'Heridas extensas, Perdida de la capacidad de producción, Perdidas Financieras Mayores'),
(6, N'Severo', 5, N'Muerte, Pérdida Financiera Inmensa')
SET IDENTITY_INSERT [dbo].[Impactos] OFF 
GO

SET IDENTITY_INSERT [dbo].[NivelRiesgos] ON 
INSERT [dbo].[NivelRiesgos] ([Id], [ValorMinimo], [ValorMaximo], [Descripcion], [AccionTomar]) VALUES 
	(1, 1, 1, N'Muy Bajo', N'Requiere monitoreo '),
	(2, 2, 4, N'Bajo', N'Manejado por Procedimientos de Rutina'),
	(4, 5, 9, N'Medio', N'Se Deben Especificar Niveles de Responsabilidad'),
	(5, 10, 12, N'Alto', N'Requiere Niveles de Supervisión'),
	(6, 15, 25, N'Muy Alto', N'Requiere de Acciones Inmediatas')
SET IDENTITY_INSERT [dbo].[NivelRiesgos] OFF
GO


SET IDENTITY_INSERT [dbo].[Posibilidades] ON 
INSERT [dbo].[Posibilidades] ([Id], [Nivel], [Puntaje], [Descripcion]) VALUES
(1, N'Muy probable', 5, N'El acontecimiento se espera en la mayoría de las circunstancias'),
(2, N'Probable', 3, N'El acontecimiento ocurrirá probablemente en la mayoría de las circunstancias'),
(4, N'Posible', 4, N'El acontecimiento debe ocurrir alguna vez'),
(5, N'Improbable', 2, N'El acontecimiento podría ocurrir alguna vez'),
(6, N'Raro', 1, N'El acontecimiento puede ocurrir sólo en circunstancias excepcionales')
GO

SET IDENTITY_INSERT [dbo].[Posibilidades] OFF
GO



SET IDENTITY_INSERT [dbo].[Riesgos] ON
INSERT [dbo].[Riesgos] ([Id], [Nombre], [AfectaCosto], [AfectaTiempo], [AfectaAlcance], [AfectaCalidad], [IdProbabilidad], [IdImpacto], [ValorCosto]) VALUES (4, N'Perdida de información por un virus informático', 1, 0, 0, 1, 4, 3, NULL)
SET IDENTITY_INSERT [dbo].[Riesgos] OFF
GO


SET IDENTITY_INSERT [dbo].[NivelRiesgos] ON
INSERT [dbo].[NivelRiesgos] ([Id], [ValorMinimo], [ValorMaximo], [Descripcion], [AccionTomar]) VALUES (1, 1, 1, N'Muy Bajo', N'Requiere monitoreo ')
INSERT [dbo].[NivelRiesgos] ([Id], [ValorMinimo], [ValorMaximo], [Descripcion], [AccionTomar]) VALUES (2, 2, 4, N'Bajo', N'Manejado por Procedimientos de Rutina')
INSERT [dbo].[NivelRiesgos] ([Id], [ValorMinimo], [ValorMaximo], [Descripcion], [AccionTomar]) VALUES (4, 5, 9, N'Medio', N'Se Deben Especificar Niveles de Responsabilidad')
INSERT [dbo].[NivelRiesgos] ([Id], [ValorMinimo], [ValorMaximo], [Descripcion], [AccionTomar]) VALUES (5, 10, 12, N'Alto', N'Requiere Niveles de Supervisión')
INSERT [dbo].[NivelRiesgos] ([Id], [ValorMinimo], [ValorMaximo], [Descripcion], [AccionTomar]) VALUES (6, 15, 25, N'Muy Alto', N'Requiere de Acciones Inmediatas')
SET IDENTITY_INSERT [dbo].[NivelRiesgos] OFF

GO

SET IDENTITY_INSERT [dbo].[Activos] ON
INSERT [dbo].[Activos] ([Id], [Nombre]) VALUES (1, N'Servidor Web')
INSERT [dbo].[Activos] ([Id], [Nombre]) VALUES (2, N'Servidor Dell Optiplexaklsdj9')
SET IDENTITY_INSERT [dbo].[Activos] OFF
GO

SET IDENTITY_INSERT [dbo].[RiesgosActivos] ON
INSERT [dbo].[RiesgosActivos] ([Id], [IdRiesgo], [IdActivo]) VALUES (6, 4, 1)
SET IDENTITY_INSERT [dbo].[RiesgosActivos] OFF
GO


 
ALTER TABLE [dbo].[Riesgos]  WITH CHECK ADD  CONSTRAINT [FK_Riesgos_Impactos] FOREIGN KEY([IdImpacto])
REFERENCES [dbo].[Impactos] ([Id])

GO
ALTER TABLE [dbo].[Riesgos] CHECK CONSTRAINT [FK_Riesgos_Impactos]
GO
ALTER TABLE [dbo].[Riesgos]  WITH CHECK ADD  CONSTRAINT [FK_Riesgos_Posibilidades] FOREIGN KEY([IdProbabilidad])
REFERENCES [dbo].[Posibilidades] ([Id])

GO
ALTER TABLE [dbo].[Riesgos] CHECK CONSTRAINT [FK_Riesgos_Posibilidades]
GO


ALTER TABLE Impactos
	  add constraint UC_Puntaje UNIQUE (Puntaje)
GO
ALTER TABLE Posibilidades
	  add constraint UC_Posibilidad UNIQUE (Puntaje)
GO



