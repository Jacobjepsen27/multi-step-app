import { useInterpret } from "@xstate/react";
import React, { useContext } from "react";
import stepMachine, { StepMachineContext, StepMachineInterpreter } from "./stepMachine";

const StepMachineContext = React.createContext<StepMachineInterpreter | undefined>(undefined);

const StepMachineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const stepService = useInterpret(stepMachine);
    return <StepMachineContext.Provider value={stepService}>
        {children}
    </StepMachineContext.Provider>
}

export const useStepMachineContext = () => {
    const stepService = useContext(StepMachineContext);

    const next = (data: StepMachineContext) => {
        // transition to next state
    }

    const prev = () => {
        // transition to prev state
    }
    return [stepService];
}

export default StepMachineProvider;