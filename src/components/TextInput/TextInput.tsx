import * as React from 'react';
import { flex } from '../../../styled-system/patterns';
import { ComponentPropsWithoutRef } from 'react';
import { css } from '../../../styled-system/css';

type TextInputProps = Omit<ComponentPropsWithoutRef<"input"> & {
  label: string
}, 'type'>;

function TextInput(props: TextInputProps) {
  const { label, ...inputProps } = props;

  return (
    <div className={flex({ flexDirection: "column", gap: "4px" })}>
      <div className={flex({ flexDirection: "row" })}>
        <label className={labelStyles}>{label}</label>
      </div>
      <input className={textInputStyles} type="text" {...inputProps} />
    </div>
  );
}

const labelStyles = css({ fontSize: "14px", color: "marineBlue" });
const textInputStyles = css({
  padding: "10px",
  borderRadius: "md",
  fontSize: "14px",
  fontWeight: "bold",
  color: "marineBlue",
  border: "1px solid var(--colors-light-gray)",
  _focus: {
    outlineColor: "purpleBlue"
  },
  _placeholder: {
    fontWeight: "400",
  }
});

export default TextInput;
