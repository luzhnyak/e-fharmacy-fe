import { FC } from 'react';
import sprite from '../img/sprite.svg';

type Props = {
  name: string;
  width?: number;
  height?: number;
};

const Icon: FC<Props> = ({ name, width = 18, height = 18 }) => (
  <svg width={width} height={height}>
    <use xlinkHref={`${sprite}#${name}`} />
  </svg>
);

export default Icon;
