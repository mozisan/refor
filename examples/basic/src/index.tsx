import * as React from 'react';
import { render } from 'react-dom';
import { FormHandler, FormSchema, CheckboxInputSchema, TextInputSchema } from 'refor';

class Form extends React.Component {
  private formHandler = new FormHandler({
    schema: new FormSchema({
      inputs: {
        email: new TextInputSchema(),
        password: new TextInputSchema(),
        rememberMe: new CheckboxInputSchema({ initial: true }),
      },
    }),
    onUpdate: () => this.forceUpdate(),
    shouldSubmit: outputs => outputs.email !== '' && outputs.password !== '',
    onSubmit: outputs => console.log('Submit: ', outputs),
  });

  public render(): JSX.Element {
    return (
      <form onSubmit={this.formHandler.takeSubmitEvent}>
        <div>
          <label htmlFor={this.formHandler.inputs.email.key}>Email</label>
          <input
            type="text"
            id={this.formHandler.inputs.email.key}
            value={this.formHandler.inputs.email.value}
            onChange={this.formHandler.inputs.email.takeChangeEvent}
          />
        </div>

        <div>
          <label htmlFor={this.formHandler.inputs.password.key}>Password</label>
          <input
            type="password"
            id={this.formHandler.inputs.password.key}
            value={this.formHandler.inputs.password.value}
            onChange={this.formHandler.inputs.password.takeChangeEvent}
          />
        </div>

        <div>
          <label htmlFor={this.formHandler.inputs.rememberMe.key}>Remember?</label>
          <input
            type="checkbox"
            role="checkbox"
            id={this.formHandler.inputs.rememberMe.key}
            checked={this.formHandler.inputs.rememberMe.value}
            aria-checked={this.formHandler.inputs.rememberMe.value}
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
