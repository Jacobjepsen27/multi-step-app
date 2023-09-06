import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';
import { useActor } from '@xstate/react';
import * as React from 'react';
import PlanForm, { PlanFormValues } from '../PlanForm';
import usePlans from '../../hooks/usePlans';

function PlanStep() {
  const { service } = React.useContext(OnboardingMachineReactContext);
  const [state, send] = useActor(service);

  const plans = usePlans();

  const handleSubmit = (data: PlanFormValues) => {
    send({ type: "plan", data });
  }

  return <PlanForm onSubmit={handleSubmit} plans={plans} defaultValues={state.context.plan} />;
}

export default PlanStep;
