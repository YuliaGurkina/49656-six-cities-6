import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';


const Setting = {
  OFFERS_COUNT: 121
};

ReactDOM.render(
    <App
      offersCount={Setting.OFFERS_COUNT}
    />,
    document.querySelector(`#root`)
);
