import React, { useState, useEffect } from 'react';

// Boostrap components
import Container from 'react-bootstrap/Container';

// Components
import { Header, WeatherWiget, Loader } from '../../components';

// Constants
import { DEFAULT_LAN, DEFAULT_LON } from '../../config';

export const Home = () => {
  const [allValues, setValues] = useState({
    loading: true,
    latitude: null,
    longitude: null,
    unit: 'standard',
    initialValues: {
      latitude: null,
      longitude: null,
    }
  });

  const setUnit = (unit) => {
    setValues({
      ...allValues,
      unit
    });
  };

  const setCoordinates = (latitude, longitude) => {
    setValues({
      ...allValues,
      latitude,
      longitude
    });
  };

  useEffect(() => {
    //get geo location
    navigator.geolocation.getCurrentPosition((position) => {
      // success
      setValues({
        ...allValues,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        loading: false,
        initialValues: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      });
    }, (e) => {
      // failed
      setValues({
        ...allValues,
        latitude: DEFAULT_LAN,
        longitude: DEFAULT_LON,
        loading: false,
        initialValues: {
          latitude: DEFAULT_LAN,
          longitude: DEFAULT_LON,
        }
      });
    }, {
      enableHighAccuracy: true,
      timeout: 5000
    });
  }, []);

  const {
    loading, latitude, longitude, unit, initialValues
  } = allValues;

  if (loading) {
    return (<Loader />);
  }

  return (
    <>
      <Header
        unit={unit}
        setUnit={setUnit}
        setCoordinates={setCoordinates}
        initialValues={initialValues}
      />
      <Container fluid>
        <WeatherWiget
          latitude={latitude}
          longitude={longitude}
          unit={unit}
        />
      </Container>
    </>
  );
};
