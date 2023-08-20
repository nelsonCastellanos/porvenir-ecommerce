/**
 *
 * Checkbox
 *
 */

import React from 'react';

class Radio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      size: event.target.value
    });
    this.props.handleChangeSubmit(event.target.name,event.target.value);
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <label>
              <input
                name="sorting"
                type="radio"
                value="Nuevos primero"
                checked={this.state.size === "Nuevos primero"}
                onChange={this.handleChange}
              />
              Nuevos primero
            </label>
          </li>

          <li>
            <label>
              <input
                name="sorting"
                type="radio"
                value="De mayor a menor precio"
                checked={this.state.size === "De mayor a menor precio"}
                onChange={this.handleChange}
              />
              De mayor a menor precio
            </label>
          </li>

          <li>
            <label>
              <input
                name="sorting"
                type="radio"
                value="De menor a mayor precio"
                checked={this.state.size === "De menor a mayor precio"}
                onChange={this.handleChange}
              />
              De menor a mayor precio
            </label>
          </li>
        </ul>
      </div>
    );
  }
}

export default Radio;
