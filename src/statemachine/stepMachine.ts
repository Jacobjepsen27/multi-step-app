import { useMachine } from '@xstate/react';
import { InterpreterFrom, MachineConfig, createMachine } from 'xstate';

type PersonalInfo = {
    name: string,
    email: string,
    phoneNumber: string
}
type Plan = "Arcade" | "Advanced" | "Pro"

export type StepMachineContext = {
    personalInfo?: PersonalInfo,
    plan?: Plan,
}

type StepEvents = { type: "NEXT", data: StepMachineContext } | { type: "PREV" }

const enum StepState {
    PersonalInfo = "personalInfo",
    Plan = "plan",
    Done = "done"
}

const stepMachineConfig: MachineConfig<StepMachineContext, any, StepEvents> = {
    initial: StepState.PersonalInfo,
    context: {},
    states: {
        [StepState.PersonalInfo]: {
            on: {
                NEXT: [StepState.Plan]
            }
        },
        [StepState.Plan]: {
            on: {
                PREV: [StepState.PersonalInfo],
                NEXT: [StepState.Done],
            }
        },
        [StepState.Done]: {
            type: "final"
        }
    }
};
export type StepMachineInterpreter = InterpreterFrom<typeof stepMachine>;

const stepMachine = createMachine(stepMachineConfig);
export default stepMachine;

