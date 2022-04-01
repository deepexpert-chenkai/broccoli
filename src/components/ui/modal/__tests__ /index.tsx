import React from 'react';
import { shallow, mount } from 'enzyme';

import Modal from '../index';

describe('Modal', () => {
  it('should call onClose when click mask', () => {
    const clickFn = jest.fn();
    const component = shallow(<Modal show={true} onClose={clickFn}/>);

    component.find('.modal-mask').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });


  it('should not show children when show is false', () => {
    const clickFn = jest.fn();
    const component = mount(<Modal show={true} onClose={clickFn}><div className="chilren"></div></Modal>);

    component.find('.chilren').toHaveLength(1);
    component.setProps({show: false});
    component.find('.chilren').toHaveLength(0);
  });
});