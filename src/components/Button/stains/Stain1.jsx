import React from 'react';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';

const Stain1 = ({ color = '#DAFF00', style = {} }) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 171 177">
      <g fill="none" fill-rule="evenodd">
          <path fill=${color} d="M62.868 24.272c-40.495 0-73.098 47.897-56.4 87.236 7.827 18.438 15.61 23.505 15.682 23.322 4.455 13.224-3.538 11.707 15.44 27.34 3.37 2.777 39.529 7.863 47.066 9.142 30.458 5.166 73.62-19.48 84.601-49.394 2.733-7.444-2.869-25.27-4.045-28.743C151.645 53.098 109.41 32.098 71.34 24l-8.472.272z"/>
      </g>
    </svg>
  `;
  return <SvgXml xml={xml} style={{
    position: 'absolute',
    bottom: '-10%',
    ...style,
  }} />;
}

export default Stain1;