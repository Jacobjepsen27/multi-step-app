import * as React from 'react';
import { token } from '../../../../../styled-system/tokens';
import { css } from '../../../../../styled-system/css';
import Checkbox from '@/components/Checkbox';
import { flex } from '../../../../../styled-system/patterns';
import { textStyle } from '@/styles/commonStyles';


// Check: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox/ for accessibility concerns
// TODO: pass viewmodels to this badboy
// TODO: Style content of row better
type AddonRowProps = {
  name: string
}
const AddonRow = ({ name }: AddonRowProps) => {
  // Some js is required because it is not yet possible to style a parent (label in this component) based on a child state (Checkbox input checked).
  const [selected, setSelected] = React.useState(false);

  const styleObj: React.CSSProperties = selected ? {
    borderColor: token("colors.purpleBlue"),
    background: token("colors.magnolia")
  } : {}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.checked);
  }

  return <label className={css(containerStyles)} style={styleObj}>
    <Checkbox onChange={handleChange} />
    <div>
      <p>{name}</p>
      <p className={css(textStyle)}>bla bla bla</p>
    </div>
    <div>$12/yr</div>
  </label>
}

const containerStyles = flex.raw({
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  border: "1px solid var(--colors-light-gray)",
  borderRadius: "lg",
  _focusWithin: {
    outline: "2px solid var(--colors-purple-blue)"
  },
  _hover: {
    borderColor: "purpleBlue",
    cursor: "pointer"
  },
})
export default AddonRow;
