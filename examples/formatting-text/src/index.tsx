import * as React from 'react';
import { render } from 'react-dom';
import { FormHandler, TextInputSchema } from 'refor';

const excludeHyphens = (value: string) => value.replace('-', '');
const trim = (value: string) => value.trim();

class Form extends React.Component {
  private formHandler = new FormHandler({
    schema: {
      postalCode: TextInputSchema.build({ formatBy: excludeHyphens }),
      sentence: TextInputSchema.build({ formatBy: trim }),
    },
    onUpdate: () => this.forceUpdate(),
    onSubmit: inputs => console.log('Submit: ', inputs),
  });

  public render(): JSX.Element {
    return (
      <form onSubmit={this.formHandler.takeSubmitEvent}>
        <div>
          <label htmlFor={this.formHandler.inputs.postalCode.key}>Postal code (auto-excluding hyphens)</label>
          <input
            type="text"
            id={this.formHandler.inputs.postalCode.key}
            value={this.formHandler.inputs.postalCode.value.raw}
            onChange={this.formHandler.inputs.postalCode.takeChangeEvent}
          />
          <div>(Formatted: {this.formHandler.inputs.postalCode.value.formatted || '<empty>'})</div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label htmlFor={this.formHandler.inputs.sentence.key}>Sentence (auto-trimming)</label>
          <div>
            <textarea
              id={this.formHandler.inputs.sentence.key}
              value={this.formHandler.inputs.sentence.value.raw}
              onChange={this.formHandler.inputs.sentence.takeChangeEvent}
            />
          </div>
          <div>
            (Count: {this.formHandler.inputs.sentence.value.formatted.length} chars)
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
