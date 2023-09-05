import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';
import Toggle from '@/components/Toggle';

export type PlanFormValues = {

}

type PlanFormProps = {
  onSubmit: (data: PlanFormValues) => void;
  defaultValues?: PlanFormValues
}

function PlanForm(props: PlanFormProps) {
  return <div className={flex({ flexDirection: "column" })}>
    <div>
      <h1 className={css({ fontSize: "28px", color: "marineBlue", fontWeight: "bold", mt: "32px" })}>
        Select your plan
      </h1>
      <p className={css({ fontSize: "14px", color: "coolGray" })}>
        You have the option of monthly or yearly billing.
      </p>
    </div>
    <form>
      <Toggle defaultValue={true} onChange={(val) => console.log("new value: ", val)} />
    </form>
  </div>;
}

export default PlanForm;
