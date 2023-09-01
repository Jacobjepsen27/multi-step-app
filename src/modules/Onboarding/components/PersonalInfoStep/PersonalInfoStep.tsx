import * as React from 'react';
import PersonalInfoForm from '../PersonalInfoForm/PersonalInfoForm';
import { StepProps } from '../../stepProps';
import { StepMachineReactContext } from '@/statemachine/StepMachineProvider';
import { useActor } from '@xstate/react';

function PersonalInfoStep(props: StepProps) {
  // Get next function, to transition to next state + existing context to merge in fields
  // pass default value to form
  const { service } = React.useContext(StepMachineReactContext);
  const [state, send] = useActor(service);
  // const [] = useStepMachine();
  const handleSubmit = () => {
    // service.send("NEXT");
  }

  return <PersonalInfoForm onSubmit={handleSubmit} />;
}

export default PersonalInfoStep;
