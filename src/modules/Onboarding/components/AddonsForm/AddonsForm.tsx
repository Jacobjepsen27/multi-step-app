import { headerStyle, textStyle } from '@/styles/commonStyles';
import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { flex, vstack } from '../../../../../styled-system/patterns';
import Button from '@/components/Button';
import AddonCheckbox from '../AddonCheckbox';
import { Addon } from '../../hooks/useAddons';
import { useForm } from 'react-hook-form';

export type AddonsFormValues = {
  selectedAddons: string[],
  // billingRecurrency: boolean; // false -> monthly, true -> yearly
}

type AddonsFormProps = {
  onSubmit: (data: AddonsFormValues) => void;
  defaultValues?: AddonsFormValues;
  addOns: Addon[];
}

function AddonsForm(props: AddonsFormProps) {
  const { register, handleSubmit } = useForm<AddonsFormValues>({
    defaultValues: {
      selectedAddons: ["2"]
    }
  })

  const formValidationOk = (data: AddonsFormValues) => {
    console.log("submit: ", data)
  }

  return <>
    <div className={css({ paddingBottom: "16px" })}>
      <div>
        <h1 id="addons-group-label" className={css(headerStyle)}>
          Pick add-ons
        </h1>
        <p className={css(textStyle)}>
          Add-ons help enhance your gaming experience.
        </p>
      </div>
      <form id="addonsForm" onSubmit={handleSubmit(formValidationOk)} className={css({ mt: "24px" })}>
        <div role="group" aria-labelledby="addons-group-label">
          <ul className={flex({ flexDir: "column", gap: "16px" })}>
            {props.addOns.map(addOn => (
              <li key={addOn.id}>
                <AddonCheckbox {...register("selectedAddons")} value={addOn.id} title={addOn.name} />
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
    <Button form='addonsForm' variant='primary' cssOverride={css.raw({
      base: { position: "fixed", right: "16px", bottom: "16px" },
      lg: { position: "absolute", right: "0px", bottom: "0px" }
    })}>
      Next Step
    </Button>
  </>;
}

export default AddonsForm;
