# Refor: React form handler

[![wercker status](https://app.wercker.com/status/a58445da0dc27ddbc4f2d1366fb92a5f/s/master "wercker status")](https://app.wercker.com/project/byKey/a58445da0dc27ddbc4f2d1366fb92a5f)
[![Coverage Status](https://coveralls.io/repos/github/mozisan/refor/badge.svg?branch=feature%2Fenable-uploading-coverage-to-coveralls)](https://coveralls.io/github/mozisan/refor?branch=feature%2Fenable-uploading-coverage-to-coveralls)
[![npm version](https://img.shields.io/npm/v/refor.svg?style=flat)](https://www.npmjs.com/package/refor)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

Refor dose

- handle form events
- update state of user inputs

**with no interference with UI component structure**.

So that, you can use refor in your app much easily!

## Supported types of input

- **`string`** (`<input>`, `<textarea>`, `<select>`)
- **`string[]`** (`<select multiple>`)
- **`boolean`** (`<input type="checkbox">`)
- **`File`** (`<input type="file">`)

## Usage

```ts
import * as React from 'react';
import { FormHandler, FormSchema, CheckboxInputSchema, TextInputSchema } from 'refor';

interface FormOutputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Props {
  onSubmit(inputs: FormOutputs): void;
}

class Form extends React.Component<Props> {
  private formHandler = new FormHandler({
    schema: new FormSchema({
      inputs: {
        email: new TextInputSchema(),
        password: new TextInputSchema(),
        rememberMe: new CheckboxInputSchema({ initial: true }),
      },
    }),
    onUpdate: () => this.forceUpdate(),
    shouldSubmit: values => values.email !== '' && values.password !== '',
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
            id={this.formHandler.inputs.rememberMe.key}
            checked={this.formHandler.inputs.rememberMe.value}
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