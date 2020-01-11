import React from 'react';
import { SvgXml } from 'react-native-svg';

const Settings = ({ color = '#FFF', width = 310, height = 338 }) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 310 338">
        <path fill=${color} fill-rule="evenodd" d="M78.995 75.406c43.92-43.846 109.906-56.864 167.155-32.975 57.249 23.89 94.471 79.973 94.293 142.072-.246 84.565-68.784 152.99-153.246 152.99-62.021 0-117.928-37.432-141.62-94.821-23.694-57.39-10.501-123.419 33.418-167.266zm153.556-.104c-43.97-18.382-94.672-8.409-128.428 25.262-33.757 33.671-43.91 84.398-25.717 128.492 18.193 44.094 61.142 72.857 108.791 72.857 64.836 0 117.465-52.494 117.711-117.41.179-47.708-28.386-90.819-72.357-109.2zM187.197 98.67c9.703 0 17.589 7.786 17.765 17.459l.003.33v61.374l44.863 51.144c6.5 7.37 5.805 18.62-1.555 25.128-7.269 6.429-18.319 5.828-24.854-1.287l-.243-.27-49.304-56.481a17.802 17.802 0 0 1-4.432-11.138l-.01-.425v-68.045c0-9.825 7.955-17.79 17.767-17.79zm111.521-97.59a17.887 17.887 0 0 1 17.02 4.371l.273.269 53.303 53.368c6.991 7 6.991 18.35 0 25.35-6.903 6.912-18.041 7-25.051.262l-.268-.262-53.302-53.368a17.94 17.94 0 0 1-4.634-17.315A17.914 17.914 0 0 1 298.72 1.08zM5.081 59.087L58.383 5.719A17.753 17.753 0 0 1 75.908.574a17.779 17.779 0 0 1 12.798 13.043 17.804 17.804 0 0 1-5.169 17.197l-.28.255-53.301 53.368a17.755 17.755 0 0 1-12.438 4.892 17.768 17.768 0 0 1-16.18-11.014 17.806 17.806 0 0 1 3.48-18.953l.263-.275L58.383 5.719 5.081 59.087z"/>
    </svg>
  `;

  return <SvgXml xml={xml} />;
}

export default Settings;