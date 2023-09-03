import { PersonalInfoFormValues } from '@/modules/onboarding/components/PersonalInfoForm';
import { InterpreterFrom, MachineConfig, assign, createMachine } from 'xstate';

type Plan = "Arcade" | "Advanced" | "Pro"

export type OnboardingMachineContext = {
    personalInfo?: PersonalInfoFormValues,
    plan?: Plan,
}

export type OnboardingEvents = { type: "PREV" } | { type: "personalInfo", data: PersonalInfoFormValues }

export const enum OnboardingState {
    PersonalInfo = "personalInfo",
    Plan = "plan",
    Done = "done"
}

export interface OnboardingSchema {
    states: {
        [OnboardingState.PersonalInfo]: {},
        [OnboardingState.Plan]: {},
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
            }
        },
        done: {
            type: "final"
        }
    },
};
export type OnboardingMachineInterpreter = InterpreterFrom<typeof onboardingMachine>;
const onboardingMachine = createMachine(onboardingMachineConfig);
export default onboardingMachine;

