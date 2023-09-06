import { useEffect, useState } from "react"

export enum PlanBillingRecurrency {
    MONTHLY = "monthly",
    YEARLY = "yearly"
}

export type Plan = {
    planId: string,
    name: string,
    billings: {
        type: PlanBillingRecurrency,
        price: number,
        info?: string
    }[]
}

// This hook could fx. be used to fetch Plans from a backend
const usePlans = () => {
    const [plans, setPlans] = useState<Plan[]>([]);

    // create data
    useEffect(() => {
        setPlans(PLANS_MOCK_DATA);
    }, []);

    return plans;
}

const PLANS_MOCK_DATA: Plan[] = [
    {
        planId: "1",
        name: "Arcade",
        billings: [
            {
                type: PlanBillingRecurrency.MONTHLY,
                price: 9
            },
            {
                type: PlanBillingRecurrency.YEARLY,
                price: 90,
                info: "2 months free"
            }
        ]
    },
    {
        planId: "2",
        name: "Advanced",
        billings: [
            {
                type: PlanBillingRecurrency.MONTHLY,
                price: 12
            },
            {
                type: PlanBillingRecurrency.YEARLY,
                price: 120,
                info: "2 months free"
            }
        ]
    },
    {
        planId: "3",
        name: "Pro",
        billings: [
            {
                type: PlanBillingRecurrency.MONTHLY,
                price: 15
            },
            {
                type: PlanBillingRecurrency.YEARLY,
                price: 150,
                info: "2 months free"
            }
        ]
    },
]

export default usePlans;