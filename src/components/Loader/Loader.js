import React from 'react';
import PropTypes from 'prop-types';

// Boostrap component
import Spinner from 'react-bootstrap/Spinner';

export const Loader = ({ containerClassName, animation, variant }) => (
  <div className={containerClassName}>
    <Spinner animation={animation} variant={variant} />
  </div>
);

Loader.propTypes = {
  containerClassName: PropTypes.string,
  animation: PropTypes.string,
  variant: PropTypes.string
};

Loader.defaultProps = {
  containerClassName: 'mt-4 text-center',
  animation: 'border',
  variant: 'info'
};
