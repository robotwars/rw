import React   from 'react';
import Main    from './Main.jsx';
import '../node_modules/basscss/css/basscss.css';

// Connect to SocketIO on the same host
var socket = io.connect();

React.render(
  <Main socket={socket} />,
  document.getElementById('app')
);
