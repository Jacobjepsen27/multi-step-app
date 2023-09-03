"use client"
import { useInterpret } from "@xstate/react";
import React from "react";
import onboardingMachine, { OnboardingMachineInterpreter } from "./onboardingMachine";


type OnboardingContextValue = { service: OnboardingMachineInterpreter };

export const OnboardingMachineReactContext = React.createContext({} as OnboardingContextValue);

const OnboardingMachineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const service = useInterpret(onboardingMachine);

    return <OnboardingMachineReactContext.Provider value={{ service }}>
        {children}
    </OnboardingMachineReactContext.Provider>
}

export default OnboardingMachineProvider;