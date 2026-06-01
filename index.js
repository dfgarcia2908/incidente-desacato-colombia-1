// index.js
// Punto de entrada del skill "incidente-desacato-colombia"

const fs = require("fs");
const path = require("path");

/**
 * Carga dinámicamente un skill desde su directorio
 * @param {string} skillName - Nombre del skill (carpeta)
 * @returns {Object} Objeto del skill con metadata y contenido
 */
function loadSkill(skillName) {
  const skillDir = path.join(__dirname, "skills", skillName);
  const skillFile = path.join(skillDir, "SKILL.md");

  if (!fs.existsSync(skillFile)) {
    throw new Error(
      `❌ Skill no encontrado: ${skillName}. Archivo esperado: ${skillFile}`
    );
  }

  const skillContent = fs.readFileSync(skillFile, "utf8");

  return {
    name: skillName,
    path: skillDir,
    content: skillContent,
    readmeExists: fs.existsSync(path.join(skillDir, "README.md")),
  };
}

/**
 * Carga todos los skills disponibles
 * @returns {Object} Mapa de skills disponibles
 */
function loadAllSkills() {
  const skillsDir = path.join(__dirname, "skills");
  const skills = {};

  if (!fs.existsSync(skillsDir)) {
    console.warn("⚠️ Directorio de skills no encontrado.");
    return skills;
  }

  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });

  entries.forEach((entry) => {
    if (entry.isDirectory() && !entry.name.startsWith(".")) {
      try {
        skills[entry.name] = loadSkill(entry.name);
        console.log(`✅ Skill cargado: ${entry.name}`);
      } catch (error) {
        console.error(`⚠️ Error cargando skill ${entry.name}:`, error.message);
      }
    }
  });

  return skills;
}

// Cargar skill principal (LexColombia)
const mainSkill = loadSkill("LexColombia");

// Cargar todos los skills disponibles
const allSkills = loadAllSkills();

// Exportar el módulo
module.exports = {
  name: "incidente-desacato-colombia",
  description:
    "Skill para redactar, estructurar y optimizar incidentes de desacato en procesos de tutela en Colombia.",
  version: "1.0.0",
  author: "Diego Fernando García Bermeo",
  license: "MIT",
  mainSkill: mainSkill,
  skills: allSkills,
  loadSkill: loadSkill,
  loadAllSkills: loadAllSkills,
};

// Ejecutar si se llama directamente como script
if (require.main === module) {
  console.log("\n📚 Módulo: " + module.exports.name);
  console.log("📝 Descripción: " + module.exports.description);
  console.log("✍️ Autor: " + module.exports.author);
  console.log("📌 Versión: " + module.exports.version);
  console.log("\n🎯 Skills disponibles:");
  Object.keys(allSkills).forEach((name) => {
    console.log(`  - ${name}`);
  });
  console.log("\n✅ Módulo cargado exitosamente\n");
}
