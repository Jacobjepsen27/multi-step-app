"use client"
import Button from '@/components/Button';
import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { flex, vstack } from '../../../../../styled-system/patterns';

function PersonalInfo() {
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
        <input type="text" className={css({ border: "1px solid" })} placeholder='Name' />
        <input type="text" className={css({ border: "1px solid" })} placeholder='Email Address' />
        <input type="text" className={css({ border: "1px solid" })} placeholder='Phone Number' />
      </form>
    </div>
    <div className={flex({ justifyContent: "space-between" })}>
      {/* Should be a global prev button */}
      <Button variant='outline'>Go back</Button>
      <Button form='personalInfo' variant='primary'>Next Step</Button>
    </div>
  </>;
}

export default PersonalInfo;
