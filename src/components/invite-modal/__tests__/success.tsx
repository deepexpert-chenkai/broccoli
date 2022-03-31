import React from 'react';
import { shallow } from 'enzyme';

import Success from '../success';

describe('Modal', () => {
  it('should call onClose when click button', () => {
    const clickFn = jest.fn();
    const component = shallow(<Success onClose={clickFn}/>);

    component.find('button').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});