import React from 'react';
import { shallow } from 'enzyme';

import Modal from '../index';

describe('Modal', () => {
  it('should call onClose when click mask', () => {
    const clickFn = jest.fn();
    const component = shallow(<Modal show={true} onClose={clickFn}/>);

    component.find('.modal-mask').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});