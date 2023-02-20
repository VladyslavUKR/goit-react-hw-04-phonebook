import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList/';

import css from './phone-book.module.css';

const PhoneBook = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('my-contact'));
    return contacts ? contacts : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem('my-contact', JSON.stringify(contacts));
    }
  }, [contacts]);

  const isDublicate = name => {
    const normalizeName = name.toLocaleLowerCase();

    const dublicateItem = contacts.find(
      ({ name }) => normalizeName === name.toLocaleLowerCase()
    );
    return Boolean(dublicateItem);
  };

  const inputFilter = e => {
    setFilter(e.target.value);
  };

  const addContact = ({ number, name }) => {
    if (isDublicate(name)) {
      return alert(`${name} ${number} already on your contact list`);
    }
    setContacts(prevState => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [...prevState, newContact];
    });
  };

  const removeContact = id => {
    setContacts(prevState => {
      const newListContacts = contacts.filter(contact => contact.id !== id);
      return [...newListContacts];
    });
  };

  const filterContact = () => {
    if (!filter) {
      return contacts;
    }
    const normalizeFilter = filter.toLowerCase();
    const findElement = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizeFilter)
    );
    return findElement;
  };

  const filtercontacts = filterContact();

  return (
    <div className={css.wrapper}>
      <h2 className={css.page_tittle}> Phone book</h2>
      <div className={css.info}>
        <div className={css.new_contact}>
          <ContactForm addContact={addContact} />
        </div>
        <div className={css.list_contacts}>
          <Filter inputValue={inputFilter} />
          <h3 className={css.tittle_list}>List contacts</h3>
          <ContactList items={filtercontacts} onDeleteContact={removeContact} />
        </div>
      </div>
    </div>
  );
};

export default PhoneBook;

/*
class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

 

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


 */
