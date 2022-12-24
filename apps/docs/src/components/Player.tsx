import React, { FC, MediaHTMLAttributes } from 'react';

interface PlayerProps extends MediaHTMLAttributes<HTMLVideoElement> {
  src: string;
}

const Player: FC<PlayerProps> = (props) => {
  return <video {...props} style={{ maxWidth: '100%' }} autoPlay={true} controls />;
};

export default Player;
