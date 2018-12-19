import * as React from 'react';
import { shallow, mount } from 'enzyme';

import SubmitForm from './index';

const FORM_NAME = 'test';
const ITEM = { username: 'username', email: 'a@b.com', image: 'img.png', };
const DATA = { testusername: 'username', testemail: 'a@b.com', testimage: 'img.png', };
const fields = [
  { name: 'username', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'image', type: 'file' },
];

function getWrapper({ onSubmit=jest.fn(), errors=null }={}, render=shallow) {
  const props = {
    fields, onSubmit, errors,
    formName: FORM_NAME,
  };
  return render(<SubmitForm { ...props } />);
}

describe('Initial state', () => {
  const wrapper = getWrapper()

  it('check inputs total length', () => {
    const items = wrapper.find('input');
    expect(items)
      .toHaveLength(fields.length);
  });

  fields.forEach(({ name, type }) => {
    it('input ' + name, () => {
      const formName = FORM_NAME + name;
      const input = wrapper.find(`[name="${ formName }"]`);
      expect(input.props())
        .toMatchObject({ id: formName, type });
      expect(input.parent().key())
        .toEqual(`${ 0 }_${ formName }`);
      const label = wrapper.find(`[htmlFor="${ formName }"]`);
          expect(label.exists())
            .toBe(true);
    });
  });

  expectErrorText(wrapper, { isExists: false });
  expectFormState(wrapper, { isEnabled: false });
});


describe('Initial with init error', () => {
  const errors = [ 'init error' ];
  const wrapper = getWrapper({ errors });

  describe.each`
    touched    | show
    ${ false } | ${ true }
    ${ true }  | ${ false }
  `('Form is touched: $touched',
    ({ touched, show }) => {
      wrapper.setState({ touched });

      const FormErrorMessage = wrapper.find('FormErrorMessage');
      const shownErrors = FormErrorMessage.props().errors;

      it('Show init errors: ' + show, () => {
        if (show) {
          expect(shownErrors).toEqual(errors);
        } else {
          expect(shownErrors).not.toEqual(errors);
        }
      });

      expectFormState(wrapper, { isEnabled: false });
  });
});

describe.each`
  field           | value
  ${ 'username' } | ${ '' }
  ${ 'email' }    | ${ '' }
  ${ 'email' }    | ${ 'not!valid@|?' }
  ${ 'image' }    | ${ '' }
`('Not valid $field : $value', ({ field, value }) => {
  const wrapper = getWrapper();
  const formName = FORM_NAME + field;
  wrapper.setState({
    item: { ...DATA, [ formName ]: value },
    touched: true,
  });
  expectErrorText(wrapper, { isExists: true });
  expectFormState(wrapper, { isEnabled: false });
});


describe.each`
  name | value
  ${ 'username' } | ${ 'Finn' }
  ${ 'email' }    | ${ 'finn.humat@at.com' }
  ${ 'image' }    | ${ ['img.png'] }
`('Touch input $name', ({ name, value }) => {
  const wrapper = getWrapper();
  const formName = FORM_NAME + name;
  const prevItem = wrapper.state().item;

  const input = wrapper.find(`[name="${ formName }"]`);
  const eventKey = value instanceof Array ? 'files' : 'value';
  input.simulate('change', { target: { [ eventKey ]: value, name: formName } });

  it('state is changed', () => {
    const expectedValue = value instanceof Array ? value[0] : value;
    expect(wrapper.state())
      .toEqual({
        item: { ...prevItem, [ formName ]: expectedValue },
        touched: true
      });
  });

  expectErrorText(wrapper, { isExists: true });
  expectFormState(wrapper, { isEnabled: false });

});

describe('valid fields', () => {
  const onSubmit = jest.fn();
  const wrapper = getWrapper({ onSubmit }, mount);
  wrapper.setState({ item: DATA, touched: true });

  expectErrorText(wrapper, { isExists: false });
  expectFormState(wrapper, { isEnabled: true });

  it('submit the form', () => {
    const nBefore = wrapper.instance().n;
    const form = wrapper.find('form');
    const event = { preventDefault: jest.fn() };
    form.simulate('submit', event);
    expect(onSubmit)
      .toHaveBeenCalledWith(ITEM);
    expect(event.preventDefault)
      .toHaveBeenCalled();

    const state = wrapper.state();
    expect(state)
      .toEqual({
        touched: false,
        item: {
          testusername: '',
          testemail: '',
          testimage: '',
        },
      });

    const nAfter = wrapper.instance().n;
    expect(nAfter).toEqual(nBefore + 1);
  });

  describe('input keys after submit', () => {
    fields.forEach(({ name, type }) => {
      it('input ' + name, () => {
        const formName = FORM_NAME + name;
        const input = wrapper.find(`[name="${ formName }"]`);
        expect(input.parent().key())
        .toEqual(`${ 1 }_${ formName }`);
      });
    });
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

