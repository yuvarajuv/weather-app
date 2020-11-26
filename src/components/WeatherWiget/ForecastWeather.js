import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import moment from 'moment';

// Boostrap components
import { Row, Col, ListGroup } from 'react-bootstrap';

// Contants
import { TEMP_UNITS } from '../../config';

const ForecastWeather = ({ data, unit }) => (
  <Row>
    <Col>
      <hr />
      <ListGroup horizontal="lg">
        {
          data.map((item) => {
            const timeStamp = get(item, 'dt');
            const weatherDetails = get(item, ['weather', '0'], {});
            const weatherIcon = get(weatherDetails, 'icon');
            const weatherDesc = get(weatherDetails, 'description');
            const maxTemp = get(item, ['temp', 'max'], '-');
            const minTemp = get(item, ['temp', 'min'], '-');
            return (
              <ListGroup.Item className="listItem" key={timeStamp}>
                <div>{moment(timeStamp * 1000).format('dddd')}</div>
                {
                  weatherIcon && (<div><img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather Icon" /></div>)
                }
                <div className="text-capitalize"><small>{weatherDesc}</small></div>
                <div>
                  <small>
                    <strong>
                      {maxTemp}
                      <sup>{get(TEMP_UNITS, [unit], '')}</sup>
                    </strong>
                    <span className="ml-2">
                      {minTemp}
                      <sup>{get(TEMP_UNITS, [unit], '')}</sup>
                    </span>
                  </small>
                </div>
              </ListGroup.Item>
            );
          })
        }
      </ListGroup>
    </Col>
  </Row>
);

ForecastWeather.propTypes = {
  data: PropTypes.array.isRequired,
  unit: PropTypes.string.isRequired
};

export default ForecastWeather;
