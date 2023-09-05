import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';
import { useActor } from '@xstate/react';
import * as React from 'react';
import PlanForm, { PlanFormValues } from '../PlanForm';

function PlanStep() {
  const { service } = React.useContext(OnboardingMachineReactContext);
  const [state, send] = useActor(service);

  const handleSubmit = (data: PlanFormValues) => {
    // TODO: send({ type: "", data });
  }

  return <PlanForm onSubmit={handleSubmit} />;
}

export default PlanStep;
