import './Loading.scss';

import React from 'react';

interface LoadingProps {
    size: string,
    rippleWidth: string,
    speed: string,
}

function Loading(props: LoadingProps): JSX.Element {
  const {size, rippleWidth, speed} = props;
  return (
    <div
      className="loading"
      style={{
        width: size,
        height: size,
      }}
    >
      <div style={{
        borderWidth: rippleWidth,
        animationDuration: speed,
      }}
      />
      <div style={{
        borderWidth: rippleWidth,
        animationDuration: speed,
        animationDelay: '-0.5s',
      }}
      />
    </div>
  );
}

export default Loading;
