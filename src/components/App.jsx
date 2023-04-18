import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = contact => {
    const { contacts } = this.state;

    const doesContactExists = contacts.some(({ name }) => {
      const nameSanitized = name.toLocaleLowerCase().trim();
      const newContactNameSanitized = contact.name.toLocaleLowerCase().trim();

      return nameSanitized === newContactNameSanitized;
    });

    if (doesContactExists) {
      alert(`${contact.name} is already in contact`);

      return;
    }

    const id = nanoid();

    this.setState(state => ({
      contacts: [
        ...state.contacts,
        {
          ...contact,
          id,
        },
      ],
    }));
  };

  updateFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  deleteContact = contactId => {
    return () => {
      this.setState(({ contacts }) => ({
        contacts: contacts.filter(({ id }) => {
          return contactId !== id;
        }),
      }));
    };
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    const { contacts } = this.state;

    const filteredContacts = contacts.filter(({ name }) => {
      const { filter } = this.state;

      const filterSanitized = filter.toLocaleLowerCase().trim();
      const nameSanitized = name.toLocaleLowerCase().trim();

      return nameSanitized.includes(filterSanitized);
    });

    return (
      <div>
        <ContactForm addContact={this.addContact} />

        <Filter filter={this.state.filter} updateFilter={this.updateFilter} />

        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
