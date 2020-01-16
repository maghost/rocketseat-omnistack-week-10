import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from 'expo-location';

import api from '../services/api';

import DevForm from '../components/DevForm';
import DevItem from '../components/DevItem';

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }

    loadInitialPosition();
  }, []);

  async function handleSearchDevs(searchParams) {
    const { latitude, longitude } = currentRegion;

    const { data } = await api.get('/search', {
      params: {
        latitude,
        longitude,
        ...searchParams
      }
    });

    setDevs(data.devs);
  }

  function handleRegionChange(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) return null;

  return (
    <>
      <MapView
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChange}
        style={styles.map}
      >
        {devs.map(dev => (
          <DevItem key={dev._id} navigation={navigation} dev={dev} />
        ))}
      </MapView>
      <DevForm searchDevs={handleSearchDevs} />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default Main;
