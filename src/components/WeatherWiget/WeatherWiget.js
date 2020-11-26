import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Constants
import { WEATHER_API_URL, WEATHER_APP_ID } from '../../config';

// Service
import { getCall } from '../../lib/Service';

// Components
import { Loader } from '../../components';
import CurrrentWeather from './CurrentWeather';
import ForecastWeater from './ForecastWeather';


export const WeatherWiget = ({ latitude, longitude, unit }) => {
  const [allValues, setValues] = useState({
    loading: true,
    error: null,
    currentData: {},
    forcastData: {},
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [current, forecast] = await Promise.all([
          getCall(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_APP_ID}&units=${unit}`),
          getCall(`${WEATHER_API_URL}/onecall?lat=${latitude}&lon=${longitude}&appid=${WEATHER_APP_ID}&units=${unit}&exclude=minutely,hourly,alerts`)
        ]);
        setValues({
          ...allValues,
          loading: false,
          currentData: current,
          forcastData: forecast
        });
      } catch (e) {
        setValues({
          ...allValues,
          loading: false,
          error: 'Weather report is currently not avaliable !'
        });
      }
    }
    setValues({
      ...allValues,
      loading: true
    });
    fetchData();
  }, [latitude, longitude, unit]);

  const {
    loading, error, currentData, forcastData
  } = allValues;

  if (loading) {
    return (<Loader />);
  }

  if (error) {
    return (<div className="alert alert-danger mt-4">{error}</div>);
  }

  return (
    <>
      <CurrrentWeather data={currentData} unit={unit} />
      <ForecastWeater data={get(forcastData, 'daily', [])} unit={unit} />
    </>
  );
};

WeatherWiget.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired
};
