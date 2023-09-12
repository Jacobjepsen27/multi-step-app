import Button from '@/components/Button';
import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';
import { useActor } from '@xstate/react';
import { headerStyle, textStyle } from '@/styles/commonStyles';
import { flex } from '../../../../../styled-system/patterns';
import { MouseEventHandler } from 'react';

import useSummaryViewModel from '../../hooks/useSummaryViewModel';

function SummaryStep() {
  const { service } = React.useContext(OnboardingMachineReactContext);
  const [state, send] = useActor(service);
  const viewModel = useSummaryViewModel(state.context);

  const handleChangePlanClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    send({ type: "changePlan" });
  }

  return <div className={css(containerStyles)}>
    <div>
      <div>
        <h1 className={css(headerStyle)}>
          Finishing up
        </h1>
        <p className={css(textStyle)}>
          Double-check everything looks OK before confirming.
        </p>
      </div>
    </div>
    <div className={css(grayContainerStyles)}>
      <div className={css(rowStyles)}>
        <div>
          <p className={css(headerStyle, { fontSize: "16px", mt: "0" })}>{viewModel?.planTitle}</p>
          <a onClick={handleChangePlanClick} className={css(textStyle, { textDecoration: "underline", cursor: "pointer" })} >Change</a>
        </div>
        <p className={css(headerStyle, { fontSize: "16px", mt: "0" })}>{viewModel?.planPrice}</p>
      </div>
      {viewModel?.addons && viewModel.addons.length > 0 && (
        <hr className={css({ color: "lightGray" })} />
      )}

      {viewModel?.addons.map(a => {
        return <div key={a.name} className={css(rowStyles)}>
          <p className={css(textStyle)}>{a.name}</p>
          <p className={css(textStyle, { color: "marineBlue" })}>{a.priceText}</p>
        </div>
      })}

    </div>
    <div className={css(totalPriceContainer)}>
      <p className={css(textStyle)}>{viewModel?.totalPriceTitle}</p>
      <p className={css(headerStyle, { mt: "0", color: "purpleBlue" })}>{viewModel?.totalPrice}</p>
    </div>
    <Button onClick={() => send({ type: "summary" })} type="button" variant='primary' cssOverride={buttonStyles}>
      Confirm
    </Button>
  </div>;
}

export default SummaryStep;

const containerStyles = flex.raw({
  flexDirection: "column",
  gap: "24px"
})

const grayContainerStyles = flex.raw({
  flexDirection: "column",
  gap: "16px",
  backgroundColor: "magnolia",
  borderRadius: "lg",
  padding: "16px 20px",
});

const rowStyles = flex.raw({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
});

const totalPriceContainer = flex.raw({
  marginStart: "16px",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
});

const buttonStyles = css.raw({
  backgroundColor: "purpleBlue",
  base: { position: "fixed", right: "16px", bottom: "16px" },
  lg: { position: "absolute", right: "0px", bottom: "0px" }
});
