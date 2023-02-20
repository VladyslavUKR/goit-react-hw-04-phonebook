import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './contact-form.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { addContact } = this.props;
    addContact({ ...this.state });
    this.setState({ number: '', name: '' });
  };

  inputValue = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //  ({ addContact, name, number, inputValue }) => {

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>NAME</label>
          <input
            onChange={this.inputValue}
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
            onChange={this.inputValue}
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
  }
}

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
