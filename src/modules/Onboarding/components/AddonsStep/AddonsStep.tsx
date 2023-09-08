import * as React from 'react';
import { OnboardingMachineReactContext } from '@/statemachine/OnboardingMachineProvider';
import { useActor } from '@xstate/react';
import AddonsForm, { AddonsFormValues } from '../AddonsForm/AddonsForm';
import useAddons from '../../hooks/useAddons';

function AddonsStep() {
  const { service } = React.useContext(OnboardingMachineReactContext);
  const [state, send] = useActor(service);

  const handleSubmit = (data: AddonsFormValues) => {
    console.log("submitted: ", data);
  }

  const addons = useAddons();

  // return <PersonalInfoForm onSubmit={handleSubmit} defaultValues={state.context.personalInfo} />;
  return <AddonsForm onSubmit={handleSubmit} addOns={addons} />
}

export default AddonsStep;
