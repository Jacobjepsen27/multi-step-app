import { OnboardingMachineContext } from "@/statemachine/onboardingMachine";
import useAddons from "./useAddons";
import usePlans, { BillingRecurrency } from "./usePlans";
import { useMemo } from "react";

const billingRecurrencyToShortString = (billingRecurrency?: BillingRecurrency): string => {
    switch (billingRecurrency) {
        case BillingRecurrency.MONTHLY:
            return "mo";
        case BillingRecurrency.YEARLY:
            return "yr";
        default:
            return ""
    }
}

const billingRecurrencyToString = (billingRecurrency?: BillingRecurrency): string => {
    switch (billingRecurrency) {
        case BillingRecurrency.MONTHLY:
            return "month";
        case BillingRecurrency.YEARLY:
            return "year";
        default:
            return ""
    }
}

type SummaryAddonViewModel = {
    name: string,
    priceText: string
}
type SummaryViewModel = {
    planTitle: string
    planPrice: string
    addons: SummaryAddonViewModel[],
    totalPriceTitle: string,
    totalPrice: string
}
function useSummaryViewModel(context: OnboardingMachineContext): SummaryViewModel | undefined {
    const plans = usePlans();
    const addons = useAddons();

    const viewModel: SummaryViewModel | undefined = useMemo(() => {
        const billingRecurrency = context.plan?.billingRecurrency;
        const billingRecurrencyShortText = billingRecurrencyToShortString(billingRecurrency);
        const currentPlan = plans.find(p => p.planId === context.plan?.chosenPlanId);
        const currentPlanBillingRecurrency = currentPlan?.billings.find(b => b.type === billingRecurrency)
        const currentAddons = addons.filter(a => {
            return context.addOns?.selectedAddons.includes(a.id)
        });

        let addonsPrice = 0;
        const addonViewModels: SummaryAddonViewModel[] = currentAddons.map(addOn => {
            const addonBilling = addOn.billings.find(b => b.type === billingRecurrency);
            addonsPrice += addonBilling?.price ?? 0;
            return {
                name: addOn.name,
                priceText: `+$${addonBilling?.price}/${billingRecurrencyShortText}`
            }
        });

        const totalPrice = (currentPlanBillingRecurrency?.price ?? 0) + addonsPrice;

        return {
            planTitle: `${currentPlan?.name} (${billingRecurrency})`,
            planPrice: `$${currentPlanBillingRecurrency?.price}/${billingRecurrencyShortText}`,
            addons: addonViewModels,
            totalPriceTitle: `Total (per ${billingRecurrencyToString(billingRecurrency)})`,
            totalPrice: `+${totalPrice}/${billingRecurrencyShortText}`,
        }
    }, [plans, addons, context]);

    return viewModel
}

export default useSummaryViewModel;