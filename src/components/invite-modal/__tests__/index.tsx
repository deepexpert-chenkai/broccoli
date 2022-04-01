import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import InviteModal, { Step } from '../index';

const waitForPromises = () => new Promise(resolve => setTimeout(resolve));
const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
  });
};

describe('Modal', () => {
  it('should show Form when step is invite', () => {
    const component = shallow(<InviteModal onClose={()=>{}} show={true} />);

    expect(component.find('Form')).toHaveLength(1);
    expect(component.find('Success')).toHaveLength(0);
  });

  it('should show Success when step is success', () => {
    const realUseState = React.useState;
    const stubInitialState = Step.SUCCESS;
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))

    const component = mount(<InviteModal onClose={()=>{}} show={true} />);
    expect(component.find('Form')).toHaveLength(0);
    expect(component.find('Success')).toHaveLength(1);
  });

  it('should show Success when Form trigger onSuccess', async () => {
    const component = shallow(<InviteModal onClose={()=>{}} show={true} />);

    expect(component.find('Form')).toHaveLength(1);
    expect(component.find('Success')).toHaveLength(0);

    // form submit success
    await act(async () => {
      component.find('Form').props().onSuccess();
      await component.update();
    })
    expect(component.find('Success')).toHaveLength(1);
    expect(component.find('Form')).toHaveLength(0);
    
    // close modal
    await act(async () => {
      component.find('Success').props().onClose();
      await component.update();
    })
    waitForComponentToPaint(component);
    expect(component.find('Form')).toHaveLength(1);
    expect(component.find('Success')).toHaveLength(0);
  });
});