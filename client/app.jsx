import React         from 'react';
import MainLoader    from './MainLoader.jsx';
import '../node_modules/basscss/css/basscss.css';

// Connect to SocketIO on the same host
var socket = io.connect();

React.render(
  <MainLoader socket={socket} />,
  document.getElementById('app')
);
