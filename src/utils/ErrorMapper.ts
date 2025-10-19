import { SourceMapConsumer } from "source-map";

/**
 * ErrorMapper: Traduce errores de JavaScript compilado a código TypeScript original
 * Usa source maps para mostrar la ubicación real del error en tu código fuente
 */
export class ErrorMapper {
  // Cache del SourceMapConsumer (leer el archivo .map es costoso)
  // eslint-disable-next-line no-underscore-dangle
  private static _consumer?: SourceMapConsumer;

  /**
   * Obtiene el SourceMapConsumer (cargado desde main.js.map)
   * Se carga solo una vez y se cachea para ahorrar CPU
   */
  public static get consumer(): SourceMapConsumer {
    // eslint-disable-next-line no-underscore-dangle
    if (this._consumer == null) {
      // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-argument
      this._consumer = new SourceMapConsumer(require("main.js.map"));
    }

    // eslint-disable-next-line no-underscore-dangle
    return this._consumer;
  }

  // Cache de stack traces ya traducidos (para no traducir el mismo error múltiples veces)
  public static cache: { [key: string]: string } = {};

  /**
   * Traduce un stack trace de JavaScript a TypeScript usando source maps
   *
   * ⚠️ ADVERTENCIA: Primera llamada después de reset cuesta ~30 CPU!
   * Llamadas subsecuentes cuestan ~0.1 CPU gracias al cache
   *
   * @param error - El error o stack trace original de JavaScript
   * @returns Stack trace traducido mostrando archivos y líneas TypeScript
   */
  public static sourceMappedStackTrace(error: Error | string): string {
    const stack: string = error instanceof Error ? (error.stack as string) : error;

    // Verificar si ya está en cache
    if (Object.prototype.hasOwnProperty.call(this.cache, stack)) {
      return this.cache[stack];
    }

    // Regex para parsear líneas del stack trace
    // Formato: "    at functionName (file.js:123:45)"
    // eslint-disable-next-line no-useless-escape
    const re = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm;
    let match: RegExpExecArray | null;
    let outStack = error.toString();

    // Procesar cada línea del stack trace
    while ((match = re.exec(stack))) {
      if (match[2] === "main") {
        // Buscar la posición original en el source map
        const pos = this.consumer.originalPositionFor({
          column: parseInt(match[4], 10),
          line: parseInt(match[3], 10)
        });

        if (pos.line != null) {
          if (pos.name) {
            // Caso ideal: tenemos nombre de función y archivo
            outStack += `\n    at ${pos.name} (${pos.source}:${pos.line}:${pos.column})`;
          } else {
            if (match[1]) {
              // Sin nombre de función, usar el del trace original
              outStack += `\n    at ${match[1]} (${pos.source}:${pos.line}:${pos.column})`;
            } else {
              // Sin nombre de función, solo mostrar ubicación
              outStack += `\n    at ${pos.source}:${pos.line}:${pos.column}`;
            }
          }
        } else {
          // No se pudo mapear la posición
          break;
        }
      } else {
        // No es del archivo main.js, terminar
        break;
      }
    }

    // Guardar en cache para futuras llamadas
    this.cache[stack] = outStack;
    return outStack;
  }

  /**
   * Envuelve la función loop principal para capturar y traducir errores automáticamente
   *
   * @param loop - Tu función loop principal
   * @returns Función loop con manejo de errores integrado
   */
  public static wrapLoop(loop: () => void): () => void {
    return () => {
      try {
        loop();
      } catch (e) {
        if (e instanceof Error) {
          if ("sim" in Game.rooms) {
            // En simulador: source maps no funcionan, mostrar error original
            const message = `Los source maps no funcionan en simulador - mostrando error original`;
            console.log(`<span style='color:red'>${message}<br>${_.escape(e.stack)}</span>`);
          } else {
            // En servidor: traducir el error usando source maps
            console.log(`<span style='color:red'>${_.escape(this.sourceMappedStackTrace(e))}</span>`);
          }
        } else {
          // No es un Error estándar, re-lanzar
          throw e;
        }
      }
    };
  }
}
