import React from 'react';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';

const Stain1 = ({ style = {} }) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 33 35">
      <defs>
        <path id="a" d="M0 0h35v32H0z"/>
      </defs>
      <g fill="none" fill-rule="evenodd" transform="rotate(80 15.886 16.283)">
        <mask id="b" fill="#fff">
            <use xlink:href="#a"/>
        </mask>
        <path fill="#1AFB9B" d="M12.95.276c2.962-.577 6.032-.168 8.979.486 2.97.655 4.583 3.98 6.993 5.833 3.624 2.792 6.92 5.328 5.885 9.775-.63 2.708-2.23 5.084-3.93 7.286-1.455 1.885-3.026 3.712-4.955 5.104-3.06 2.209-6.894 3.204-10.672 3.239-2.164.022-4.38-.272-6.3-1.268-1.892-.98-2.584-4.354-3.878-6.044C3.05 22.04.594 20.787.127 17.492c-.72-5.07 1.673-10.455 5.926-13.33L12.95.276z" mask="url(#b)"/>
      </g>
    </svg>
  `;
  return <SvgXml xml={xml} style={{
    position: 'absolute',
    bottom: '-5%',
    ...style,
  }} />;
}

export default Stain1;