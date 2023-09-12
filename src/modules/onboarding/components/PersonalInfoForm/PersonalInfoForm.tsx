"use client"
import Button from '@/components/Button';
import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { vstack } from '../../../../../styled-system/patterns';
import TextInput from '@/components/TextInput/TextInput';
import { useForm } from 'react-hook-form';
import { headerStyle, textStyle } from '@/styles/commonStyles';

export type PersonalInfoFormValues = {
  name: string,
  email: string,
  phoneNumber: string
}

type PersonalInfoFormProps = {
  onSubmit: (data: PersonalInfoFormValues) => void;
  defaultValues?: PersonalInfoFormValues
}

function PersonalInfoForm(props: PersonalInfoFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormValues>();

  const registerNameProps = register("name", {
    required: "This field is required.",
    pattern: {
      value: /^(?!\s).+(?<!\s)$/,
      "message": "Only letters allowed"
    },
  });

  const registerEmailProps = register("email", {
    required: "This field is required.",
  });

  const registerPhoneProps = register("phoneNumber", {
    required: "This field is required.",
  });

  const formValidationOk = (data: PersonalInfoFormValues) => {
    props.onSubmit(data);
  }

  return <>
    <div className={css({ paddingBottom: "16px" })}>
      <div>
        <h1 className={css(headerStyle)}>
          Personal info
        </h1>
        <p className={css(textStyle)}>
          Please provide your name, email address, and phone number.
        </p>
      </div>
      <form id="personalInfo" onSubmit={handleSubmit(formValidationOk)} className={vstack({ gap: "24px", marginTop: "32px", alignItems: "stretch" })}>
        <TextInput defaultValue={props.defaultValues?.name} {...registerNameProps} errorMessage={errors.name?.message} label='Name' placeholder='e.g. Stephen King' />
        <TextInput defaultValue={props.defaultValues?.email} {...registerEmailProps} errorMessage={errors.email?.message} label='Email Address' placeholder='e.g. stephenking@lorem.com' />
        <TextInput defaultValue={props.defaultValues?.phoneNumber} {...registerPhoneProps} errorMessage={errors.phoneNumber?.message} label='Phone Number' placeholder='e.g. +1 234 567' />
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
