import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';
import { useActor } from '@xstate/react';
import * as React from 'react';
import { flex } from '../../../../../styled-system/patterns';
import { css } from '../../../../../styled-system/css';
import { OnboardingSchema } from '@/statemachine/onboardingMachine';
import { textStyle } from '@/styles/commonStyles';
import { token } from '../../../../../styled-system/tokens';
import { CSSProperties } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

type NavigationMap = Omit<Record<keyof OnboardingSchema["states"], {
  title: string,
  step: number
}>, "done">;

const navigationMap: NavigationMap = {
  personalInfo: {
    title: "Your Info",
    step: 1
  },
  plan: {
    title: "Select Plan",
    step: 2
  },
  addOns: {
    title: "Add-Ons",
    step: 3
  },
  summary: {
    title: "Summary",
    step: 4
  }
}

function NavigationBar() {
  const { service } = React.useContext(OnboardingMachineReactContext);
  const [state] = useActor(service);

  const isDesktop = useMediaQuery(`(min-width: ${token("breakpoints.lg")})`);

  return (
    <div className={css(navigationContainerStyles)}>
      {Object.entries(navigationMap).map(([key, value]) => {
        const isCurrentStep = key === state.value;
        const currentStepStyleObj: CSSProperties = isCurrentStep ? { backgroundColor: token("colors.lightGray") } : {}
        return (
          <div
            className={css(navigationItemStyles)}
            key={value.step}
          >
            <div className={css(stepCircleStyles)} style={currentStepStyleObj} >
              <span className={css(textStyle, { color: "white", fontWeight: "bold" })} style={isCurrentStep ? { color: "black" } : {}}>{value.step}</span>
            </div>
            {isDesktop && (
              <div className={css(infoStylesColumn)}>
                <span className={css(textStyle, { fontSize: "12px" })}>STEP {value.step}</span>
                <span className={css(textStyle, { fontWeight: "bold", color: "white" })}>{value.title.toUpperCase()}</span>
              </div>
            )}

          </div>
        )
      })}
    </div>
  );
}

export default NavigationBar;

const navigationContainerStyles = flex.raw({
  padding: "40px",
  flexDirection: {
    base: "row",
    lg: "column",
  },
  gap: "24px",
  justifyContent: {
    base: "center",
    lg: "flex-start"
  },
  alignItems: {
    base: "center",
    lg: "flex-start"
  }
});

const navigationItemStyles = flex.raw({
  flexDirection: "row",
  alignItems: { lg: "center" },
  gap: "16px"
});

const stepCircleStyles = css.raw({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "32px",
  aspectRatio: "1/1",
  borderRadius: "full",
  border: "1px solid var(--colors-light-gray)",
  transition: "background-color 350ms"
});

const infoStylesColumn = flex.raw({
  flexDirection: "column"
});
