import * as React from 'react';
import { shallow } from 'enzyme';

import TaskAdd from './element';

const FIELDS = { username: 'username', email: 'email@ex.com', text: 'text', image: 'img.png' };

describe('Initial state', () => {
  const wrapper = shallow(<TaskAdd onAdd={ jest.fn() }/>);

  expectErrorText(wrapper, { isExists: false });
  expectFormState(wrapper, { isEnabled: false });

  describe('expect elements', () => {
    ['username', 'email', 'text', 'image'].forEach(name => {
      it(name, () => {
        const input = wrapper.find(`[name="${ name }"]`);
        expect(input.props().id)
          .toEqual(name);
        const label = wrapper.find(`[htmlFor="${ name }"]`);
        expect(label.exists())
          .toBe(true);
      });
    });
  });
});

describe.each`
  name            | eventKey     | value
  ${ 'username' } | ${ 'value' } | ${ 'Boris' }
  ${ 'image' }    | ${ 'files' } | ${ ['kindoffile.png'] }
`('touch input $name', ({ name, eventKey, value }) => {
    const wrapper = shallow(<TaskAdd onAdd={ jest.fn() }/>);
    const prevState = wrapper.state();

    const input = wrapper.find(`[name="${ name }"]`);
    input.simulate('change', { target: { [ eventKey ]: value, name } });

    it('state is changed', () => {
      const expectedValue = value instanceof Array ? value[0] : value;
      expect(wrapper.state())
        .toEqual({ ...prevState, [ name ]: expectedValue, touched: true });
    });

    expectErrorText(wrapper, { isExists: true });
    expectFormState(wrapper, { isEnabled: false });
});


describe.each`
  field         | value
  ${'email'}    | ${ '!not@valid?' }
  ${'email'}    | ${ '' }
  ${'text'}     | ${ '' }
  ${'username'} | ${ '' }
  ${'image'}    | ${ '' }
`('Not valid form: $field > $value', ({ field, value }) => {
    const wrapper = shallow(<TaskAdd onAdd={ jest.fn() }/>);
    wrapper.setState({ ...FIELDS, [field]: value, touched: true });
    expectErrorText(wrapper, { isExists: true });
    expectFormState(wrapper, { isEnabled: false });
});

describe('valid fields', () => {
  const onAdd = jest.fn();
  const wrapper = shallow(<TaskAdd onAdd={ onAdd }/>);
  wrapper.setState({ ...FIELDS, touched: true });

  expectErrorText(wrapper, { isExists: false });
  expectFormState(wrapper, { isEnabled: true });

  it('submit the form', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onAdd)
      .toHaveBeenCalledWith(FIELDS);
  });
});



function expectFormState(wrapper, { isEnabled }) {
  it('form submit is a function: ' + isEnabled, () => {
    const form = wrapper.find('form');
    const { onSubmit } = form.props();

    if (isEnabled) {
      expect(onSubmit)
        .toBeInstanceOf(Function);
    } else {
      expect(onSubmit)
        .toBeUndefined();
    }
  });

  it('button is enabled: ' + isEnabled, () => {
    const button = wrapper.find('button');
    expect(button.props().disabled)
      .toBe(isEnabled ? false : true);
  });
}

function expectErrorText(wrapper, { isExists }) {
  it('error message exists: ' + isExists, () => {
    const errorMessage = wrapper.find('FormErrorMessage');
    expect(errorMessage.exists())
      .toBe(isExists);
  });
}



