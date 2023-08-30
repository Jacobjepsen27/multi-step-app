import Button from '@/components/Button';
import Card from '@/components/Card';
import * as React from 'react';
import { css } from '../../../styled-system/css';
import { flex, center } from '../../../styled-system/patterns';
import DesktopBackground from "../../../public/images/bg-sidebar-desktop.svg";
import MobileBackground from "../../../public/images/bg-sidebar-mobile.svg";
import Image from "next/image"

function Onboarding() {

  // This content should be wrappen in StepProvider to allow child components to get context about statemachine
  return <>
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
      <Card css={{ position: "fixed", top: "100px", left: "16px", right: "16px", bottom: "100px", overflow: "scroll", maxWidth: "550px", mx: "auto" }}>
        <main className={center({ height: "100px" })}>
          <h1>Mobile content</h1>
        </main>
        <div className={css({ position: "fixed", bottom: "0", left: "0", right: "0", bg: "white", padding: "16px" })}>
          <div className={flex({ justifyContent: "space-between", maxW: "550px", mx: "auto" })}>
            <Button>PREV</Button>
            <Button>NEXT</Button>
          </div>
        </div>
      </Card>
    </div>

    {/* Desktop  */}
    <div className={center({ display: "flex", hideBelow: "md", height: "100%" })}>
      <Card css={{ display: "flex", width: "900px", height: "600px" }}>
        <div className={css({ position: "relative", borderRadius: "lg", overflow: "hidden", width: "274px", objectFit: "cover" })}>
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
        <main className={center({ flexGrow: "1" })}>
          <h1>Desktop content</h1>
        </main>
      </Card>
    </div>
  </>;
}

export default Onboarding;
