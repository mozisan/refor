# Refor: React form handler

[![wercker status](https://app.wercker.com/status/a58445da0dc27ddbc4f2d1366fb92a5f/s/master "wercker status")](https://app.wercker.com/project/byKey/a58445da0dc27ddbc4f2d1366fb92a5f)

Refor dose

- handle form events
- update state of user inputs

**with no interference with UI component structure**.

So that, you can use refor in your app much easily!

## Supported types of input

- **`string`** (`<input>`, `<textarea>`, `<select>`)
- **`boolean`** (`<input type="checkbox">`)
- **`File`** (`<input type="file">`)

## Usage

```ts
import * as React from 'react';
import { render } from 'react-dom';
import { FormHandler, CheckboxInputSchema, TextInputSchema } from 'refor';

interface UserInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Props {
  onSubmit(inputs: UserInputs): void;
}

class Form extends React.Component<Props> {
  private formHandler = new FormHandler({
    schema: {
      email: TextInputSchema.build(),
      password: TextInputSchema.build(),
      rememberMe: CheckboxInputSchema.build({ initial: true }),
    },
    onUpdate: () => this.forceUpdate(),
    shouldSubmit: inputs => inputs.email !== '' && inputs.password !== '',
    onSubmit: this.props.onSubmit,
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
            id={this.formHandler.inputs.rememberMe.key}
            checked={this.formHandler.inputs.rememberMe.isChecked}
            onChange={this.formHandler.inputs.rememberMe.toggle}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

## License

MIT