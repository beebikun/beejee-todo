import * as React from 'react';
import { shallow } from 'enzyme';

import Root from './index';

it('render without crashing', () => {
  shallow(<Root />);
});
