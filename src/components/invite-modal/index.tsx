import React, { useState } from 'react';
import Modal from '../modal';
import Form from './form';
import Success from './success';

import './index.scss'


enum Step {
  INVITE, // fill invite form
  SUCCESS, // submit success
}

interface IInviteModalProps {
  show: boolean,
  onClose: ()=>void,
}


export default function InviteModal(props: IInviteModalProps) {
  const { show, onClose } = props;
  const [step, setStep] = useState(Step.INVITE);

  const handleSuccess = () => {
    setStep(Step.SUCCESS);
  }

  const handleCloseModal = () => {
    setStep(Step.INVITE);
    onClose();
  }

  return (
    <Modal show={show} onClose={handleCloseModal}>
      {
        step === Step.INVITE && <Form onSuccess={handleSuccess} />
      }
      {
        step === Step.SUCCESS && <Success onClose={handleCloseModal} />
      }
    </Modal>
  );
}
