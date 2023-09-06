import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';
import Toggle from '@/components/Toggle';
import { Plan } from '../../hooks/usePlans';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { headerStyle, textStyle } from '@/styles/commonStyles';
import Button from '@/components/Button';

type PlanViewModel = {
  planId: string,
  name: string,
  price: number,
  info?: string
}

export type PlanFormValues = {
  chosenPlanId?: string,
  billingRecurency: boolean
}

type PlanFormProps = {
  onSubmit: (data: PlanFormValues) => void;
  defaultValues?: PlanFormValues,
  plans: Plan[]
}

function PlanForm({ onSubmit, defaultValues, plans }: PlanFormProps) {
  const { register, handleSubmit, watch } = useForm<PlanFormValues>(
    {
      defaultValues: {
        chosenPlanId: defaultValues?.chosenPlanId,
        billingRecurency: defaultValues?.billingRecurency
      }
    }
  );

  const [planViewModels, setPlanViewModels] = useState<PlanViewModel[]>([]);

  // Calculate VM's if billingRecurrency changes
  const currentBillingCurrencyToggleValue = watch("billingRecurency");
  useEffect(() => {
    if (currentBillingCurrencyToggleValue != null) {
      const currentBillingCurrentType = currentBillingCurrencyToggleValue ? "yearly" : "monthly";
      const newPlanViewModels: PlanViewModel[] = plans.map(plan => {
        const selectedBillingRecurrency = plan.billings.find(p => p.type === currentBillingCurrentType)
        return {
          planId: plan.planId,
          name: plan.name,
          price: selectedBillingRecurrency!.price,
          info: selectedBillingRecurrency?.info
        }
      });
      setPlanViewModels(newPlanViewModels);
    }
  }, [currentBillingCurrencyToggleValue, plans]);

  const registerBillingRecurrencyProps = register("billingRecurency");

  const formValidationOk = (data: PlanFormValues) => {
    onSubmit(data);
  }

  return <div className={flex({ flexDirection: "column" })}>
    <div>
      <h1 className={css(headerStyle)}>
        Select your plan
      </h1>
      <p className={css(textStyle)}>
        You have the option of monthly or yearly billing.
      </p>
    </div>
    <form id="planForm" onSubmit={handleSubmit(formValidationOk)}>
      <div>
        {planViewModels.map(vm => <span key={vm.planId}>{vm.name} + {vm.price}</span>)}
      </div>
      <div className={grayContainerStyles}>
        <p className={css(textStyle)}>Monthly</p>
        <Toggle {...registerBillingRecurrencyProps} />
        <p className={css(textStyle)}>Yearly</p>
      </div>
    </form>
    <Button form='planForm' variant='primary' cssOverride={css.raw({
      base: { position: "fixed", right: "16px", bottom: "16px" },
      lg: { position: "absolute", right: "0px", bottom: "0px" }
    })}>
      Next Step
    </Button>
  </div>;
}

const grayContainerStyles = css({ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", width: "100%", bgColor: "magnolia", padding: "8px", borderRadius: "lg" })
export default PlanForm;
