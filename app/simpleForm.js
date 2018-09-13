import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderField = (field) => (
    <div className="input-row">
      <input {...field.input} type="text"/>
      {field.meta.touched && field.meta.error &&
       <span className="error">{field.meta.error}</span>}
    </div>
  )

const ContactForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="Account">Account Name</label>
        <Field name="account" component={renderField} type="text" />
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <Field name="password" component={renderField} type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default reduxForm({
  form: 'contact'
})(ContactForm);
