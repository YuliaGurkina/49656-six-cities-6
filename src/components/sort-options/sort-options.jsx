import React, {useState} from 'react';
import {selectSortOption} from "../../store/action";
import PropTypes from "prop-types";
import {Options} from "../../const";

const SortOptions = ({onSelect, sortOption}) => {
  const [isOpenSortMenu, setOpenSortMenu] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => (
          setOpenSortMenu(!isOpenSortMenu)
        )}
      >
        {sortOption.name}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpenSortMenu ? `places__options--opened` : ``}`}>
        {Options.map((item, i) => {
          return <li
            className={`places__option ${sortOption.name === item.name ? `places__option--active` : ``}`}
            tabIndex="0"
            key={`option-${i}`}
            onClick={() => {
              selectSortOption(item);
              onSelect(item);
              setOpenSortMenu(!isOpenSortMenu);
            }}
          >{item.name}</li>;
        })}
      </ul>
    </form>
  );
};

SortOptions.propTypes = {
  onSelect: PropTypes.func.isRequired,
  sortOption: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })
};

export default SortOptions;
