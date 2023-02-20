import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList/';

import css from './phone-book.module.css';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('listContacts'));
    if (contacts && contacts.length) {
      this.setState({ contacts });
      console.log(this.state);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('listContacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ number, name }) => {
    if (this.isDublicate(name)) {
      return alert(`${name} ${number} already on your contact list`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return {
        contacts: [newContact, ...contacts],
      };
    });
  };

  removeContact = id => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const newListContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newListContacts };
    });
  };

  isDublicate = name => {
    const { contacts } = this.state;
    const normalizeName = name.toLocaleLowerCase();

    const dublicateItem = contacts.find(
      ({ name }) => normalizeName === name.toLocaleLowerCase()
    );
    return Boolean(dublicateItem);
  };

  filterContact = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizeFilter = filter.toLowerCase();
    const findElement = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizeFilter)
    );
    return findElement;
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const contacts = this.filterContact();

    return (
      <div className={css.wrapper}>
        <h2 className={css.page_tittle}> Phone book</h2>
        <div className={css.info}>
          <div className={css.new_contact}>
            <ContactForm addContact={this.addContact} />
          </div>
          <div className={css.list_contacts}>
            <Filter inputValue={this.handleFilter} />
            <h3 className={css.tittle_list}>List contacts</h3>
            <ContactList
              items={contacts}
              onDeleteContact={this.removeContact}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneBook;
