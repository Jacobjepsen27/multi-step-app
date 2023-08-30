import Button from '@/components/Button';
import Card from '@/components/Card';
import MobileSidebarBg from '@/components/icons/MobileSidebarBg';
import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';

function OnboardingMobile() {
  return (
    <>
      <div>
        <MobileSidebarBg width={"100%"} height={"100%"} />
      </div>
      <Card css={{ position: "fixed", top: "100px", left: "16px", right: "16px", bottom: "100px", overflow: "scroll", maxWidth: "550px", mx: "auto" }}>
        <div className={css({ height: "100px" })}><h1>Hello from step app.</h1></div>
      </Card>
      <div className={css({ position: "fixed", bottom: "0", left: "0", right: "0", bg: "white", padding: "16px" })}>
        <div className={flex({ justifyContent: "space-between", maxW: "550px", mx: "auto" })}>
          <Button>PREV</Button>
          <Button>NEXT</Button>
        </div>
      </div>
    </>
  )
}

export default OnboardingMobile;
