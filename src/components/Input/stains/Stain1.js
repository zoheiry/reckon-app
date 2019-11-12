import React from 'react';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';

const Stain1 = ({ color = '#DAFF00', width = '100%', height = '47px' }) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346 47">
      <defs>
          <path id="a" d="M0 0h345.418v46.704H0z"/>
      </defs>
      <g fill="none" fill-rule="evenodd">
          <mask id="b" fill="#fff">
              <use xlink:href="#a"/>
          </mask>
          <path fill=${color} d="M12.521 4.383c-5.394 1.475-5.348 1.942-8.49 6.204C.887 14.847-.11 20.362.008 25.655c.115 5.126 1.457 10.669 5.508 13.813 3.586 2.783 8.452 3.072 12.988 3.212 66.36 2.036 132.904-3.542 199.107 1.433 16.447 1.237 32.907 3.125 49.387 2.45 12.566-.516 25.024-2.518 37.567-3.442 9.541-.703 19.476-.868 28.024-5.166 8.55-4.298 15.172-14.312 12.036-23.351-1.934-5.576-7.136-9.521-12.724-11.424-5.587-1.902-11.595-2.068-17.496-2.205-28.479-.66-56.967-1.098-85.452-.838C185.688.53 142.415 2.53 99.17 1.179 70.191.272 40.78-2.101 12.521 4.383" mask="url(#b)"/>
      </g>
    </svg>
  `;
  return <SvgXml xml={xml} style={{
    position: 'absolute',
    bottom: -10,
  }} width={width} height={height} />;
}

export default Stain1;