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
    const { inputs, handleSubmit } = this.formHandler;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={inputs.email.key}>Email</label>
          <input
            type="text"
            id={inputs.email.key}
            value={inputs.email.value}
            onChange={inputs.email.handleChange}
          />
        </div>

        <div>
          <label htmlFor={inputs.password.key}>Password</label>
          <input
            type="password"
            id={inputs.password.key}
            value={inputs.password.value}
            onChange={inputs.password.handleChange}
          />
        </div>

        <div>
          <label htmlFor={inputs.rememberMe.key}>Remember?</label>
          <input
            type="checkbox"
            role="checkbox"
            id={inputs.rememberMe.key}
            checked={inputs.rememberMe.value}
            aria-checked={inputs.rememberMe.value}
            onChange={inputs.rememberMe.toggle}
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
