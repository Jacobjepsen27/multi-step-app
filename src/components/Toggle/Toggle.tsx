"use client";
import * as React from 'react';
import { css } from '../../../styled-system/css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { visuallyHidden } from '../../../styled-system/patterns';

type ToggleProps = React.ComponentPropsWithoutRef<"input">;

function Toggle({ checked: checkedFromProps, defaultChecked, onChange, ...inputProps }: ToggleProps) {
  const rootStyles = css(toggleButtonStyle);

  const isControlled = checkedFromProps != null;
  const hasDefaultChecked = defaultChecked != null;

  if (isControlled && hasDefaultChecked) {
    throw Error("Toggle component received defaultValue, but is being controlled with value.");
  }

  const [intervalValue, setInternalValue] = useState(hasDefaultChecked ? defaultChecked : false);
  const isChecked = isControlled ? checkedFromProps : intervalValue;

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.checked;

    // If onChange is not null, propagate event to consumer
    if (onChange) {
      onChange(e)
    }

    if (!isControlled) {
      setInternalValue(newValue)
    }
  }

  return <label
    className={rootStyles}
    style={{ justifyContent: isChecked ? "flex-end" : "flex-start" }
    }
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
    <input type="checkbox" className={visuallyHidden()} checked={isChecked} onChange={handleToggle} {...inputProps} />
  </label >;
}

export default Toggle;

const toggleButtonStyle = css.raw({
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
  },
});

const ballStyle = css.raw({
  display: "block",
  borderRadius: "100px",
  height: "100%",
  aspectRatio: "1/1",
  bgColor: "white",
});