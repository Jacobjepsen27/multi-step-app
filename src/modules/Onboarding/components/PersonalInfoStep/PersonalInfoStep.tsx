"use client"
import * as React from 'react';
import PersonalInfoForm from '../PersonalInfoForm/PersonalInfoForm';
import { StepProps } from '../../stepProps';
import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';

function PersonalInfoStep(props: StepProps) {


  const { service } = React.useContext(OnboardingMachineReactContext);

  const handleSubmit = () => {
    // TODO: need data
    service.send("NEXT");
  }
  // TODO: pass default value to form
  return <PersonalInfoForm onSubmit={handleSubmit} />;
}

export default PersonalInfoStep;
