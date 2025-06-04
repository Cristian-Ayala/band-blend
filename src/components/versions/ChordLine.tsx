export default function ChordLine({ line }: { line: string }) {
  let chordsLine = "";
  let lyricsLine = "";
  let i = 0;

  while (i < line.length) {
    if (line[i] === "[") {
      const end = line.indexOf("]", i);
      const chord = line.slice(i + 1, end);
      // Rellena con espacios hasta la posición actual de la letra
      while (chordsLine.length < lyricsLine.length) {
        chordsLine += " ";
      }
      // Inserta el acorde en la posición actual
      chordsLine += chord;
      // Avanza i después del acorde
      i = end + 1;
    } else {
      lyricsLine += line[i];
      // Si la línea de acordes es más corta, rellena con espacio
      if (chordsLine.length < lyricsLine.length) {
        chordsLine += " ";
      }
      i++;
    }
  }

  // Igualar longitudes
  if (chordsLine.length < lyricsLine.length) {
    chordsLine = chordsLine.padEnd(lyricsLine.length, " ");
  } else if (chordsLine.length > lyricsLine.length) {
    lyricsLine = lyricsLine.padEnd(chordsLine.length, " ");
  }

  return (
    <pre
      style={{
        fontFamily: "monospace",
        margin: 0,
        background: "none",
        color: "inherit",
      }}
    >
      <span style={{ color: "#4FC3F7" }}>{chordsLine}</span>
      {"\n"}
      {lyricsLine}
    </pre>
  );
}
