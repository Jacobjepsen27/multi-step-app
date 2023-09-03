import { PersonalInfoFormValues } from '@/modules/onboarding/components/PersonalInfoForm';
import { InterpreterFrom, MachineConfig, createMachine } from 'xstate';

type Plan = "Arcade" | "Advanced" | "Pro"

export type OnboardingMachineContext = {
    personalInfo?: PersonalInfoFormValues,
    plan?: Plan,
}

export type OnboardingEvents = { type: "NEXT", data: OnboardingMachineContext } | { type: "PREV" }

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
                NEXT: {
                    target: [OnboardingState.Plan],
                },
            },
        },
        plan: {
            on: {
                PREV: [OnboardingState.PersonalInfo],
                NEXT: [OnboardingState.Done],
            }
        },
        done: {
            type: "final"
        }
    }
};
export type OnboardingMachineInterpreter = InterpreterFrom<typeof onboardingMachine>;
const onboardingMachine = createMachine(onboardingMachineConfig);
export default onboardingMachine;

