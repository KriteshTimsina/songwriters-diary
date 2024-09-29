import {SongInput, Songs} from '../interfaces/songs';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'notes.db', location: 'default'},
  () => console.log('Database opened'),
  error => console.log('Error: ', error),
);

// Create the cart table with Promise
const createSongTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS note(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          content TEXT
        )`,
        [],
        () => {
          console.log('Song table created');
          resolve();
        },
        (error: any) => {
          console.log('Song table error', error);
          reject(error);
        },
      );
    });
  });
};

// Add to cart with Promise
const saveNote = (songInput: SongInput): Promise<Songs | null> => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO note (title, content) VALUES (?, ?)`,
        [songInput.title, songInput.content],
        (_, result) => {
          console.log('Note saved');
          // Get the ID of the last inserted note
          const insertId = result.insertId;
          console.log(insertId, 'INSERT ID');

          // Retrieve the saved note by its ID
          txn.executeSql(
            `SELECT * FROM note WHERE id = ?`,
            [insertId],
            (_, res) => {
              if (res.rows.length > 0) {
                const savedNote = res.rows.item(0);
                console.log('Saved note retrieved:', savedNote);
                resolve(savedNote); // Return the saved note
              } else {
                resolve(null);
              }
            },
          );
        },
        (error: any) => {
          console.log('Error saving note', error);
          reject(error);
        },
      );
    });
  });
};

// // Update cart item quantity with Promise
const updateNote = (id: number, newNote: SongInput): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE note SET title = ?, content = ? WHERE id = ?`,
        [newNote.title, newNote.content, id],
        () => {
          console.log('Note updated');
          resolve();
        },
        (error: any) => {
          console.log('Error Updating note', error);
          reject(error);
        },
      );
    });
  });
};

// // Remove item from cart with Promise
const deleteNoteById = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `DELETE FROM note WHERE id = ?`,
        [id],
        () => {
          console.log('Note removed from db');
          resolve(true);
        },
        (error: any) => {
          console.log('Error: ', error);
          reject(false);
        },
      );
    });
  });
};

// // Get all cart items with Promise
const getAllNotes = (): Promise<Songs[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM note`,
        [],
        (tx, results) => {
          const rows = results.rows;
          let notes: Songs[] = [];
          for (let i = 0; i < rows.length; i++) {
            notes.push(rows.item(i));
          }
          resolve(notes);
        },
        (error: any) => {
          console.log('Error getting notes ', error);
          reject(error);
        },
      );
    });
  });
};

// // Get item by product ID with Promise
const getNoteById = (id: number): Promise<Songs | null> => {
  console.log(id, 'AKO XA?');
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM note WHERE id = ?`,
        [id],
        (tx, results) => {
          if (results.rows.length > 0) {
            const items = results.rows.item(0);
            resolve(items);
          } else {
            resolve(null);
          }
        },
        (error: any) => {
          console.log('Cannot get single note: ', error);
          reject(error);
        },
      );
    });
  });
};

// // Clear all items from cart with Promise
// const clearCart = (): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     db.transaction(txn => {
//       txn.executeSql(
//         `DELETE FROM cart`,
//         [],
//         () => {
//           console.log('CLEARED CART');
//           resolve();
//         },
//         (error: any) => {
//           console.log('Error: ', error);
//           reject(error);
//         },
//       );
//     });
//   });
// };

export {
  db,
  createSongTable,
  saveNote,
  getAllNotes,
  updateNote,
  getNoteById,
  deleteNoteById,
  //   updateCart,
  //   removeFromCart,
  //   getCartItems,
  //   clearCart,
  //   getItemById,
};
