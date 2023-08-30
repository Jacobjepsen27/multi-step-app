import OnboardingDesktop from "@/modules/Onboarding/desktop/OnboardingDesktop";
import { css } from "../../styled-system/css";
import { flex } from "../../styled-system/patterns";
import OnboardingMobile from "@/modules/Onboarding/mobile/OnboardingMobile/OnboardingMobile";


export default function Home() {
  return (
    <div className={flex({ direction: "column", bg: "magnolia", height: "100%" })}>
      <div className={css({ display: "block", hideFrom: "lg", height: "100%" })}>
        <OnboardingMobile />
      </div>
      <div className={css({ display: "block", hideBelow: "md", height: "100%" })}>
        <OnboardingDesktop />
      </div>
    </div >
  )
}
