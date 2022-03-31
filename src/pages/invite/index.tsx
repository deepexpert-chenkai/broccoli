import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import InviteModal from '../../components/invite-modal';

const invite = cn('invite');

export default function Invite() {
  const [isShowModal, setIsShowModal] = useState(false);
  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };
  return (
    <div className={invite()}>
      <header className={invite('header')}>
        <div className={invite('headerwrap')}>BROCCOLI & CO.</div>
      </header>
      <div className={invite('container')}>
        <div className={invite('content')}>
          <h1 className={invite('title')}>A better way <br /> to enjoy every day.</h1>
          <p className={invite('desc')}>Be the first to know when we launch.</p>
          <button className={invite('btn')} type="button" onClick={toggleModal}>
            Request a invite
          </button>
        </div>
      </div>
      <footer className={invite('footer')}>
        Made with ❤️ in Melbourne.
        <br />
        &copy Broccoli & Co. All rights reserved
      </footer>
      <InviteModal show={isShowModal} onClose={toggleModal} />
    </div>
  );
}
