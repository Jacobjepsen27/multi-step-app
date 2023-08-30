import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { css } from '../../../styled-system/css';

type ButtonProps = ComponentPropsWithoutRef<"button">;
function Button(props: ButtonProps) {
  return <button className={baseButtonStyles} {...props} />;
}

const baseButtonStyles = css({
  padding: "8px 8px",
  border: "1px solid"
});

export default Button;
