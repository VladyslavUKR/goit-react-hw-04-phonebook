import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './contact-form.module.css';

import initialState from './initialStateForm';

const ContactForm = ({ addContact }) => {
  const [state, setState] = useState({ ...initialState });

  const { number, name } = state;
  const handleSubmit = e => {
    e.preventDefault();
    addContact({ ...state });
    setState({ ...initialState });
  };

  const inputValue = e => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>NAME</label>
        <input
          onChange={inputValue}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div>
        <label>NUMBER</label>
        <input
          onChange={inputValue}
          type="tel"
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button className={css.btn_addContact} type="submit">
        add NEW contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
