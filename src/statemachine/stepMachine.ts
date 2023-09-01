import { PersonalInfoFormValues } from '@/modules/onboarding/components/PersonalInfoForm';
import { InterpreterFrom, MachineConfig, createMachine } from 'xstate';

type Plan = "Arcade" | "Advanced" | "Pro"

export type StepMachineContext = {
    personalInfo?: PersonalInfoFormValues,
    plan?: Plan,
}

export type StepEvents = { type: "NEXT", data: StepMachineContext } | { type: "PREV" }

interface StepSchema {
    states: {
        [StepState.PersonalInfo]: {},
        [StepState.Plan]: {},
        [StepState.Done]: {},
    }
}

const enum StepState {
    PersonalInfo = "personalInfo",
    Plan = "plan",
    Done = "done"
}

const stepMachineConfig: MachineConfig<StepMachineContext, StepSchema, StepEvents> = {
    initial: StepState.PersonalInfo,
    context: {},
    states: {
        personalInfo: {
            on: {
                NEXT: {
                    target: [StepState.Plan],
                },
            },
        },
        plan: {
            on: {
                PREV: [StepState.PersonalInfo],
                NEXT: [StepState.Done],
            }
        },
        done: {
            type: "final"
        }
    }
};
export type StepMachineInterpreter = InterpreterFrom<typeof stepMachine>;
const stepMachine = createMachine(stepMachineConfig);
export default stepMachine;

