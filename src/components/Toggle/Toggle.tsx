"use client";
import * as React from 'react';
import { css, cx } from '../../../styled-system/css';
import { Ref } from 'react';
import { motion } from 'framer-motion';
import { visuallyHidden } from '../../../styled-system/patterns';

type ToggleProps = React.ComponentPropsWithoutRef<"input">;

function Toggle({ ...inputProps }: ToggleProps, ref: Ref<HTMLInputElement>) {
  const rootStyles = css(toggleButtonStyle);

  return <>
    <input
      id="toggleId"
      ref={ref}
      type="checkbox"
      className={cx(visuallyHidden(), "peer")}
      {...inputProps}
    />
    <label
      htmlFor="toggleId"
      className={rootStyles}
    >
      <motion.span
        className={css(ballStyle)}
        layout={true}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 40,
        }}
      />
    </label>
  </>
}

export default React.forwardRef<HTMLInputElement, ToggleProps>(Toggle);

const toggleButtonStyle = css.raw({
  display: "flex",
  height: "20px",
  width: "38px",
  borderRadius: "2xl",
  bgColor: "marineBlue",
  cursor: "pointer",
  padding: "4px",
  outlineOffset: "2px",
  _peerChecked: {
    justifyContent: "flex-end"
  },
  _peerFocusWithin: {
    outline: "2px solid var(--colors-marine-blue)"
  }
});

const ballStyle = css.raw({
  display: "block",
  borderRadius: "100px",
  height: "100%",
  aspectRatio: "1/1",
  bgColor: "white",
});