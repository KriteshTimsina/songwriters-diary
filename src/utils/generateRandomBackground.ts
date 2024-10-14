import {backgrounds} from '../constants/Colors';

const generateRandomBackground = () => {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};

export default generateRandomBackground;
