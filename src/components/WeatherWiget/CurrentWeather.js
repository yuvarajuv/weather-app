import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import moment from 'moment';

// Boostrap components
import { Row, Col } from 'react-bootstrap';

// Contants
import { TEMP_UNITS, WIND_UINTS } from '../../config';

const CurrentWeather = ({ data, unit }) => {
  const cityName = get(data, 'name');
  const timeStamp = get(data, 'dt');
  const weatherDetails = get(data, ['weather', '0'], {});

  const weatherDesc = get(weatherDetails, 'description');
  const weatherIcon = get(weatherDetails, 'icon');

  const temp = get(data, ['main', 'temp'], '-');
  const pressure = get(data, ['main', 'pressure'], '-');
  const humidity = get(data, ['main', 'humidity'], '-');
  const windSpeed = get(data, ['wind', 'speed'], '-');

  return (
    <Row className="weatherCard mt-4">
      <Col xs={12} md={12}>
        <h1>{cityName}</h1>
        <div><small>{moment(timeStamp * 1000).format('LLL')}</small></div>
        <div className="text-capitalize">{weatherDesc}</div>
      </Col>
      <Col xs={12} md={6}>
        <div className="d-flex">
          {
            weatherIcon && (<img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather Icon" />)
          }
          <h3 className="align-self-center">
            {temp}
            <sup>{get(TEMP_UNITS, [unit], '')}</sup>
          </h3>
        </div>
      </Col>
      <Col xs={12} md={6}>
        <div>
          <span>{`Pressure: ${pressure} `}</span>
          <small>hPa</small>
        </div>
        <div>
          <span>{`Humidity: ${humidity} `}</span>
          <small>%</small>
        </div>
        <div>
          <span>{`Wind Speed: ${windSpeed} `}</span>
          <small>{get(WIND_UINTS, [unit], '')}</small>
        </div>
      </Col>
    </Row>
  );
};

CurrentWeather.propTypes = {
  data: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired
};

export default CurrentWeather;
