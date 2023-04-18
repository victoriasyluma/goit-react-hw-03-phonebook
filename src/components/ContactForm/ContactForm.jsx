import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.scss";

export class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleAddContact = (submitEvent) => {
    submitEvent.preventDefault();

    const { name, number } = this.state;

    this.setState({
      number: "",
      name: "",
    });

    this.props.addContact({ name, number });
  };

  whenContactFormChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleAddContact} className={styles.form}>
        <h1>Phonebook</h1>
        <label>
          Name:
          <input
            value={this.state.name}
            onChange={this.whenContactFormChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label>
          Number:
          <input
            value={this.state.number}
            onChange={this.whenContactFormChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
