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
    return (
      <form onSubmit={this.formHandler.takeSubmitEvent}>
        <div>
          <label htmlFor={this.formHandler.inputs.postalCode.key}>Postal code (auto-excluding hyphens)</label>
          <input
            type="text"
            id={this.formHandler.inputs.postalCode.key}
            value={this.formHandler.inputs.postalCode.value}
            onChange={this.formHandler.inputs.postalCode.takeChangeEvent}
          />
          <div>(Formatted: {this.formHandler.outputs.postalCode || '<empty>'})</div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label htmlFor={this.formHandler.inputs.sentence.key}>Sentence (auto-trimming)</label>
          <div>
            <textarea
              id={this.formHandler.inputs.sentence.key}
              value={this.formHandler.inputs.sentence.value}
              onChange={this.formHandler.inputs.sentence.takeChangeEvent}
            />
          </div>
          <div>
            (Count: {this.formHandler.outputs.sentence.length} chars)
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
