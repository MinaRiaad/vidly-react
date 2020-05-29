import React, { Component } from "react";
import Input from "./common/input";
import joi from "joi-browser";
import SelectMenu from "./common/selectMenu";

class Form extends Component {
  validate = () => {
    const { data } = this.state;
    const options = { abortEarly: false };
    const { error } = joi.validate(data, this.schema, options);
    if (!error) return null;
    const errors = {};
    error.details.map(item => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput = (name, label, type) => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        id={name}
        name={name}
        label={label}
        error={errors[name]}
      />
    );
  };

  renderSelectMenu = (name, label, type,options) => {
    const { data, errors } = this.state;
    return (
      <SelectMenu
        id={name}
        name={name}
        label={label}
        options={options}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  };

  renderButton = label => {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    )
  };
}

export default Form;
