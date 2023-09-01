"use client"
import Button from '@/components/Button';
import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { vstack } from '../../../../../styled-system/patterns';
import TextInput from '@/components/TextInput/TextInput';

export type PersonalInfoFormValues = {
  name: string,
  email: string,
  phoneNumber: string
}

type PersonalInfoFormProps = {
  onSubmit: () => void;
}

function PersonalInfoForm(props: PersonalInfoFormProps) {
  return <>
    <div className={css({ paddingBottom: "16px" })}>
      <div>
        <h1 className={css({ fontSize: "28px", color: "marineBlue", fontWeight: "bold", mt: "32px" })}>
          Personal info
        </h1>
        <p className={css({ fontSize: "14px", color: "coolGray" })}>
          Please provide your name, email address, and phone number.
        </p>
      </div>
      <form id="personalInfo" onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }} className={vstack({ gap: "24px", marginTop: "32px", alignItems: "stretch" })}>
        <TextInput label='Name' placeholder='e.g. Stephen King' />
        <TextInput label='Email Address' placeholder='e.g. stephenking@lorem.com' />
        <TextInput label='Phone Number' placeholder='e.g. +1 234 567' />
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

export default PersonalInfoForm;
