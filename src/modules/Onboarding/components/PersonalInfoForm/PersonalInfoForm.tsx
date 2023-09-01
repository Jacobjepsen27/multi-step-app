"use client"
import Button from '@/components/Button';
import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { flex, vstack } from '../../../../../styled-system/patterns';
import TextInput from '@/components/TextInput/TextInput';

function PersonalInfoForm() {
  return <>
    <div className={css({ flexGrow: "1", paddingBottom: "16px" })}>
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
        console.log(e);
      }} className={vstack({ gap: "24px", marginTop: "32px", alignItems: "stretch" })}>
        <TextInput label='Name' placeholder='e.g. Stephen King' />
        <TextInput label='Email Address' placeholder='e.g. stephenking@lorem.com' />
        <TextInput label='Phone Number' placeholder='e.g. +1 234 567' />
      </form>
    </div>
    <div className={flex({ justifyContent: "space-between" })}>
      {/* Should be a global prev button */}
      <Button variant='outline'>Go back</Button>
      <Button form='personalInfo' variant='primary'>Next Step</Button>
    </div>
  </>;
}

export default PersonalInfoForm;
