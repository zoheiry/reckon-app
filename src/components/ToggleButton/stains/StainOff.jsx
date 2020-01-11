import React from 'react';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';

const Stain1 = ({ color = '#DAFF00', style = {} }) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 38">
      <path fill="#FD843E" fill-rule="evenodd" d="M10.575 5.007C4.306 5 2.681 8.892 1.332 14.962c-1.35 6.07.951 12.551 4.98 17.313 2.247 2.653 5.45 4.12 9.131 3.756 3.071-.306 5.6 2.237 8.455 1.074 6.7-2.723 11.556-9.44 12.011-16.606.454-7.168-3.493-13.485-9.795-17.019-2.54-1.427-5.506-3.228-8.407-2.915-2.904.309-5.737 1.9-7.132 4.442"/>
    </svg>

  `;
  return <SvgXml xml={xml} style={{
    position: 'absolute',
    bottom: '-10%',
    ...style,
  }} />;
}

export default Stain1;