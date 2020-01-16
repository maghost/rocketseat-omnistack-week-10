import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

function DevItem({ navigation, dev }) {
  return (
    <Marker
      coordinate={{
        longitude: dev.location.coordinates[0],
        latitude: dev.location.coordinates[1]
      }}
    >
      <Image
        style={styles.avatar}
        source={{
          uri: dev.avatar_url
        }}
      />

      <Callout
        onPress={() => {
          navigation.navigate('Profile', {
            github_username: dev.github_username
          });
        }}
      >
        <View style={styles.callout}>
          <Text style={styles.name}>{dev.name}</Text>
          <Text style={styles.bio}>{dev.bio}</Text>
          <Text style={styles.techs}>{dev.techs.join(', ')}</Text>
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },

  callout: {
    width: 260
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16
  },

  bio: {
    color: '#666666',
    marginTop: 5
  },

  techs: {
    marginTop: 5
  }
});

export default DevItem;
