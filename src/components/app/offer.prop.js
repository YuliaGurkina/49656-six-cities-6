import PropTypes from 'prop-types';

export default PropTypes.shape({
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
}).isRequired;
