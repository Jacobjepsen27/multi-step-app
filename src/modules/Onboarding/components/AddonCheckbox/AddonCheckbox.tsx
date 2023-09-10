import * as React from 'react';
import { token } from '../../../../../styled-system/tokens';
import { css } from '../../../../../styled-system/css';
import Checkbox from '@/components/Checkbox';
import { flex } from '../../../../../styled-system/patterns';
import { headerStyle, textStyle } from '@/styles/commonStyles';
import { Ref } from 'react';

type AddonCheckboxProps = React.ComponentPropsWithoutRef<"input"> & {
  title: string,
}
const AddonCheckbox = ({ title, onChange, ...inputProps }: AddonCheckboxProps, ref: Ref<HTMLInputElement>) => {
  // Some js is required because it is not yet widely supported to style a parent (label in this component) 
  // based on a child state (Checkbox input checked).
  const [selected, setSelected] = React.useState(false);

  const styleObj: React.CSSProperties = selected ? {
    borderColor: token("colors.purpleBlue"),
    backgroundColor: token("colors.magnolia")
  } : {}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.checked);
    if (onChange) {
      onChange(e);
    }
  }

  return <label className={css(containerStyles)} style={styleObj}>
    <div className={css(checkboxAndInfoStyles)}>
      <Checkbox onChange={handleChange} {...inputProps} ref={ref} />
      <div>
        <p className={css(headerStyle, { fontSize: "16px", mt: "0" })}>{title}</p>
        <p className={css(textStyle)}>this is secondary text</p>
      </div>
    </div>
    <div>
      <p className={css(priceTextStyles)}>+$2/?</p>
    </div>
  </label>
}

export default React.forwardRef<HTMLInputElement, AddonCheckboxProps>(AddonCheckbox);


const containerStyles = flex.raw({
  justifyContent: "space-between",
  alignItems: "center",
  padding: { base: "8px 16px", lg: "16px 24px" },
  border: "1px solid var(--colors-light-gray)",
  borderRadius: "lg",
  transition: "background-color 200ms",
  _hover: {
    borderColor: "purpleBlue",
    cursor: "pointer"
  },
});

const checkboxAndInfoStyles = flex.raw({
  gap: { base: "16px", lg: "24px" },
  alignItems: "center"
});

const priceTextStyles = css.raw(textStyle, { color: "purpleBlue", fontSize: { base: "12px", lg: "14px" } });