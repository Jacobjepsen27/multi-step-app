import { useInterpret } from "@xstate/react";
import React from "react";
import stepMachine, { StepMachineInterpreter } from "./stepMachine";


type StepContextValue = { service: StepMachineInterpreter };

export const StepMachineReactContext = React.createContext({} as StepContextValue);

const StepMachineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const service = useInterpret(stepMachine);

    return <StepMachineReactContext.Provider value={{ service }}>
        {children}
    </StepMachineReactContext.Provider>
}

export default StepMachineProvider;