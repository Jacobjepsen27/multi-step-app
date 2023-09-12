"use client"
import * as React from 'react';
import PersonalInfoForm, { PersonalInfoFormValues } from '../PersonalInfoForm/PersonalInfoForm';
import { StepProps } from '../../stepProps';
import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';
import { useActor } from '@xstate/react';

function PersonalInfoStep(props: StepProps) {
  const { service } = React.useContext(OnboardingMachineReactContext);
  const [state, send] = useActor(service);

  const handleSubmit = (data: PersonalInfoFormValues) => {
    send({ type: "personalInfo", data });
  }

  return <PersonalInfoForm onSubmit={handleSubmit} defaultValues={state.context.personalInfo} />;
}

export default PersonalInfoStep;
