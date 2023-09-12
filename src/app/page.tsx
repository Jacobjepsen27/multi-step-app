
import Onboarding from "@/modules/onboarding";
import { flex } from "../../styled-system/patterns";
import OnboardingMachineProvider from "@/statemachine/OnboardingMachineProvider";

export default function Home() {
  return (
    <div className={flex({ direction: "column", bg: "magnolia", height: "100%" })}>
      <OnboardingMachineProvider>
        <Onboarding />
      </OnboardingMachineProvider>
    </div >
  )
}
