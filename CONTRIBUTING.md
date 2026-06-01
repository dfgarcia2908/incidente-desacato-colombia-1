# Guía de Contribución

Agradecemos tu interés en contribuir al skill **incidente-desacato-colombia**. Esta guía te ayudará a comenzar.

## Requisitos previos

- Node.js >= 14.0.0
- Git
- Conocimiento de derecho procesal colombiano (deseable)

## Cómo contribuir

### 1. Fork y clonar el repositorio

```bash
git clone https://github.com/dfgarcia2908/incidente-desacato-colombia-1.git
cd incidente-desacato-colombia-1
```

### 2. Crear una rama para tu cambio

```bash
git checkout -b feature/mi-mejora
# o
git checkout -b fix/error-encontrado
```

### 3. Realizar cambios

- **Para agregar un nuevo skill:** crea una carpeta en `skills/NombreSkill/` con `SKILL.md`
- **Para mejorar documentación:** edita archivos `.md` existentes
- **Validar cambios:** ejecuta `npm test`

### 4. Commit y push

```bash
git add .
git commit -m "feat: descripción clara del cambio"
git push origin feature/mi-mejora
```

### 5. Abrir Pull Request

- Dirígete a GitHub y abre un PR desde tu rama
- Describe los cambios claramente
- Referencia cualquier issue relacionado (ej: #123)

## Estándares de código

### Mensajes de commit

Usa este formato:
- `feat:` - Nueva característica
- `fix:` - Corrección de error
- `docs:` - Cambios en documentación
- `refactor:` - Cambios sin alterar funcionalidad
- `test:` - Agregar o mejorar tests
- `chore:` - Cambios de configuración

### Convenciones de contenido jurídico

1. **Lenguaje:** Español formal colombiano
2. **Normatividad:** Citar leyes y códigos completos (ej: "Código de Procedimiento Administrativo y de lo Contencioso Administrativo - CPACA")
3. **Jurisprudencia:** Incluir sentencias con identificación completa
4. **Claridad:** Párrafos cortos, lenguaje preciso

### Estructura de un nuevo Skill

```
skills/
└── NombreSkill/
    ├── SKILL.md (contenido principal)
    ├── README.md (descripción y uso)
    └── ejemplos/ (opcional)
        └── ejemplo1.txt
```

## Reportar bugs

Si encuentras un error:

1. Verifica que no esté ya reportado en Issues
2. Abre un nuevo Issue con:
   - Título claro y descriptivo
   - Descripción del problema
   - Pasos para reproducirlo (si aplica)
   - Versión de Node.js que usas

## Preguntas o dudas

- Abre una Discussion en el repositorio
- Revisa el README.md para información general

## Licencia

Al contribuir aceptas que tus cambios se publiquen bajo licencia MIT.

---

¡Gracias por contribuir! 🙌
