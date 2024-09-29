import React, {useContext} from 'react';
import {SongContext} from '../context/SongContext';

const useNotes = () => {
  const context = useContext(SongContext);

  if (context === null) {
    throw new Error(
      'MarketplaceContext must be used within a MarketplaceProvider',
    );
  }
  return context;
};

export default useNotes;
