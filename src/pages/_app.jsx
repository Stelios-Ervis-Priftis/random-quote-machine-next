import '@/styles/globals.css';
import PropTypes from 'prop-types';
import React from 'react';

export default function App({ Component }) {
  return <Component />;
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
