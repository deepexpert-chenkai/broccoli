import React from 'react';
import { cn } from '@bem-react/classname';

interface ISuccessProps {
  onClose: ()=>void,
}

const scs = cn('success');

export default function Success(props: ISuccessProps) {
  const { onClose } = props; 
  return (
    <div className={scs()}>
      <div className={scs('title')}>
        All Done!
      </div>
      <div className={scs('desc')}>
        You will be one of the first to experience Broccoli & Co. when we launch.
      </div>
      <button className={scs('btn')} onClick={onClose}>OK</button>
    </div>
  );
}
