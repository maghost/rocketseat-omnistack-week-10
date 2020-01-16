import React from 'react';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
  const username = navigation.getParam('github_username');

  return <WebView source={{ uri: `https://github.com/${username}` }} />;
}

export default Profile;
