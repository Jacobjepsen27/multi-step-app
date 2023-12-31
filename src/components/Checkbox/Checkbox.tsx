import * as React from 'react';
import { css, cx } from '../../../styled-system/css';
import { visuallyHidden } from '../../../styled-system/patterns';
import Checkmark from '../icons/Checkmark/Checkmark';
import { ForwardedRef } from 'react';

type CheckboxProps = React.ComponentPropsWithoutRef<"input">;

function Checkbox(inputProps: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <label>
      <input ref={ref} type='checkbox' {...inputProps} className={cx(visuallyHidden(), "peer")} />
      <div className={css(checkboxContainer)}>
        <Checkmark />
      </div>
    </label>
  );
}

export default React.forwardRef<HTMLInputElement, CheckboxProps>(Checkbox);

const checkboxContainer = css.raw({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "20px",
  aspectRatio: "1/1",
  border: "1px solid var(--colors-light-gray)",
  borderRadius: "sm",
  "& > svg": {
    transition: "opacity 300ms",
    opacity: 0,
  },
  _peerFocusVisible: {
    outline: "2px solid var(--colors-purple-blue)",
    outlineOffset: "2px"
  },
  _peerHover: {
    borderColor: "purpleBlue",
    cursor: "pointer"
  },
  _peerChecked: {
    backgroundColor: "purpleBlue",
    borderColor: "purpleBlue",
    "& > svg": {
      opacity: 1,
      color: "white"
    }
  },
});
