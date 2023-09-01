"use client"
import Button from '@/components/Button';
import Card from '@/components/Card';
import * as React from 'react';
import { css } from '../../../styled-system/css';
import { flex, center } from '../../../styled-system/patterns';
import DesktopBackground from "../../../public/images/bg-sidebar-desktop.svg";
import MobileBackground from "../../../public/images/bg-sidebar-mobile.svg";
import Image from "next/image"
import PersonalInfoStep from './components/PersonalInfoStep';
import StepMachineProvider from '@/statemachine/StepMachineProvider';

function Onboarding() {

  // This content should be wrappen in StepProvider to allow child components to get context about statemachine
  return <>
    <StepMachineProvider>
      <div className={containerStyles}>
        {/* Mobile navigation */}
        <div className={mobileNavigationStyles}>
          <Image
            priority
            className={css({ isolation: "isolate", minHeight: "100%", height: "auto%", width: "100%", objectFit: "cover", position: "absolute", inset: "0" })}
            src={MobileBackground}
            alt={"Decorative background image"}
          />
          <div className={center({ isolation: "isolate", position: "absolute", top: "32px", left: "0", right: "0" })}>
            <h1>Mobile progress</h1>
          </div>
        </div>
        <Card css={cardStyles}>
          {/* Desktop navigation */}
          <div className={desktopNavigationStyles}>
            <Image
              priority
              className={css({ isolation: "isolate", position: "absolute", inset: "0" })}
              src={DesktopBackground}
              alt={"Decorative background image"}
            />
            <div className={center({ isolation: "isolate", height: "100%" })}>
              <h1>Desktop progress</h1>
            </div>
          </div>
          <main className={mainStyles}>
            <PersonalInfoStep />
            <Button
              variant='outline'
              cssOverride={backButtonStyles}
            >
              Go back
            </Button>
          </main>
        </Card>
        <div className={mobileWhiteFooterStyles} />
      </div>
    </StepMachineProvider>
  </>;
}

const containerStyles = css({ display: { base: "block", lg: "flex" }, justifyContent: { lg: "center" }, alignItems: { lg: "center" }, height: "100%" });
const mobileNavigationStyles = css({ display: "block", hideFrom: "lg", position: "relative", height: "172px", width: "100%", overflow: "hidden" });
const mainStyles = flex({ position: { lg: "relative" }, flexDir: "column", flexGrow: "1", margin: { lg: "0px 64px 0px 80px" } });
const cardStyles = css.raw({
  display: { base: "block", lg: "flex" },
  position: { base: "fixed", lg: "static" },
  top: { base: "100px", lg: "revert" },
  left: { base: "16px", lg: "revert" },
  right: { base: "16px", lg: "revert" },
  maxWidth: { base: "550px", lg: "revert" },
  mx: { base: "auto", lg: "revert" },
  height: { lg: "600px" },
  width: { lg: "900px" },
  isolation: "isolate",
  zIndex: 2
});
const desktopNavigationStyles = css({ hideBelow: "md", position: "relative", borderRadius: "lg", overflow: "hidden", width: "274px", objectFit: "cover", flexShrink: "0" });
const backButtonStyles = css.raw({
  base: { position: "fixed", left: "16px", bottom: "16px" },
  lg: { position: "absolute", left: "-16px", bottom: "0px" }
});
const mobileWhiteFooterStyles = css({
  hideFrom: "lg", bg: "white", padding: "16px", height: "69px", isolation: "isolate", zIndex: 1, position: "fixed", bottom: "0", left: "0", right: "0"
});
export default Onboarding;
