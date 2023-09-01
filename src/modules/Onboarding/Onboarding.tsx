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
      {/* Mobile  */}
      <div className={css({ display: "block", hideFrom: "lg", height: "100%" })}>
        <div className={css({ position: "relative", height: "172px", width: "100%", overflow: "hidden" })}>
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
        <Card css={{ position: "fixed", top: "100px", left: "16px", right: "16px", overflow: "scroll", maxWidth: "550px", mx: "auto" }}>
          <main className={center({ height: "100px" })}>
            <h1>Mobile content</h1>
            <div className={mobileFixedButtonsStyle}>
              <div className={flex({ justifyContent: "space-between", maxW: "550px", mx: "auto" })}>
                <Button variant='outline'>Go back</Button>
                <Button variant='primary'>Next Step</Button>
              </div>
            </div>
          </main>
        </Card>
      </div>

      {/* Desktop  */}
      <div className={center({ display: "flex", hideBelow: "md", height: "100%" })}>
        <Card css={{ display: "flex", width: "900px", height: "600px" }}>
          <div className={css({ position: "relative", borderRadius: "lg", overflow: "hidden", width: "274px", objectFit: "cover", flexShrink: "0" })}>
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
          <main className={desktopMainStyles}>
            <PersonalInfoStep />
            {/* <div className={css({ flexGrow: "1", paddingBottom: "16px" })}>
            Main content
          </div>
          <div className={flex({ justifyContent: "space-between" })}>
            <Button variant='outline'>Go back</Button>
            <Button variant='primary' onClick={() => console.log("tester")}>Next Step</Button>
          </div> */}
          </main>
        </Card>
      </div>
    </StepMachineProvider>
  </>;
}
const mobileFixedButtonsStyle = css({ position: "fixed", bottom: "0", left: "0", right: "0", bg: "white", padding: "16px" });

const desktopMainStyles = flex({ flexDir: "column", flexGrow: "1", padding: "0px 64px 0px 80px" });

export default Onboarding;
