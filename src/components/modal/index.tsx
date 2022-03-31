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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
      setTimeout(() => { setVisible(show)} )
  }, [show])

  return (
    <div className={modal({ show: show || visible })}>
      <div className={modal('mask', { visibile: visible && show })} onClick={onClose} />
      <div className={modal('content')}>
        {children}
      </div>
    </div>
  );
}
