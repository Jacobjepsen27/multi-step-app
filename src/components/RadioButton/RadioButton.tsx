import * as React from 'react';
import { Ref } from 'react';
import { css, cx } from '../../../styled-system/css';
import { visuallyHidden } from '../../../styled-system/patterns';
import { headerStyle, textStyle } from '@/styles/commonStyles';

type RadioButtonProps = React.ComponentPropsWithoutRef<"input"> & {
  icon: (props: Omit<React.SVGProps<SVGSVGElement>, "ref">) => React.ReactNode
  label: string,
  priceText: string,
  info?: string,
}
function RadioButton({ label, priceText, info, icon, ...inputProps }: RadioButtonProps, ref: Ref<HTMLInputElement>) {
  const Icon = icon;
  return (
    <label className={css(radioButtonContainer)}>
      <input ref={ref} className={cx(visuallyHidden(), "peer")} type="radio" {...inputProps} />
      <div className={css(radioCardStyles)}>
        <Icon />
        <div className={css(infoStyles)}>
          <span className={css(headerStyle, { fontSize: "16px", mt: "0" })}>{label}</span>
          <span className={css(textStyle)}>{priceText}</span>
          {info && <span className={css(headerStyle, { fontSize: "12px", mt: "0", fontWeight: "400" })}>{info}</span>}
        </div>
      </div>
    </label>
  )
}

export default React.forwardRef<HTMLInputElement, RadioButtonProps>(RadioButton);

const radioButtonContainer = css.raw({ width: "100%" });

const radioCardStyles = css.raw({
  display: "flex",
  flexDirection: { base: "row", lg: "column" },
  justifyContent: { base: "", lg: "space-between" },
  alignItems: "flex-start",
  padding: "16px",
  border: "1px solid var(--colors-light-gray)",
  gap: { base: "16px", lg: "32px" },
  borderRadius: "lg",
  _peerFocus: {
    outline: "2px solid var(--colors-marine-blue)"
  },
  _peerHover: {
    borderColor: "marineBlue",
    cursor: "pointer"
  },
  _peerChecked: {
    backgroundColor: "magnolia"
  }
})

const infoStyles = css.raw({
  display: "flex",
  flexDirection: "column",
})