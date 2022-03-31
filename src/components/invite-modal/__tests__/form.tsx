import React from 'react';
import mockAxios from "jest-mock-axios";
import { shallow, mount } from 'enzyme';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from '../form';

jest.mock("axios", () => {
  return {
    post: (url, { email })=> {
      if(email === 'error@test.com') {
        return Promise.reject({
          response: {data: {errorMessage: 'register error'}}
        });
      } else if(email === 'no_res_error@test.com') {
        return Promise.reject()
      } else {
        return Promise.resolve('Success')
      }
    }
  };
});
const wait = () => new Promise((resolve) => {
  setTimeout(resolve, 100);
})

describe('Form', () => {
  const successFn = jest.fn();
  beforeEach(() => {
    render(<Form onSuccess={successFn}/>);
    mockAxios.reset();
  });

  const mockSubmit = (name, email, confirmEmal) => {
    fireEvent.input(screen.getByRole("name"), {
      target: {
        value: name
      }
    });
    fireEvent.input(screen.getByRole("email"), {
      target: {
        value: email
      }
    });
    fireEvent.input(screen.getByRole("confirmEmail"), {
      target: {
        value: confirmEmal
      }
    });
    fireEvent.submit(screen.getByRole("button"));
  }

  it("should display required error when form not fill at all", async () => {
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
  });

  it("should display email invalid error when email is invalid", async () => {
    mockSubmit("Philip", "Philip", "Philip");

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getAllByText("Invalid Email.")).toHaveLength(1);
  });

  it("should display confirm email invalid error when confirm email is different", async () => {
    mockSubmit("Philip", "Philip@gmail.com", "Philip@qq.com");

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getAllByText("Confirm email should be same as Email.")).toHaveLength(1);
  });


  it("should loading text when submit", async () => {
    mockSubmit("Philip", "Philip@gmail.com", "Philip@gmail.com");

    expect(await screen.findAllByText("Sending, please wait")).toHaveLength(1);
  });

  it("should call onSuccess when submit success", async () => {
    mockSubmit("Philip", "Philip@gmail.com", "Philip@gmail.com");

    expect(await screen.findAllByText("Sending, please wait")).toHaveLength(1);
    await wait();
    expect(successFn).toHaveBeenCalledTimes(2);
  })

  it("should show default error message when request with undefined error", async () => {
    mockSubmit("Philip", "no_res_error@test.com", "no_res_error@test.com");

    expect(await screen.findAllByText("Sending, please wait")).toHaveLength(1);
    await wait();
    expect(successFn).toHaveBeenCalledTimes(2);
    expect(await screen.findAllByText("Something went wrong...")).toHaveLength(1);
  })

  it("should show default error message when request with error message", async () => {
    mockSubmit("Philip", "error@test.com", "error@test.com");

    expect(await screen.findAllByText("Sending, please wait")).toHaveLength(1);
    await wait();
    expect(successFn).toHaveBeenCalledTimes(2);
    expect(await screen.findAllByText("register error")).toHaveLength(1);
  })
});