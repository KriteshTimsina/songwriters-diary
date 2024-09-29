import {SongContextProps, SongInput, Songs} from '../interfaces/songs';
import {createContext, useEffect, useState} from 'react';
import {
  db,
  createSongTable,
  saveNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../database/database';
import {Alert} from 'react-native';

export const SongContext = createContext<SongContextProps | null>(null);

const SongProvider = ({children}: {children: React.ReactNode}) => {
  const [notes, setNotes] = useState<Songs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSongNotes();
  }, []);

  const loadSongNotes = async () => {
    try {
      setLoading(true);
      await createSongTable();
      const items = await getAllNotes();
      console.log(items, 'SONG');
      setNotes(items);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  // const getCartItems = async () => {
  //   setLoading(true);
  //   const items = await sqliteGetCartItems();
  //   setLoading(false);
  //   setCartItem(items);
  // };

  const onSaveNote = async (note: Songs) => {
    console.log(note, 'xa ta id  ');
    try {
      if (!note.id) {
        const savedNote = await saveNote(note);
        return savedNote;
      } else {
        const itemExists = await getNoteById(note.id);
        if (itemExists) {
          await updateNote(itemExists.id, note);
        }
      }
    } catch (error: any) {
      Alert.alert('Failed to save note', error.message);
    }
  };

  // const clearCart = () => {
  //   setLoading(true);
  //   sqliteClearCart();
  //   setCartItem([]);
  //   setLoading(false);
  // };

  // const onRemoveFromCart = (itemId: number | string) => {
  //   setLoading(true);
  //   sqliteRemoveFromCart(itemId);
  //   getCartItems();
  //   setLoading(false);
  // };

  return (
    <SongContext.Provider
      value={{
        notes,
        loadSongNotes,
        onSaveNote,
      }}>
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;
