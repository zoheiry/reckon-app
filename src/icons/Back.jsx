import React from 'react';
import { SvgXml } from 'react-native-svg';

const Back = ({ color = '#232323', width = '30px', height = '30px' }) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 30 29">
      <path fill=${color} fill-rule="evenodd" d="M18.169 26.902c.877.858 2.345.858 3.24 0l1.343-1.287a2.161 2.161 0 0 0 0-3.105l-8.7-8.321 8.7-8.339a2.161 2.161 0 0 0 0-3.105L21.41 1.458c-.896-.84-2.364-.84-3.241 0L6.496 12.628a2.161 2.161 0 0 0 0 3.105l11.673 11.169z"/>
    </svg>
  `;

  return <SvgXml xml={xml} />;
}

export default Back;