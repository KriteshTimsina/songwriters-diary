export interface Songs {
  id: number;
  title: string;
  content: string;
  color: string;
  isPinned: boolean;
}

export type SongInput = Pick<Songs, 'title' | 'content'>;

export type SongContextProps = {
  notes: Songs[];
  loadSongNotes: () => void;
  onSaveNote: (note: SongInput) => Promise<Songs | null>;
  deleteNote: (id: number) => Promise<boolean>;
};

export type RecordOptions = {
  records: any;
  onStartPlay: () => void;
  onStopPlay: () => void;
  isPlaying: boolean;
  playTime: string;
  duration: string;
};

export type NoteControlsProps = {
  saveNote: () => void;
  onStartRecord: () => void;
  onStopRecord: () => void;
  isRecording: boolean;
};
