import * as React from 'react';
import { render } from 'react-dom';
import { FormHandler, CheckboxInputSchema, TextInputSchema } from 'refor';

class Form extends React.Component {
  private formHandler = new FormHandler({
    schema: {
      email: TextInputSchema.build(),
      password: TextInputSchema.build(),
      rememberMe: CheckboxInputSchema.build({ initial: true }),
    },
    onUpdate: () => this.forceUpdate(),
    shouldSubmit: inputs => inputs.email !== '' && inputs.password !== '',
    onSubmit: inputs => console.log('Submit: ', inputs),
  });

  public render(): JSX.Element {
    return (
      <form onSubmit={this.formHandler.takeSubmitEvent}>
        <div>
          <label htmlFor={this.formHandler.inputs.email.key}>Email</label>
          <input
            type="text"
            id={this.formHandler.inputs.email.key}
            value={this.formHandler.inputs.email.value.raw}
            onChange={this.formHandler.inputs.email.takeChangeEvent}
          />
        </div>

        <div>
          <label htmlFor={this.formHandler.inputs.password.key}>Password</label>
          <input
            type="password"
            id={this.formHandler.inputs.password.key}
            value={this.formHandler.inputs.password.value.raw}
            onChange={this.formHandler.inputs.password.takeChangeEvent}
          />
        </div>

        <div>
          <label htmlFor={this.formHandler.inputs.rememberMe.key}>Remember?</label>
          <input
            type="checkbox"
            role="checkbox"
            id={this.formHandler.inputs.rememberMe.key}
            checked={this.formHandler.inputs.rememberMe.isChecked}
            aria-checked={this.formHandler.inputs.rememberMe.isChecked}
            onChange={this.formHandler.inputs.rememberMe.toggle}
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

render(<Form />, document.getElementById('container'));
