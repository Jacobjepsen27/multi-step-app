"use client";
import * as React from 'react';
import { css } from '../../../styled-system/css';
import { useState } from 'react';

type ToggleProps = {
  value?: boolean,
  defaultValue?: boolean,
  onChange?: (value: boolean) => void;
};

function Toggle({ value: valueFromProps, defaultValue, onChange }: ToggleProps) {
  const rootStyles = css(toggleButtonStyle);

  const isControlled = valueFromProps != null;
  const hasDefaultValue = defaultValue != null;

  if (isControlled && hasDefaultValue) {
    throw Error("Toggle component received defaultValue, but is being controlled with value.");
  }

  const [intervalValue, setInternalValue] = useState(hasDefaultValue ? defaultValue : false);
  const value = isControlled ? valueFromProps : intervalValue;

  const handleToggle = () => {
    const newValue = !value;
    if (onChange) {
      onChange(newValue)
    }

    if (!isControlled) {
      setInternalValue(newValue)
    }
  }

  return <button
    type="button"
    role="switch"
    aria-checked={value}
    className={rootStyles}
    onClick={handleToggle}
    style={{ justifyContent: value ? "flex-end" : "flex-start" }}
  >
    <span className={css(ballStyle)} />
  </button>;
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
  outlineOffset: "2px"
});

const ballStyle = css.raw({
  display: "block",
  borderRadius: "100px",
  height: "100%",
  aspectRatio: "1/1",
  bgColor: "white",
});