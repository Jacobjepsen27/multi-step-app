import * as React from 'react';
import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';
import { useActor } from '@xstate/react';
import AddonsForm, { AddonsFormValues } from '../AddonsForm/AddonsForm';
import useAddons from '../../hooks/useAddons';

function AddonsStep() {
  const { service } = React.useContext(OnboardingMachineReactContext);
  const [state, send] = useActor(service);

  const handleSubmit = (data: AddonsFormValues) => {
    console.log("data", data);
    send({ type: "addOns", data });
  }

  const addons = useAddons();

  const billingRecurrency = state.context.plan?.billingRecurrency;
  if (billingRecurrency == null) {
    send({ type: "PREV" });
    return null;
  }

  return <AddonsForm
    onSubmit={handleSubmit}
    addOns={addons}
    defaultValues={state.context.addOns}
    billingRecurrency={billingRecurrency}
  />
}

export default AddonsStep;
