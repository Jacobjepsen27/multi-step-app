import * as React from 'react';
import { css } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';
import Toggle from '@/components/Toggle';
import { BillingRecurrency, Plan } from '../../hooks/usePlans';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { headerStyle, textStyle } from '@/styles/commonStyles';
import Button from '@/components/Button';
import RadioButton from '@/components/RadioButton/RadioButton';
import Arcade from '@/components/icons/Arcade/Arcade';
import Pro from '@/components/icons/Pro/Pro';
import Advanced from '@/components/icons/Advanced/Advanced';

type PlanViewModel = {
  icon: (props: Omit<React.SVGProps<SVGSVGElement>, "ref">) => React.JSX.Element,
  planId: string,
  name: string,
  price: number,
  info?: string
}

export type PlanFormValues = {
  chosenPlanId?: string,
  billingRecurrency: boolean
}

type PlanFormProps = {
  onSubmit: (data: PlanFormValues) => void;
  defaultValues?: PlanFormValues,
  plans: Plan[]
}

const planIconMap = {
  "1": Arcade,
  "2": Advanced,
  "3": Pro
} as const;

function PlanForm({ onSubmit, defaultValues, plans }: PlanFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PlanFormValues>(
    {
      defaultValues
    }
  );

  const registerBillingRecurrencyProps = register("billingRecurrency");
  const registerPlanProps = register("chosenPlanId", { required: "Plan selection required." });

  const [planViewModels, setPlanViewModels] = useState<PlanViewModel[]>([]);

  // Calculate VM's if billingRecurrency changes
  const currentBillingCurrencyToggleValue = watch("billingRecurrency");
  useEffect(() => {
    if (currentBillingCurrencyToggleValue != null) {
      const currentPlanBilling: BillingRecurrency = currentBillingCurrencyToggleValue ? BillingRecurrency.YEARLY : BillingRecurrency.MONTHLY;
      const newPlanViewModels: PlanViewModel[] = plans.map(plan => {
        const selectedBillingRecurrency = plan.billings.find(p => p.type === currentPlanBilling)
        return {
          icon: planIconMap[plan.planId as "1" | "2" | "3"], // This is not scalable
          planId: plan.planId,
          name: plan.name,
          price: selectedBillingRecurrency!.price,
          info: selectedBillingRecurrency?.info
        }
      });
      setPlanViewModels(newPlanViewModels);
    }
  }, [currentBillingCurrencyToggleValue, plans]);

  const formValidationOk = (data: PlanFormValues) => {
    onSubmit(data);
  }

  return <div className={flex({ flexDirection: "column" })}>
    <form id="planForm" onSubmit={handleSubmit(formValidationOk)} className={css(formStyles)}>
      <div>
        <h1 className={css(headerStyle)}>
          Select your plan
        </h1>
        <p className={css(textStyle)}>
          You have the option of monthly or yearly billing.
        </p>
      </div>
      <div className={css(grayContainerStyles)}>
        <p className={css(textStyle)} style={{ color: !currentBillingCurrencyToggleValue ? "var(--colors-marine-blue)" : "" }}>Monthly</p>
        <Toggle {...registerBillingRecurrencyProps} />
        <p className={css(textStyle)} style={{ color: currentBillingCurrencyToggleValue ? "var(--colors-marine-blue)" : "" }}>Yearly</p>
      </div>
      <div className={css(radioButtonStyles)}>
        {planViewModels.map(vm => (<RadioButton key={vm.planId} value={vm.planId} label={vm.name} priceText={`$${vm.price}/${currentBillingCurrencyToggleValue ? "yr" : "mo"}`} info={vm.info} icon={vm.icon} {...registerPlanProps} />))}
      </div>
      {errors.chosenPlanId?.message && <span className={css({ color: "red", fontSize: "14px" })}>{errors.chosenPlanId?.message}</span>}

    </form>
    <Button form='planForm' variant='primary' cssOverride={css.raw({
      base: { position: "fixed", right: "16px", bottom: "16px" },
      lg: { position: "absolute", right: "0px", bottom: "0px" }
    })}>
      Next Step
    </Button>
  </div>;
}

export default PlanForm;

const grayContainerStyles = css.raw({ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", width: "100%", bgColor: "magnolia", padding: "8px", borderRadius: "lg" })
const formStyles = flex.raw({ flexDirection: "column", gap: "24px" });
const radioButtonStyles = flex.raw({ flexDirection: { base: "column", lg: "row" }, gap: "16px" })
