import * as React from 'react';
import { render } from 'react-dom';
import { FormHandler, MultiselectInputSchema } from 'refor';

class Form extends React.Component {
  private formHandler = new FormHandler({
    schema: {
      skills: MultiselectInputSchema.build({ initial: ['JS'] }),
    },
    onUpdate: () => this.forceUpdate(),
    onSubmit: inputs => console.log('Submit: ', inputs),
  });

  public render(): JSX.Element {
    return (
      <form onSubmit={this.formHandler.takeSubmitEvent}>
        <div>
          <label htmlFor={this.formHandler.inputs.skills.key}>Skills</label>
          <div>
            <select
              id={this.formHandler.inputs.skills.key}
              value={this.formHandler.inputs.skills.values}
              onChange={this.formHandler.inputs.skills.takeChangeEvent}
              multiple
            >
              <option value="JS">JS</option>
              <option value="CSS">CSS</option>
              <option value="HTML">HTML</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          (Selected: {this.formHandler.inputs.skills.values.join(', ') || '<empty>'})
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

render(<Form />, document.getElementById('container'));