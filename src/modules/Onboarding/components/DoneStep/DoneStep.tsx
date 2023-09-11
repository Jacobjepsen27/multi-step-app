import * as React from 'react';
import { center, flex, vstack } from '../../../../../styled-system/patterns';
import { css } from '../../../../../styled-system/css';
import { headerStyle, textStyle } from '@/styles/commonStyles';
import ThankYou from '@/components/icons/ThankYou';

function DoneStep() {
  return <div className={center({ height: "100%" })}>
    <div className={vstack({ gap: "24px" })}>
      <ThankYou />
      <h1 className={css(headerStyle, { mt: "0" })}>Thank you!</h1>
      <p className={css(textStyle)}>
        Thanks for confirming your subscription! We hope you have fun using our platdform. If you ever need support, please feel free to email us at support@loregmaing.com
      </p>
    </div>
  </div>;
}

export default DoneStep;