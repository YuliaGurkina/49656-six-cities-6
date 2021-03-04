import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const CitiesList = ({locations, selectedCity, onSelect}) => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((item) => {
            return (
              <li className="locations__item" key={item.id}>
                <Link
                  className={`locations__item-link tabs__item ${item.name === selectedCity ? `tabs__item--active` : ``}`}
                  to="/"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onSelect([], item);
                  }}
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

CitiesList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number
  })).isRequired,
  selectedCity: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};


export default CitiesList;
