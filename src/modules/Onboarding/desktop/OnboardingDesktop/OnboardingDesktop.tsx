import Card from '@/components/Card/Card';
import * as React from 'react';
import { center } from '../../../../../styled-system/patterns';
import DesktopSidebarBg from '@/components/icons/DesktopSidebarBg';
import { css } from '../../../../../styled-system/css';

function OnboardingDesktop() {
  return <div className={center({ height: "100%" })}>
    <Card css={{ display: "flex", width: "900px", height: "600px" }}>
      <div className={css({ borderRadius: "lg", overflow: "hidden" })}>
        <DesktopSidebarBg height={"100%"} />
      </div>
      <main className={center({ flexGrow: "1" })}>
        <h1>Content goes here</h1>
      </main>
    </Card>
  </div>;
}

export default OnboardingDesktop;
