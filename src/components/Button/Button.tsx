"use client"
import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { RecipeVariantProps, css, cva } from '../../../styled-system/css';
import { SystemStyleObject } from '../../../styled-system/types';

const buttonStyle = cva({
  base: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "500",
    borderRadius: "lg",
    cursor: "pointer",
    transition: "background-color 150ms",
    outlineOffset: "2px"
  },
  variants: {
    variant: {
      primary: {
        color: "white",
        bg: "marineBlue",
        _active: { bg: "marineBlueActive" },
      },
      outline: {
        color: "coolGray",
        bg: "transparent",
        _active: { bg: "lightGray" },
      }
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export type ButtonVariants = RecipeVariantProps<typeof buttonStyle>

type ButtonProps = ComponentPropsWithoutRef<"button"> & ButtonVariants & {
  cssOverride?: SystemStyleObject
};
function Button({ variant = "primary", cssOverride, ...buttonProps }: ButtonProps) {
  const rootStyles = css(buttonStyle.raw({ variant }), cssOverride ?? {});
  return <button className={rootStyles} {...buttonProps} />;
}

export default Button;
