import PropTypes from 'prop-types';

import css from './contact-list.module.css';

const ContactList = ({ items, onDeleteContact }) => {
  const newContact = items.map(({ number, name, id }) => (
    <li key={id}>
      {name}.{number}
      <button
        onClick={() => onDeleteContact(id)}
        className={css.btn_delete}
        type="button"
      >
        delete
      </button>
    </li>
  ));

  return <ol>{newContact}</ol>;
};

export default ContactList;

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
