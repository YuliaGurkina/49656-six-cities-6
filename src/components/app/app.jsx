import React from 'react';
import PropTypes from 'prop-types';
import Main from "../main/main";

const App = (props) => {
  return (
    <Main offersCount={props.offersCount}/>
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
};

export default App;
