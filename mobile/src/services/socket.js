import socketio from 'socket.io-client';
import { API_ENDPOINT } from 'react-native-dotenv';

const socket = socketio(API_ENDPOINT, {
  autoConnect: false
});

function connect(params) {
  const { latitude, longitude, techs } = params;

  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };

  socket.connect();

  socket.on('message', text => console.log(text));
}

function disconnect() {
  socket.connected && socket.disconnect();
}

function subscribeToNewDevs(subscribeFunction) {
  socket.on('new-dev', subscribeFunction);
}

export { connect, disconnect, subscribeToNewDevs };
