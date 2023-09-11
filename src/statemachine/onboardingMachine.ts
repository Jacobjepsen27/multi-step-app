import { AddonsFormValues } from '@/modules/onboarding/components/AddonsForm';
import { PersonalInfoFormValues } from '@/modules/onboarding/components/PersonalInfoForm';
import { BillingRecurrency } from '@/modules/onboarding/hooks/usePlans';
import { InterpreterFrom, MachineConfig, assign, createMachine } from 'xstate';

export type Plan = {
    chosenPlanId?: string,
    billingRecurrency: BillingRecurrency
}

export type OnboardingMachineContext = {
    personalInfo?: PersonalInfoFormValues,
    plan?: Plan,
    addOns?: AddonsFormValues
}

export type OnboardingEvents =
    { type: "PREV" } |
    { type: "personalInfo", data: PersonalInfoFormValues } |
    { type: "plan", data: Plan } |
    { type: "addOns", data: AddonsFormValues } |
    { type: "summary" } |
    { type: "changePlan" }

export const enum OnboardingState {
    PersonalInfo = "personalInfo",
    Plan = "plan",
    AddOns = "addOns",
    Summary = "summary",
    Done = "done"
}

export interface OnboardingSchema {
    states: {
        [OnboardingState.PersonalInfo]: {},
        [OnboardingState.Plan]: {},
        [OnboardingState.AddOns]: {},
        [OnboardingState.Summary]: {},
        [OnboardingState.Done]: {},
    }
}

const onboardingMachineConfig: MachineConfig<OnboardingMachineContext, OnboardingSchema, OnboardingEvents> = {
    initial: OnboardingState.PersonalInfo,
    context: {},
    states: {
        personalInfo: {
            on: {
                personalInfo: {
                    target: [OnboardingState.Plan],
                    actions: assign((context, event) => {
                        return {
                            ...context,
                            personalInfo: event.data
                        }
                    })
                }
            },
        },
        plan: {
            on: {
                PREV: [OnboardingState.PersonalInfo],
                plan: {
                    target: [OnboardingState.AddOns],
                    actions: assign((context, event) => {
                        return {
                            ...context,
                            plan: event.data
                        }
                    })
                }
            }
        },
        addOns: {
            on: {
                PREV: {
                    target: [OnboardingState.Plan]
                },
                addOns: {
                    target: [OnboardingState.Summary],
                    actions: assign((context, event) => {
                        const newContext: OnboardingMachineContext = {
                            ...context,
                            addOns: event.data,
                        }
                        return newContext;
                    })
                }
            }
        },
        summary: {
            on: {
                PREV: {
                    target: [OnboardingState.AddOns]
                },
                summary: {
                    target: [OnboardingState.Done]
                },
                changePlan: {
                    target: [OnboardingState.Plan]
                }
            }
        },
        done: {
            // type: "final",
            on: {
                PREV: [OnboardingState.AddOns]
            }
        }
    },
};
export type OnboardingMachineInterpreter = InterpreterFrom<typeof onboardingMachine>;
const onboardingMachine = createMachine(onboardingMachineConfig);
export default onboardingMachine;

