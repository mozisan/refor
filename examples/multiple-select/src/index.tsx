import * as React from 'react';
import { render } from 'react-dom';
import { FormHandler, FormSchema, MultiselectInputSchema } from 'refor';

class Form extends React.Component {
  private formHandler = new FormHandler({
    schema: new FormSchema({
      inputs: {
        skills: new MultiselectInputSchema({ initial: ['JS'] }),
      },
    }),
    onUpdate: () => this.forceUpdate(),
    onSubmit: outputs => console.log('Submit: ', outputs),
  });

  public render(): JSX.Element {
    const { inputs, handleSubmit } = this.formHandler;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={inputs.skills.key}>Skills</label>
          <div>
            <select
              id={inputs.skills.key}
              value={inputs.skills.value}
              onChange={inputs.skills.handleChange}
              multiple
            >
              <option value="JS">JS</option>
              <option value="CSS">CSS</option>
              <option value="HTML">HTML</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          (Selected: {inputs.skills.value.join(', ') || '<empty>'})
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

render(<Form />, document.getElementById('container'));
