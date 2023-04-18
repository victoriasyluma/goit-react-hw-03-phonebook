import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.scss";

export class Filter extends Component {
  render() {
    return (
      <div className={styles.filter}>
        <h2>Contacts</h2>
        <p className={styles.title}>Find contacts by name</p>

        <input value={this.props.filter} onChange={this.props.updateFilter} />
      </div>
    );
  }
}

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired,
};
