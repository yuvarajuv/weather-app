import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// CSS
import './Search.css';

// Typehead
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';

// Constants
import { MAPBOX_API_URL, MAPBOX_TOKEN } from '../../config';

// Service
import { getCall } from '../../lib/Service';

const AsyncTypeahead = withAsync(Typeahead);
export const Search = ({ setCoordinates, initialValues }) => {
  const [allValues, setValues] = useState({
    loading: false,
    options: []
  });

  const searchCity = async (query) => {
    try {
      setValues({
        ...allValues,
        loading: false
      });

      const data = await getCall(`${MAPBOX_API_URL}/${query}.json?access_token=${MAPBOX_TOKEN}`);
      const list = get(data, 'features', []).map((item) => {
        const placeName = get(item, 'place_name');
        const latitude = get(item, ['geometry', 'coordinates', '0'], null);
        const longitude = get(item, ['geometry', 'coordinates', '1'], null);
        return {
          id: latitude,
          placeName,
          latitude,
          longitude
        };
      });
      setValues({
        loading: false,
        options: list
      });
    } catch (e) {
      setValues({
        loading: false,
        options: []
      });
    }
  };

  const { loading, options } = allValues;

  return (
    <div>
      <AsyncTypeahead
        onChange={(selected) => {
          setCoordinates(get(selected, ['0', 'latitude'], initialValues.latitude),
            get(selected, ['0', 'longitude'], initialValues.longitude));
        }}
        isLoading={loading}
        labelKey={option => `${option.placeName}`}
        onSearch={searchCity}
        options={options}
        align="left"
        emptyLabel="No city found"
        id="search"
        placeholder="Search city"
        className="searchBox"
      />
    </div>
  );
};

Search.propTypes = {
  setCoordinates: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired
};
