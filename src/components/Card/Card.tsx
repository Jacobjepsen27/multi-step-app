import * as React from 'react';
import { css } from '../../../styled-system/css';
import { SystemStyleObject } from '../../../styled-system/types';

type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  css?: SystemStyleObject
};

function Card(props: CardProps) {
  const rootStyles = css(cardBaseStyles, props.css ?? {});
  return <div className={rootStyles}>{props.children}</div>;
}

const cardBaseStyles = css.raw({
  padding: "16px",
  boxShadow: "lg",
  borderRadius: "lg",
  background: "white"
});

export default Card;
