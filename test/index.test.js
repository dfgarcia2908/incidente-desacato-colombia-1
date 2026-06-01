// test/index.test.js
// Tests para el módulo incidente-desacato-colombia

const assert = require('assert');
const path = require('path');
const skillModule = require('../index.js');

console.log('\n🧪 Iniciando suite de tests...\n');

// Test 1: Estructura del módulo
console.log('Test 1: Estructura del módulo exportado');
try {
  assert.strictEqual(typeof skillModule, 'object', 'El módulo debe exportar un objeto');
  assert.strictEqual(skillModule.name, 'incidente-desacato-colombia', 'El nombre es correcto');
  assert.strictEqual(skillModule.version, '1.0.0', 'La versión es correcta');
  assert.strictEqual(skillModule.author, 'Diego Fernando García Bermeo', 'El autor es correcto');
  assert.strictEqual(skillModule.license, 'MIT', 'La licencia es correcta');
  console.log('✅ Test 1 pasado\n');
} catch (error) {
  console.error('❌ Test 1 falló:', error.message);
  process.exit(1);
}

// Test 2: Métodos disponibles
console.log('Test 2: Métodos disponibles');
try {
  assert.strictEqual(typeof skillModule.loadSkill, 'function', 'loadSkill es una función');
  assert.strictEqual(typeof skillModule.loadAllSkills, 'function', 'loadAllSkills es una función');
  console.log('✅ Test 2 pasado\n');
} catch (error) {
  console.error('❌ Test 2 falló:', error.message);
  process.exit(1);
}

// Test 3: Estructura de mainSkill
console.log('Test 3: Estructura de mainSkill');
try {
  assert(skillModule.mainSkill, 'mainSkill existe');
  assert.strictEqual(typeof skillModule.mainSkill, 'object', 'mainSkill es un objeto');
  assert(skillModule.mainSkill.name, 'mainSkill tiene nombre');
  assert(skillModule.mainSkill.path, 'mainSkill tiene path');
  assert(skillModule.mainSkill.content, 'mainSkill tiene contenido');
  assert.strictEqual(typeof skillModule.mainSkill.readmeExists, 'boolean', 'readmeExists es booleano');
  console.log('✅ Test 3 pasado\n');
} catch (error) {
  console.error('❌ Test 3 falló:', error.message);
  process.exit(1);
}

// Test 4: loadSkill funciona correctamente
console.log('Test 4: Función loadSkill');
try {
  const lex = skillModule.loadSkill('LexColombia');
  assert.strictEqual(lex.name, 'LexColombia', 'loadSkill retorna skill correcto');
  assert(lex.content.length > 0, 'El contenido no está vacío');
  assert(lex.path.includes('LexColombia'), 'El path es correcto');
  console.log('✅ Test 4 pasado\n');
} catch (error) {
  console.error('❌ Test 4 falló:', error.message);
  process.exit(1);
}

// Test 5: Manejo de errores
console.log('Test 5: Manejo de errores en loadSkill');
try {
  skillModule.loadSkill('SkillNoExistente');
  console.error('❌ Debería haber lanzado un error');
  process.exit(1);
} catch (error) {
  assert(error.message.includes('no encontrado'), 'Lanza error apropiado');
  console.log('✅ Test 5 pasado\n');
}

// Test 6: loadAllSkills retorna objeto
console.log('Test 6: Función loadAllSkills');
try {
  const allSkills = skillModule.loadAllSkills();
  assert(typeof allSkills === 'object', 'loadAllSkills retorna un objeto');
  assert(Object.keys(allSkills).length > 0, 'Contiene al menos un skill');
  console.log('✅ Test 6 pasado\n');
} catch (error) {
  console.error('❌ Test 6 falló:', error.message);
  process.exit(1);
}

// Test 7: Estructura de todos los skills
console.log('Test 7: Estructura de todos los skills');
try {
  const allSkills = skillModule.loadAllSkills();
  Object.entries(allSkills).forEach(([name, skill]) => {
    assert(skill.name, `${name} tiene nombre`);
    assert(skill.path, `${name} tiene path`);
    assert(skill.content, `${name} tiene contenido`);
    assert.strictEqual(typeof skill.readmeExists, 'boolean', `${name} tiene readmeExists`);
  });
  console.log('✅ Test 7 pasado\n');
} catch (error) {
  console.error('❌ Test 7 falló:', error.message);
  process.exit(1);
}

// Test 8: Contenido de LexColombia
console.log('Test 8: Contenido del skill LexColombia');
try {
  const lexContent = skillModule.mainSkill.content;
  assert(lexContent.includes('LexColombia'), 'Contiene nombre del skill');
  assert(lexContent.includes('Objetivo'), 'Contiene sección Objetivo');
  assert(lexContent.includes('Instrucciones'), 'Contiene sección Instrucciones');
  console.log('✅ Test 8 pasado\n');
} catch (error) {
  console.error('❌ Test 8 falló:', error.message);
  process.exit(1);
}

// Test 9: DerechoLaboral disponible
console.log('Test 9: Skill DerechoLaboral disponible');
try {
  const derechoLaboral = skillModule.loadSkill('DerechoLaboral');
  assert.strictEqual(derechoLaboral.name, 'DerechoLaboral', 'DerechoLaboral cargado');
  assert(derechoLaboral.content.length > 0, 'DerechoLaboral tiene contenido');
  console.log('✅ Test 9 pasado\n');
} catch (error) {
  console.error('❌ Test 9 falló:', error.message);
  process.exit(1);
}

// Test 10: Integración completa
console.log('Test 10: Integración completa del módulo');
try {
  const skill = require('../index.js');
  
  // Acceder al skill principal
  assert(skill.mainSkill.content.length > 0, 'Contenido del skill principal disponible');
  
  // Cargar específicamente
  const lexColombia = skill.loadSkill('LexColombia');
  assert.strictEqual(lexColombia.name, 'LexColombia', 'Skill cargado correctamente');
  
  // Listar todos
  const allSkillsList = skill.loadAllSkills();
  assert(Object.keys(allSkillsList).length > 0, 'Skills listados correctamente');
  
  console.log('✅ Test 10 pasado\n');
} catch (error) {
  console.error('❌ Test 10 falló:', error.message);
  process.exit(1);
}

// Resumen
console.log('='.repeat(60));
console.log('✅ TODOS LOS TESTS PASARON EXITOSAMENTE');
console.log('='.repeat(60));
console.log('\n📊 Resumen:');
console.log(`   Total de tests: 10`);
console.log(`   Exitosos: 10 ✅`);
console.log(`   Fallidos: 0 ❌`);
console.log(`\n🎉 Módulo listo para usar\n`);

process.exit(0);
