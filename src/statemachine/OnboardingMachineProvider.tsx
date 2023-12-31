"use client"
import { useInterpret } from "@xstate/react";
import React, { useEffect, useState } from "react";
import onboardingMachine, { OnboardingMachineInterpreter } from "./onboardingMachine";
import { interpret } from "xstate";


type OnboardingContextValue = { service: OnboardingMachineInterpreter };
export const OnboardingMachineReactContext = React.createContext({} as OnboardingContextValue);

const SESSION_STORAGE_KEY = "onboarding-state";

const retrieveSavedState = () => {
    const sessionStorageState = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return sessionStorageState ? JSON.parse(sessionStorageState) : onboardingMachine.initialState;
}

const OnboardingMachineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [service, setService] = useState<OnboardingMachineInterpreter | undefined>(undefined);

    useEffect(() => {
        const service = interpret(onboardingMachine).start(retrieveSavedState());
        setService(service);
    }, [])

    // Persist state changes to allow refresh of page.
    useEffect(() => {
        const subscription = service?.subscribe((state) => {
            sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
        });
        return () => subscription?.unsubscribe();
    }, [service]);

    if (service == null) {
        return null
    }

    return <OnboardingMachineReactContext.Provider value={{ service }}>
        {children}
    </OnboardingMachineReactContext.Provider>
}

export default OnboardingMachineProvider;