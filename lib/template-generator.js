/**
 * Generador de Plantillas Jurídicas
 * Crea documentos estructurados de tutela y desacato colombianos
 */
class TemplateGenerator {
  constructor() {
    this.plantillas = this.cargarPlantillas();
  }

  /**
   * Cargar todas las plantillas disponibles
   */
  cargarPlantillas() {
    return {
      tutela: {
        nombre: "Demanda de Tutela",
        descripcion: "Acción de tutela para proteger derechos fundamentales",
        estructura: this.plantillaTutela()
      },
      desacato: {
        nombre: "Incidente de Desacato",
        descripcion: "Incidente para sancionar incumplimiento de sentencia",
        estructura: this.plantillaDesacato()
      }
    };
  }

  /**
   * Plantilla base de Tutela
   */
  plantillaTutela() {
    return {
      encabezado: {
        juzgado: "JUZGADO [ESPECIALIZADO/MUNICIPAL] DE [CIUDAD]",
        radicado: "RADICADO: [AAAA-MM-NNNNN]",
        actua: "Actúa: [NOMBRE DEL JUEZ/JUEZA]"
      },
      demandante: {
        nombre: "",
        cedula: "",
        domicilio: "",
        apoderado: "",
        notificacion: ""
      },
      demandado: {
        entidad: "",
        representante: "",
        domicilio: ""
      },
      derechos_invocados: [],
      hechos: {
        contexto: "",
        conducta_lesiva: "",
        conexidad: ""
      },
      pretension: {
        principal: "",
        cautelares: []
      },
      fundamentos_juridicos: {
        constitucion: [],
        jurisprudencia: [],
        normativa: []
      },
      petitorio: {
        texto: "",
        medidas_cautelares: ""
      },
      anexos: []
    };
  }

  /**
   * Plantilla base de Desacato
   */
  plantillaDesacato() {
    return {
      encabezado: {
        juzgado: "JUZGADO [ESPECIALIZADO/MUNICIPAL] DE [CIUDAD]",
        radicado: "RADICADO: [AAAA-MM-NNNNN]",
        incidente: "INCIDENTE DE DESACATO"
      },
      accionante: {
        nombre: "",
        cedula: "",
        condicion: "Demandante de la tutela anterior"
      },
      sentencia_incumplida: {
        numero: "",
        fecha: "",
        tribunal: "",
        decision_principal: ""
      },
      conducta_incumplida: {
        descripcion: "",
        actor: "",
        fecha_incumplimiento: "",
        duracion: ""
      },
      perjuicio: {
        daño_causado: "",
        impacto: "",
        evidencia: []
      },
      peticion_sancion: {
        tipo_sancion: "multa",
        cuantia: "",
        medidas_adicionales: ""
      },
      pruebas: [],
      petitorio: ""
    };
  }

  /**
   * Generar documento de tutela con datos
   */
  generarTutela(datos) {
    const plantilla = JSON.parse(JSON.stringify(this.plantillas.tutela.estructura));

    if (datos.encabezado) {
      plantilla.encabezado = { ...plantilla.encabezado, ...datos.encabezado };
    }
    if (datos.demandante) {
      plantilla.demandante = { ...plantilla.demandante, ...datos.demandante };
    }
    if (datos.demandado) {
      plantilla.demandado = { ...plantilla.demandado, ...datos.demandado };
    }
    if (datos.derechos_invocados) {
      plantilla.derechos_invocados = datos.derechos_invocados;
    }
    if (datos.hechos) {
      plantilla.hechos = { ...plantilla.hechos, ...datos.hechos };
    }
    if (datos.pretension) {
      plantilla.pretension = { ...plantilla.pretension, ...datos.pretension };
    }
    if (datos.fundamentos_juridicos) {
      plantilla.fundamentos_juridicos = { ...plantilla.fundamentos_juridicos, ...datos.fundamentos_juridicos };
    }
    if (datos.petitorio) {
      plantilla.petitorio = { ...plantilla.petitorio, ...datos.petitorio };
    }

    return plantilla;
  }

  /**
   * Generar documento de desacato con datos
   */
  generarDesacato(datos) {
    const plantilla = JSON.parse(JSON.stringify(this.plantillas.desacato.estructura));

    for (const [clave, valor] of Object.entries(datos)) {
      if (plantilla[clave] && typeof plantilla[clave] === "object") {
        plantilla[clave] = { ...plantilla[clave], ...valor };
      } else {
        plantilla[clave] = valor;
      }
    }

    return plantilla;
  }

  /**
   * Generar texto formateado de tutela
   */
  generarTextoTutela(documento) {
    let texto = "";

    texto += this.generarEncabezado(documento.encabezado);
    texto += "\n\n";

    texto += this.generarDemandante(documento.demandante);
    texto += "\n\n";

    texto += this.generarDemandado(documento.demandado);
    texto += "\n\n";

    texto += "HECHOS RELEVANTES:\n";
    texto += documento.hechos.contexto + "\n";
    texto += documento.hechos.conducta_lesiva + "\n";
    texto += "\n\n";

    texto += "DERECHOS FUNDAMENTALES VULNERADOS:\n";
    documento.derechos_invocados.forEach(derecho => {
      texto += `• ${derecho}\n`;
    });
    texto += "\n\n";

    texto += "PRETENSIÓN:\n";
    texto += documento.pretension.principal + "\n";
    if (documento.pretension.cautelares.length > 0) {
      texto += "\nMedidas Cautelares Solicitadas:\n";
      documento.pretension.cautelares.forEach(medida => {
        texto += `• ${medida}\n`;
      });
    }
    texto += "\n\n";

    texto += this.generarFundamentos(documento.fundamentos_juridicos);
    texto += "\n\n";

    texto += "POR LO ANTERIOR, SOLICITAMOS:\n";
    texto += documento.petitorio.texto + "\n";

    return texto;
  }

  /**
   * Generar texto formateado de desacato
   */
  generarTextoDesacato(documento) {
    let texto = "";

    texto += this.generarEncabezado(documento.encabezado);
    texto += "\n\n";

    texto += `Accionante: ${documento.accionante.nombre}\n`;
    texto += `Cédula: ${documento.accionante.cedula}\n\n`;

    texto += "SENTENCIA CUYO INCUMPLIMIENTO SE DENUNCIA:\n";
    texto += `Número: ${documento.sentencia_incumplida.numero}\n`;
    texto += `Tribunal: ${documento.sentencia_incumplida.tribunal}\n`;
    texto += `Decisión: ${documento.sentencia_incumplida.decision_principal}\n\n`;

    texto += "CONDUCTA INCUMPLIDA:\n";
    texto += documento.conducta_incumplida.descripcion + "\n";
    texto += `Realizada por: ${documento.conducta_incumplida.actor}\n`;
    texto += `Fecha de incumplimiento: ${documento.conducta_incumplida.fecha_incumplimiento}\n\n`;

    texto += "PERJUICIO CAUSADO:\n";
    texto += documento.perjuicio.daño_causado + "\n\n";

    texto += "PETICIÓN DE SANCIÓN:\n";
    texto += documento.peticion_sancion.medidas_adicionales + "\n\n";

    texto += "PETITORIO:\n";
    texto += documento.petitorio;

    return texto;
  }

  /**
   * Generar encabezado formateado
   */
  generarEncabezado(encabezado) {
    return `${encabezado.juzgado}\n${encabezado.radicado}\n${encabezado.actua || ""}`;
  }

  /**
   * Generar demandante formateado
   */
  generarDemandante(demandante) {
    let texto = "DEMANDANTE:\n";
    texto += `Nombre: ${demandante.nombre}\n`;
    texto += `Cédula: ${demandante.cedula}\n`;
    texto += `Domicilio: ${demandante.domicilio}\n`;
    if (demandante.apoderado) {
      texto += `Apoderado: ${demandante.apoderado}\n`;
    }
    return texto;
  }

  /**
   * Generar demandado formateado
   */
  generarDemandado(demandado) {
    let texto = "DEMANDADO:\n";
    texto += `Entidad: ${demandado.entidad}\n`;
    texto += `Representante: ${demandado.representante}\n`;
    texto += `Domicilio: ${demandado.domicilio}\n`;
    return texto;
  }

  /**
   * Generar fundamentos jurídicos formateados
   */
  generarFundamentos(fundamentos) {
    let texto = "FUNDAMENTOS JURÍDICOS:\n\n";

    if (fundamentos.constitucion.length > 0) {
      texto += "Constitución Política de Colombia:\n";
      fundamentos.constitucion.forEach(art => {
        texto += `• ${art}\n`;
      });
      texto += "\n";
    }

    if (fundamentos.jurisprudencia.length > 0) {
      texto += "Jurisprudencia:\n";
      fundamentos.jurisprudencia.forEach(sent => {
        texto += `• ${sent}\n`;
      });
      texto += "\n";
    }

    if (fundamentos.normativa.length > 0) {
      texto += "Normativa Aplicable:\n";
      fundamentos.normativa.forEach(norm => {
        texto += `• ${norm}\n`;
      });
    }

    return texto;
  }

  /**
   * Obtener lista de plantillas disponibles
   */
  listarPlantillas() {
    return Object.keys(this.plantillas).map(clave => ({
      id: clave,
      nombre: this.plantillas[clave].nombre,
      descripcion: this.plantillas[clave].descripcion
    }));
  }
}

module.exports = TemplateGenerator;
