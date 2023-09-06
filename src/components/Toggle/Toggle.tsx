"use client";
import * as React from 'react';
import { css, cx } from '../../../styled-system/css';
import { Ref } from 'react';
import { motion } from 'framer-motion';
import { visuallyHidden } from '../../../styled-system/patterns';

type ToggleProps = React.ComponentPropsWithoutRef<"input">;

function Toggle(props: ToggleProps, ref: Ref<HTMLInputElement>) {

  return <>
    <label
      htmlFor="toggleId"
      className={css(labelStyles)}
    >
      <input
        id="toggleId"
        ref={ref}
        type="checkbox"
        className={cx(visuallyHidden(), "peer")}
        {...props}
      />
      <span
        className={css(ballStyle)}
      />
    </label>
  </>
}

export default React.forwardRef<HTMLInputElement, ToggleProps>(Toggle);

const labelStyles = css.raw({
  display: "flex",
  height: "20px",
  width: "38px",
  borderRadius: "2xl",
  bgColor: "marineBlue",
  cursor: "pointer",
  padding: "4px",
  outlineOffset: "2px",
  _focusWithin: {
    outline: "2px solid var(--colors-marine-blue)"
  }
});

const ballStyle = css.raw({
  display: "block",
  borderRadius: "100px",
  height: "100%",
  aspectRatio: "1/1",
  bgColor: "white",
  transition: "transform 200ms",
  _peerChecked: {
    transform: "translateX(150%)"
  },
});