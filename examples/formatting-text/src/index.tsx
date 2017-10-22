import * as React from 'react';
import { render } from 'react-dom';
import { FormHandler, FormSchema, TextInputSchema } from 'refor';

const excludeHyphens = (value: string) => value.replace(/-/g, '');

class Form extends React.Component {
  private formHandler = new FormHandler({
    schema: new FormSchema({
      inputs: {
        postalCode: new TextInputSchema(),
        sentence: new TextInputSchema(),
      },
      outputs: ({ postalCode, sentence }) => ({
        postalCode: excludeHyphens(postalCode),
        sentence: sentence.trim(),
      }),
    }),
    onUpdate: () => this.forceUpdate(),
    onSubmit: outputs => console.log('Submit: ', outputs),
  });

  public render(): JSX.Element {
    const { inputs, outputs, handleSubmit } = this.formHandler;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={inputs.postalCode.key}>Postal code (auto-excluding hyphens)</label>
          <input
            type="text"
            id={inputs.postalCode.key}
            value={inputs.postalCode.value}
            onChange={inputs.postalCode.handleChange}
          />
          <div>(Formatted: {outputs.postalCode || '<empty>'})</div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label htmlFor={inputs.sentence.key}>Sentence (auto-trimming)</label>
          <div>
            <textarea
              id={inputs.sentence.key}
              value={inputs.sentence.value}
              onChange={inputs.sentence.handleChange}
            />
          </div>
          <div>
            (Count: {outputs.sentence.length} chars)
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

render(<Form />, document.getElementById('container'));
