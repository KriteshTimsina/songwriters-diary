export interface Songs {
  id: number;
  title: string;
  content: string;
  color: string;
  isPinned: boolean;
  duration: string;
  clip: string | null;
  theme?: string;
}

export type SongInput = Pick<
  Songs,
  'title' | 'content' | 'clip' | 'duration' | 'theme'
>;

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

export type SearchbarProps = {
  onSearch: (text: string) => void;
  onClear: () => void;
  searchText: string;
  onChangeText: (text: string) => void;
};
