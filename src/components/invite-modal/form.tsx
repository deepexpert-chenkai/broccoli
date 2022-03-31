import React, { useState } from 'react';
import axios from 'axios';
import { cn } from '@bem-react/classname';
import { useForm } from 'react-hook-form';

import { validateEmail } from '../../utills'

interface IFormProps {
  onSuccess: () => void;
}

const form = cn('form');

export default function Form(props: IFormProps) {
  const { onSuccess } = props;
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

  // submit form
  const onSubmit = (data) => {
    setApiError('')
    setIsLoading(true)
    
    axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', data)
    .then(() => {
      onSuccess();
    }).catch(error => {
      setApiError(error?.response?.data?.errorMessage || 'Something went wrong...')
    }).finally(() => {
      setIsLoading(false);
    })
  };

  return (
    <div className={form()}>
      <div className={form('title')} >
        Request an invite
      </div>
      <form className={form('content')} onSubmit={handleSubmit(onSubmit)}>
        
        <input 
          role="name"
          placeholder="User Name"
          { ...register('name', { required: true }) } 
        />
        { errors.name && <p role="alert">User name is required.</p> }

        <input 
          role="email"
          className={form('email')}
          placeholder="Email"
          { ...register('email', { required: true, validate: value => validateEmail(value) }) }
        />
        {errors.email && <p role="alert" >{ errors.email.type === 'required' ? 'Email is required.' : 'Invalid Email.'}</p>}

        <input
          role="confirmEmail"
          className={form('confirm')}
          placeholder="Confirm Email"
          {...register('confirmEmail', { required: true, validate: value => value === getValues('email') })}  
        />
        {errors.confirmEmail 
          && <p role="alert">{ errors.confirmEmail.type === 'required' ? 'Confirm email is required.' : 'Confirm email should be same as Email.'}</p>}

        <button className={form('btn', { sending: isLoading })} type="submit">
          {isLoading ? 'Sending, please wait' : 'Submit'}
        </button>
        
        {!isLoading && apiError && <p>{apiError}</p>}
      </form>
    </div>
  );
}
