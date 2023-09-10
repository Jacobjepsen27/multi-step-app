import { AddonsFormValues } from '@/modules/onboarding/components/AddonsForm';
import { PersonalInfoFormValues } from '@/modules/onboarding/components/PersonalInfoForm';
import { PlanFormValues } from '@/modules/onboarding/components/PlanForm';
import { InterpreterFrom, MachineConfig, assign, createMachine } from 'xstate';

export type OnboardingMachineContext = {
    personalInfo?: PersonalInfoFormValues,
    plan?: PlanFormValues,
    addOns?: AddonsFormValues
}

export type OnboardingEvents =
    { type: "PREV" } |
    { type: "personalInfo", data: PersonalInfoFormValues } |
    { type: "plan", data: PlanFormValues } |
    { type: "addOns", data: AddonsFormValues }

export const enum OnboardingState {
    PersonalInfo = "personalInfo",
    Plan = "plan",
    AddOns = "addOns",
    Done = "done"
}

export interface OnboardingSchema {
    states: {
        [OnboardingState.PersonalInfo]: {},
        [OnboardingState.Plan]: {},
        [OnboardingState.AddOns]: {},
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
                    target: [OnboardingState.Done],
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
        done: {
            // type: "final" TODO:,
            on: {
                PREV: [OnboardingState.AddOns]
            }
        }
    },
};
export type OnboardingMachineInterpreter = InterpreterFrom<typeof onboardingMachine>;
const onboardingMachine = createMachine(onboardingMachineConfig);
export default onboardingMachine;

