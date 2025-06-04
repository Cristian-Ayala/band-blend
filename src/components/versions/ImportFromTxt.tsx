import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React from "react";

function transformarLetraConAcordes(textoOriginal: string): string {
  const regexAcordes =
    /[A-G][#b]?(?:maj|min|m|sus|add|dim|aug)?[0-9]*(?:\/[A-G][#b]?)?/g;
  const lineas = textoOriginal.split("\n");
  const textoTransformado = [];

  function esEncabezado(linea: string): boolean {
    return /^(Coro|Verso|Estrofa|Puente)(\s*\d*):?$/i.test(linea.trim());
  }

  interface AcordeInfo extends RegExpMatchArray {
    index: number;
    input: string;
  }

  function transformarLinea(acordes: AcordeInfo[], letra: string): string {
    const acordesOrdenados = [...acordes].sort((a, b) => b.index - a.index);
    let resultado = letra;
    for (const acordeInfo of acordesOrdenados) {
      let pos = acordeInfo.index;
      const acorde = acordeInfo[0];
      if (pos > resultado.length) {
        pos = resultado.length;
      }
      resultado =
        resultado.substring(0, pos) + `[${acorde}]` + resultado.substring(pos);
    }
    return resultado;
  }

  for (let i = 0; i < lineas.length; i++) {
    const lineaActual = lineas[i];
    const trimLinea = lineaActual.trim();

    if (trimLinea === "") {
      textoTransformado.push("");
      continue;
    }

    if (esEncabezado(lineaActual)) {
      textoTransformado.push(trimLinea);
      continue;
    }

    const acordes = [...lineaActual.matchAll(regexAcordes)];
    if (acordes.length > 0) {
      if (i + 1 < lineas.length) {
        const siguienteLinea = lineas[i + 1];
        const trimSiguiente = siguienteLinea.trim();
        if (trimSiguiente !== "" && !esEncabezado(siguienteLinea)) {
          const lineaTransformada = transformarLinea(acordes, siguienteLinea);
          textoTransformado.push(lineaTransformada);
          i++;
          continue;
        }
      }
      textoTransformado.push(trimLinea);
    } else {
      textoTransformado.push(trimLinea);
    }
  }

  return textoTransformado.join("\n");
}

function dividirEnSecciones(textoTransformado: string): Array<{
  id: string;
  type: string;
  number: number | null;
  content: string;
}> {
  const lineas = textoTransformado.split("\n");
  const secciones = [];
  let seccionActual = null;
  let lineasSeccion = [];
  let contadorId = 1;

  interface EncabezadoInfo {
    tipo: string;
    numero: number | null;
  }

  function esEncabezado(linea: string): EncabezadoInfo | null {
    const match = linea
      .trim()
      .match(/^(Coro|Verso|Estrofa|Puente|Instrumental|Otro)\s*(\d*):?$/i);
    return match
      ? { tipo: match[1], numero: match[2] ? parseInt(match[2]) : null }
      : null;
  }

  interface MapearTipo {
    (tipo: string): "estrofa" | "coro" | "puente" | "instrumental" | "otro";
  }

  const mapearTipo: MapearTipo = (tipo) => {
    const tipoLower = tipo.toLowerCase();
    if (tipoLower === "verso") return "estrofa";
    const tipos = ["estrofa", "coro", "puente", "instrumental", "otro"];
    return tipos.includes(tipoLower) ? (tipoLower as MapearTipoReturn) : "otro";
  };

  type MapearTipoReturn =
    | "estrofa"
    | "coro"
    | "puente"
    | "instrumental"
    | "otro";

  function limpiarLineasVaciasFinal(arr: string[]): string[] {
    const result: string[] = [...arr];
    while (result.length > 0 && result[result.length - 1].trim() === "") {
      result.pop();
    }
    return result;
  }

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i];
    const infoEncabezado = esEncabezado(linea);

    if (infoEncabezado) {
      if (seccionActual) {
        const lineasLimpias = limpiarLineasVaciasFinal(lineasSeccion);
        const contenido = lineasLimpias.join("\n");
        secciones.push({
          id: String(contadorId++),
          type: mapearTipo(seccionActual.tipo),
          number: seccionActual.numero,
          content: contenido + (contenido ? "\n" : ""),
        });
        lineasSeccion = [];
      }
      seccionActual = {
        tipo: infoEncabezado.tipo,
        numero: infoEncabezado.numero,
      };
    } else {
      if (seccionActual) lineasSeccion.push(linea);
    }
  }

  if (seccionActual) {
    const lineasLimpias = limpiarLineasVaciasFinal(lineasSeccion);
    const contenido = lineasLimpias.join("\n");
    secciones.push({
      id: String(contadorId++),
      type: mapearTipo(seccionActual.tipo),
      number: seccionActual.numero,
      content: contenido + (contenido ? "\n" : ""),
    });
  }

  return secciones;
}

interface ImportFromTxtProps {
  open: boolean;
  onClose: () => void;
  onImportChrodsFromText: (
    sections: Array<{
      id: string;
      type: string;
      number: number | null;
      content: string;
    }>,
  ) => void;
}

const ImportFromTxt: React.FC<ImportFromTxtProps> = ({
  open,
  onClose,
  onImportChrodsFromText,
}) => {
  const [text, setText] = React.useState("");

  const handleImport = () => {
    const transformedText = transformarLetraConAcordes(text);
    const sectioned = dividirEnSecciones(transformedText);
    setText("");
    onImportChrodsFromText(sectioned);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Importar desde TXT</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Contenido"
          type="text"
          fullWidth
          multiline
          minRows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleImport} variant="contained" color="primary">
          Importar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportFromTxt;
