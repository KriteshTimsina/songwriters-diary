export interface Songs {
  id: number;
  title: string;
  content: string;
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

export type RecordProps = {
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

interface RecordOptions {
  recordTime: string;
  recordedUri: string | null;
  isRecording: boolean;
  playTime: string;
  duration: string;
  isPlaying: boolean;
}

export interface AudioHookReturn {
  recordOptions: RecordOptions;
  onStartRecord: () => Promise<void>;
  onStopRecord: () => Promise<void>;
  onStartPlay: () => Promise<void>;
  onPausePlay: () => Promise<void>;
  onStopPlay: () => Promise<void>;
  setRecordedUri: React.Dispatch<React.SetStateAction<string | null>>;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
}
