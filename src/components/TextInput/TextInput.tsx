import * as React from 'react';
import { flex } from '../../../styled-system/patterns';
import { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import { css } from '../../../styled-system/css';

type TextInputProps = Omit<ComponentPropsWithoutRef<"input"> & {
  label: string,
  errorMessage?: string
}, 'type'>;

function TextInput(props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const { label, errorMessage, ...inputProps } = props;

  const errorStyles = { borderColor: "red", outlineColor: "red" };
  return (
    <div className={flex({ flexDirection: "column", gap: "4px" })}>
      <div className={flex({ flexDirection: "row", justifyContent: "space-between" })}>
        <label className={labelStyles}>{label}</label>
        <span className={errorLabelStyles}>{errorMessage}</span>
      </div>
      <input style={errorMessage ? errorStyles : {}} data-attr="hello" className={textInputStyles} type="text" {...inputProps} ref={ref} />
    </div>
  );
}

const labelStyles = css({ fontSize: "14px", color: "marineBlue" });
const errorLabelStyles = css({ fontSize: "14px", color: "red", fontWeight: "500" });
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

export default React.forwardRef<HTMLInputElement, TextInputProps>(TextInput);
