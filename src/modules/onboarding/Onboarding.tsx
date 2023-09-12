"use client"
import Button from '@/components/Button';
import Card from '@/components/Card';
import * as React from 'react';
import { css } from '../../../styled-system/css';
import { center, flex } from '../../../styled-system/patterns';
import DesktopBackground from "../../../public/images/bg-sidebar-desktop.svg";
import MobileBackground from "../../../public/images/bg-sidebar-mobile.svg";
import Image from "next/image"
import PersonalInfoStep from './components/PersonalInfoStep';
import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';
import { useActor } from '@xstate/react';
import { OnboardingSchema, OnboardingState } from '@/statemachine/onboardingMachine';
import PlanStep from './components/PlanStep';
import AddonsStep from './components/AddonsStep/AddonsStep';
import SummaryStep from './components/SummaryStep/SummaryStep';
import DoneStep from './components/DoneStep/DoneStep';
import { useMediaQuery } from './hooks/useMediaQuery';
import { token } from '../../../styled-system/tokens';
import NavigationBar from './components/NavigationBar/Navigation';

type OnboardingComponents = {
  [K in keyof OnboardingSchema["states"]]: React.ComponentType<any>;
};

const onboardingComponentsMap: OnboardingComponents = {
  personalInfo: PersonalInfoStep,
  plan: PlanStep,
  addOns: AddonsStep,
  summary: SummaryStep,
  done: DoneStep
}


function Onboarding() {
  const isDesktop = useMediaQuery(`(min-width: ${token("breakpoints.lg")})`);

  const { service } = React.useContext(OnboardingMachineReactContext);
  const [state, send] = useActor(service);


  const currentState = state.value;
  const ComponentToRender = onboardingComponentsMap[currentState as OnboardingState];

  return <>
    <div className={containerStyles}>
      {/* Mobile blue background */}
      {isDesktop === false &&
        <div className={mobileNavigationStyles}>
          <Image
            priority
            className={css({ isolation: "isolate", minHeight: "100%", height: "auto%", width: "100%", objectFit: "cover", position: "absolute", inset: "0" })}
            src={MobileBackground}
            alt={"Decorative background image"}
          />

          <div className={center({ isolation: "isolate", position: "absolute", top: "0px", left: "0", right: "0" })}>
            <NavigationBar />
          </div>
        </div>
      }

      <Card css={cardStyles}>
        {/* Desktop blue background */}
        {isDesktop &&
          <div className={desktopNavigationStyles}>
            <Image
              priority
              className={css({ isolation: "isolate", position: "absolute", inset: "0" })}
              src={DesktopBackground}
              alt={"Decorative background image"}
            />
            <div className={flex({ isolation: "isolate", height: "100%" })}>
              <NavigationBar />
            </div>
          </div>
        }

        <main className={mainStyles}>
          <ComponentToRender />
          {state.nextEvents.includes("PREV") &&
            <Button
              variant='outline'
              cssOverride={backButtonStyles}
              onClick={() => send("PREV")}
            >
              Go back
            </Button>}
        </main>
      </Card>
      <div className={mobileWhiteFooterStyles} />
    </div>

  </>;
}

export default Onboarding;

const containerStyles = css({ display: { base: "block", lg: "flex" }, justifyContent: { lg: "center" }, alignItems: { lg: "center" }, height: "100%" });
const mobileNavigationStyles = css({ position: "relative", height: "172px", width: "100%", overflow: "hidden" });
const mainStyles = flex({ position: { lg: "relative" }, flexDir: "column", flexGrow: "1", margin: { lg: "0px 64px 0px 80px" }, height: "100%" });
const cardStyles = css.raw({
  display: { base: "block", lg: "flex" },
  position: { base: "fixed", lg: "static" },
  top: { base: "110px", lg: "revert" },
  right: { base: "16px", lg: "revert" },
  bottom: { base: "100px" },
  overflow: "scroll",
  left: { base: "16px", lg: "revert" },
  maxWidth: { base: "550px", lg: "revert" },
  mx: { base: "auto", lg: "revert" },
  height: { lg: "600px" },
  width: { lg: "900px" },
  isolation: "isolate",
  zIndex: 2
});
const desktopNavigationStyles = css({ position: "relative", borderRadius: "lg", overflow: "hidden", width: "274px", objectFit: "cover", flexShrink: "0" });
const backButtonStyles = css.raw({
  base: { position: "fixed", left: "16px", bottom: "16px" },
  lg: { position: "absolute", left: "-16px", bottom: "0px" }
});
const mobileWhiteFooterStyles = css({
  hideFrom: "lg", bg: "white", padding: "16px", height: "69px", isolation: "isolate", zIndex: 1, position: "fixed", bottom: "0", left: "0", right: "0"
});

