import PropTypes from 'prop-types';
import css from './filter.module.css';

const Filter = ({ inputValue }) => {
  return (
    <>
      <p className={css.filter_tittle}>Find contacts by name</p>
      <input name="filter" onChange={inputValue} />
    </>
  );
};

export default Filter;
Filter.propTypes = {
  inputValue: PropTypes.func.isRequired,
};
