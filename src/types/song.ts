export interface SongSection {
  id: string;
  type: "estrofa" | "coro" | "puente" | "instrumental" | "otro";
  content: string;
  color?: string;
  number?: number;
}

export type SongData = SongSection[];
