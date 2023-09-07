import { headerStyle, textStyle } from '@/styles/commonStyles';
import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { vstack } from '../../../../../styled-system/patterns';
import Button from '@/components/Button';

export type AddonsFormValues = {
  selectedAddons: string[]
}

type AddonsFormProps = {
  onSubmit: (data: AddonsFormValues) => void;
  defaultValues?: AddonsFormValues;
}

function AddonsForm(props: AddonsFormProps) {

  return <>
    <div className={css({ paddingBottom: "16px" })}>
      <div>
        <h1 className={css(headerStyle)}>
          Pick add-ons
        </h1>
        <p className={css(textStyle)}>
          Add-ons help enhance your gaming experience.
        </p>
      </div>
      <form id="addonsForm" className={vstack({ gap: "24px", marginTop: "32px", alignItems: "stretch" })}>

      </form>
    </div>
    <Button form='personalInfo' variant='primary' cssOverride={css.raw({
      base: { position: "fixed", right: "16px", bottom: "16px" },
      lg: { position: "absolute", right: "0px", bottom: "0px" }
    })}>
      Next Step
    </Button>
  </>;
}

export default AddonsForm;
