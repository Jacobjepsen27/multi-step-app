import { useEffect, useState } from "react"

export enum BillingRecurrency {
    MONTHLY = "monthly",
    YEARLY = "yearly"
}

export type Plan = {
    planId: string,
    name: string,
    billings: {
        type: BillingRecurrency,
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
                type: BillingRecurrency.MONTHLY,
                price: 9
            },
            {
                type: BillingRecurrency.YEARLY,
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
                type: BillingRecurrency.MONTHLY,
                price: 12
            },
            {
                type: BillingRecurrency.YEARLY,
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
                type: BillingRecurrency.MONTHLY,
                price: 15
            },
            {
                type: BillingRecurrency.YEARLY,
                price: 150,
                info: "2 months free"
            }
        ]
    },
]

export default usePlans;