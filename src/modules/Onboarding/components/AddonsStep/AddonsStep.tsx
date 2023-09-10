import * as React from 'react';
import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';
import { useActor } from '@xstate/react';
import AddonsForm, { AddonsFormValues } from '../AddonsForm/AddonsForm';
import useAddons from '../../hooks/useAddons';

function AddonsStep() {
  const { service } = React.useContext(OnboardingMachineReactContext);
  const [state, send] = useActor(service);

  const handleSubmit = (data: AddonsFormValues) => {
    send({ type: "addOns", data });
  }

  const addons = useAddons();

  return <AddonsForm onSubmit={handleSubmit} addOns={addons} defaultValues={state.context.addOns} />
}

export default AddonsStep;
