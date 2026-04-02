import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';

import contactList from './contacts.json';

import styles from './App.module.css';
import { useEffect, useState } from 'react';

const App = () => {
  const loadFromStorage = (key, fallback) => {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;

      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const [contacts, setContacts] = useState(() =>
    loadFromStorage('contacts', contactList)
  );
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = contact => {
    setContacts(contacts => [...contacts, contact]);
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
      contact.number.toLowerCase().includes(searchValue.toLowerCase().trim())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <SearchBox searchValue={searchValue} onSearch={setSearchValue} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
};

export default App;
