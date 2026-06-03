const OpenAI = require("openai");
const LegalValidator = require("./legal-validator");

/**
 * Cliente LLM mejorado con contexto jurídico
 * Integra validación legal y mejora prompts
 */
class LLMClient {
  constructor(baseURL = process.env.OPENAI_BASE_URL, apiKey = process.env.OPENAI_API_KEY) {
    this.client = new OpenAI({
      baseURL,
      apiKey
    });
    this.validator = new LegalValidator();
    this.modelo = process.env.MODEL || "qwen2.5-7b-instruct";
  }

  /**
   * Generar contenido con contexto jurídico
   */
  async generarConContexto(seccion, datos, contexto = "") {
    const prompt = this.construirPrompt(seccion, datos, contexto);

    try {
      const response = await this.client.chat.completions.create({
        model: this.modelo,
        temperature: 0.3,
        max_tokens: 800,
        messages: [
          {
            role: "system",
            content: this.obtenerSistemaPrompt()
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

      return {
        exito: true,
        contenido: response.choices[0].message.content,
        tokens_usados: response.usage.total_tokens
      };
    } catch (error) {
      console.error("Error en LLM:", error.message);
      return {
        exito: false,
        error: error.message,
        contenido: ""
      };
    }
  }

  /**
   * Generar streaming de contenido
   */
  async generarStream(seccion, datos, contexto = "") {
    const prompt = this.construirPrompt(seccion, datos, contexto);

    try {
      const response = await this.client.chat.completions.create({
        model: this.modelo,
        temperature: 0.3,
        max_tokens: 800,
        stream: true,
        messages: [
          {
            role: "system",
            content: this.obtenerSistemaPrompt()
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

      return response;
    } catch (error) {
      console.error("Error en LLM Stream:", error.message);
      throw error;
    }
  }

  /**
   * Obtener prompt del sistema mejorado
   */
  obtenerSistemaPrompt() {
    return `Eres un asistente jurídico especializado en derecho colombiano, con profundo conocimiento de:

1. Acciones de Tutela (Artículos 86 CP, Decreto 2591 de 1991)
2. Incidentes de Desacato (Artículo 52 CPACA)
3. Jurisprudencia de la Corte Constitucional (sentencias hito como T-406/92, SU-047/99, T-760/08)
4. Procedimientos civiles colombianos
5. Derechos fundamentales y su protección

Al generar contenido:
- Usa lenguaje legal formal pero claro
- Cita la normativa colombiana aplicable
- Incluye referencias a jurisprudencia relevante
- Mantén coherencia jurídica
- Sigue estructura de documentos jurídicos colombianos
- Incluye fórmulas procesales obligatorias
- Respeta procedimientos establecidos por la ley

Nunca generes contenido incompleto o incoherente jurídicamente.`;
  }

  /**
   * Construir prompt específico para cada sección
   */
  construirPrompt(seccion, datos, contexto) {
    const prompts = {
      hechos: this.promptHechos(datos, contexto),
      fundamentos: this.promptFundamentos(datos, contexto),
      pretension: this.promptPretension(datos, contexto),
      petitorio: this.promptPetitorio(datos, contexto),
      conducta_incumplida: this.promptConductaIncumplida(datos, contexto)
    };

    return prompts[seccion] || `Genera el contenido jurídico para: ${seccion}\nDatos: ${JSON.stringify(datos)}\nContexto: ${contexto}`;
  }

  /**
   * Prompt para sección de hechos
   */
  promptHechos(datos, contexto) {
    return `Basándote en los siguientes hechos, genera una narración jurídica profesional y clara:

Derechos vulnerados: ${datos.derechos || ""}
Actor responsable: ${datos.actor || ""}
Contexto: ${contexto}
Detalles: ${datos.detalles || ""}

Genera un párrafo de 200-300 palabras que:
1. Presente de forma cronológica los hechos
2. Identifique claramente al actor responsable
3. Establezca la conexión con los derechos vulnerados
4. Use lenguaje legal formal
5. Sea convincente y bien estructurado`;
  }

  /**
   * Prompt para fundamentos jurídicos
   */
  promptFundamentos(datos, contexto) {
    return `Genera los fundamentos jurídicos para proteger: ${datos.derechos || "derecho fundamental"}

Antecedentes: ${contexto}
Jurisprudencia clave: ${datos.jurisprudencia || "T-406/92, SU-047/99"}

Crea un análisis que incluya:
1. Artículos de la Constitución aplicables
2. Referencias a jurisprudencia de la Corte Constitucional
3. Análisis de los hechos según la normativa
4. Conclusión sobre por qué se vulneró el derecho

Sé específico y cita exactamente artículos y sentencias.`;
  }

  /**
   * Prompt para pretensión
   */
  promptPretension(datos, contexto) {
    return `Basándote en la violación de: ${datos.derechos || ""}

Y los hechos: ${contexto}

Genera una pretensión que:
1. Sea clara y específica
2. Solicite medidas que protejan efectivamente el derecho
3. Sea razonable y verificable
4. Use lenguaje jurídico formal
5. Incluya tanto medidas principales como cautelares`;
  }

  /**
   * Prompt para petitorio
   */
  promptPetitorio(datos, contexto) {
    return `Con base en lo expuesto anteriormente, genera el petitorio final que incluya:

1. Solicitud principal clara
2. Medidas cautelares necesarias
3. Peticiones accesorias (costas, etc.)
4. Fecha y lugar
5. Fórmula de cierre jurídica

Usa tono formal y estructura de documento jurídico colombiano.`;
  }

  /**
   * Prompt para conducta incumplida (desacato)
   */
  promptConductaIncumplida(datos, contexto) {
    return `Describe la conducta incumplida de la sentencia:

Sentencia original: ${datos.sentencia || ""}
Fallo que debería cumplir: ${datos.fallo || ""}
Qué se incumplió: ${contexto}

Genera descripción que:
1. Identifique exactamente qué ordenó la sentencia
2. Explique qué no se cumplió
3. Demuestre el incumplimiento de forma evidente
4. Cite la sentencia original
5. Sea precisa y documentada`;
  }

  /**
   * Analizar texto jurídico
   */
  async analizarTexto(texto) {
    const prompt = `Analiza el siguiente documento jurídico y proporciona:
1. Tema principal
2. Secciones identificadas
3. Referencias normativas encontradas
4. Derechos invocados
5. Petición principal

Documento:\n${texto.substring(0, 2000)}`;

    return await this.generarConContexto("analisis", {}, prompt);
  }

  /**
   * Validar coherencia jurídica
   */
  async validarCoherenciaJuridica(documento) {
    const prompt = `Analiza este documento jurídico e identifica:
1. Incoherencias legales
2. Contradicciones de hechos
3. Inconsistencias procedimentales
4. Problemas de citación
5. Recomendaciones de mejora

Documento:\n${JSON.stringify(documento, null, 2).substring(0, 2000)}`;

    return await this.generarConContexto("validacion", {}, prompt);
  }
}

module.exports = LLMClient;
