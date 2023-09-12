import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';
import { useActor } from '@xstate/react';
import * as React from 'react';
import PlanForm, { PlanFormValues } from '../PlanForm';
import usePlans, { BillingRecurrency } from '../../hooks/usePlans';
import { Plan } from '@/statemachine/onboardingMachine';

function PlanStep() {
  const { service } = React.useContext(OnboardingMachineReactContext);
  const [state, send] = useActor(service);

  const plans = usePlans();

  const handleSubmit = (data: PlanFormValues) => {
    const newPlan: Plan = {
      chosenPlanId: data.chosenPlanId,
      billingRecurrency: data.billingRecurrency ? BillingRecurrency.YEARLY : BillingRecurrency.MONTHLY
    }
    send({ type: "plan", data: newPlan });
  }

  const planFormValues: PlanFormValues = {
    chosenPlanId: state.context.plan?.chosenPlanId,
    billingRecurrency: state.context.plan?.billingRecurrency === BillingRecurrency.YEARLY ? true : false
  }

  return <PlanForm onSubmit={handleSubmit} plans={plans} defaultValues={planFormValues} />;
}

export default PlanStep;
