import React, { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';

import './index.scss';

const modal = cn('modal');

interface IModalProps {
  show: boolean,
  onClose: ()=>void
}

export default function Invite(props:React.PropsWithChildren<IModalProps>) {
  const { show, onClose, children } = props;

  return (
    <div className={modal({ show })}>
      <div className={modal('mask')} onClick={onClose} />
      <div className={modal('content')}>
        {children}
      </div>
    </div>
  );
}
