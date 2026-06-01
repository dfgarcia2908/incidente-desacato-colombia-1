---
name: incidente-desacato-colombia
description: Skill para redactar, estructurar y optimizar incidentes de desacato en procesos de tutela en Colombia.
version: 1.0.0
author: Diego Fernando García Bermeo
license: MIT
---

# ⚖️ incidente-desacato-colombia

> Skill jurídico para redactar, estructurar y optimizar incidentes de desacato en procesos de tutela en Colombia.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Colombia](https://img.shields.io/badge/🇨🇴-Colombia-blue)](https://www.colombia.co/)

## 📚 Tabla de Contenidos

- [Instalación](#instalación)
- [Uso Rápido](#uso-rápido)
- [Skills Disponibles](#skills-disponibles)
- [Ejemplos](#ejemplos)
- [Documentación](#documentación)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## 🎯 Descripción

Módulo Node.js especializado en redacción jurídica colombiana con soporte para múltiples skills legales. Permite cargar dinámicamente documentos jurídicos especializados y utilizarlos como base para redacción de escritos legales.

### Características

- ✅ **Skill LexColombia:** Redacción jurídica general colombiana
- ✅ **Skill DerechoLaboral:** Especialización en derecho laboral
- ✅ **Sistema modular:** Fácil de extender con nuevos skills
- ✅ **Carga dinámica:** Solo carga lo que necesitas
- ✅ **API simple:** Interfaz clara y documentada
- ✅ **Tests incluidos:** Suite completa de pruebas

## 📦 Instalación

### Requisitos

- Node.js >= 14.0.0
- npm o yarn

### Pasos

```bash
# Clonar repositorio
git clone https://github.com/dfgarcia2908/incidente-desacato-colombia-1.git
cd incidente-desacato-colombia-1

# Instalar dependencias
npm install

# Ejecutar tests
npm test
```

## 🚀 Uso Rápido

### Como script

```bash
npm start
```

### Como módulo

```javascript
const skill = require('incidente-desacato-colombia');

// Acceder al skill principal
console.log(skill.mainSkill.name);       // "LexColombia"

// Listar todos los skills
console.log(skill.skills);               // Todos los skills disponibles

// Cargar skill específico
const lex = skill.loadSkill('LexColombia');
console.log(lex.content);

// Cargar todos
const allSkills = skill.loadAllSkills();
```

## 🎨 Skills Disponibles

### LexColombia

Redacción y argumentación jurídica especializada en derecho colombiano.

- Escritura de documentos procesales
- Referencias normativas colombianas
- Estructura procesal correcta

**Ubicación:** `skills/LexColombia/SKILL.md`

### DerechoLaboral

Especialización en derecho laboral colombiano.

- Demandas laborales
- Derecho a prestaciones sociales
- Protección de derechos laborales
- Procedimientos ante Juzgados Laborales

**Ubicación:** `skills/DerechoLaboral/SKILL.md`

## 💡 Ejemplos

### Ejemplo 1: Información del módulo

```javascript
const skill = require('incidente-desacato-colombia');

console.log('Módulo:', skill.name);
console.log('Versión:', skill.version);
console.log('Autor:', skill.author);
console.log('Licencia:', skill.license);
```

### Ejemplo 2: Listar todos los skills

```javascript
const skill = require('incidente-desacato-colombia');

const allSkills = skill.loadAllSkills();

Object.entries(allSkills).forEach(([name, data]) => {
  console.log(`✅ ${name}`);
  console.log(`   Líneas: ${data.content.split('\n').length}`);
});
```

### Ejemplo 3: Buscar en un skill

```javascript
const skill = require('incidente-desacato-colombia');

const lex = skill.loadSkill('LexColombia');
const lines = lex.content.split('\n');

const matches = lines.filter(line => 
  line.toLowerCase().includes('antecedentes')
);

console.log('Encontrados:', matches);
```

### Ejemplo 4: Con Express.js

```javascript
const express = require('express');
const skill = require('incidente-desacato-colombia');

const app = express();

app.get('/api/skills', (req, res) => {
  try {
    const allSkills = skill.loadAllSkills();
    res.json({ skills: allSkills });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/skills/:name', (req, res) => {
  try {
    const skillData = skill.loadSkill(req.params.name);
    res.json(skillData);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(3000);
```

## 📁 Estructura

```
incidente-desacato-colombia-1/
├── index.js                  # Punto de entrada
├── package.json              # Configuración npm
├── LICENSE                   # Licencia MIT
├── README.md                 # Este archivo
├── CONTRIBUTING.md           # Guía de contribución
├── .gitignore               # Archivos ignorados
├── skills/                  # Skills jurídicos
│   ├── LexColombia/
│   │   ├── SKILL.md
│   │   └── README.md
│   └── DerechoLaboral/
│       ├── SKILL.md
│       └── README.md
├── test/                    # Tests
│   └── index.test.js
└── docs/                    # Documentación
    ├── API.md
    ├── EXAMPLES.md
    └── DEVELOPMENT.md
```

## 📖 Documentación Completa

- **[API.md](docs/API.md)** - Referencia completa de la API
- **[EXAMPLES.md](docs/EXAMPLES.md)** - Ejemplos avanzados
- **[DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Guía para desarrolladores
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Cómo contribuir

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar módulo
npm start
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Lee [CONTRIBUTING.md](CONTRIBUTING.md) para:

- Cómo hacer un fork
- Estándares de código
- Crear nuevos skills
- Proceso de Pull Request

## 📄 Licencia

MIT © Diego Fernando García Bermeo

Ver [LICENSE](LICENSE) para detalles.

## 👤 Autor

**Diego Fernando García Bermeo**

- GitHub: [@dfgarcia2908](https://github.com/dfgarcia2908)
- Website: [incidente-desacato-colombia.vercel.app](https://incidente-desacato-colombia.vercel.app)

## 💬 Soporte

- [Issues](https://github.com/dfgarcia2908/incidente-desacato-colombia-1/issues)
- [Discussions](https://github.com/dfgarcia2908/incidente-desacato-colombia-1/discussions)

---

<div align="center">

**Hecho con ❤️ para el sistema jurídico colombiano**

[⬆ Volver arriba](#-incidente-desacato-colombia)

</div>
