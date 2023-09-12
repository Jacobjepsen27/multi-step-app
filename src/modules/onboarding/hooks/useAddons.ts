import { useEffect, useState } from "react";
import { BillingRecurrency } from "./usePlans";

export type Addon = {
    id: string,
    name: string,
    info: string,
    billings: {
        type: BillingRecurrency,
        price: number,
    }[]
}
const useAddons = () => {
    const [addons, setAddons] = useState<Addon[]>([]);

    // create data
    useEffect(() => {
        setAddons(ADDONS_MOCK_DATA);
    }, []);

    return addons;
}

const ADDONS_MOCK_DATA: Addon[] = [
    {
        id: "1",
        name: "Online service",
        info: "Access to multiplayer games",
        billings: [
            {
                price: 1,
                type: BillingRecurrency.MONTHLY
            },
            {
                price: 10,
                type: BillingRecurrency.YEARLY
            }
        ]
    },
    {
        id: "2",
        name: "Larger storage",
        info: "Extra 1TB of cloud save",
        billings: [
            {
                price: 2,
                type: BillingRecurrency.MONTHLY
            },
            {
                price: 20,
                type: BillingRecurrency.YEARLY
            }
        ]
    },
    {
        id: "3",
        name: "Customizable profile",
        info: "Custom theme on your profile",
        billings: [
            {
                price: 2,
                type: BillingRecurrency.MONTHLY
            },
            {
                price: 20,
                type: BillingRecurrency.YEARLY
            }
        ]
    }
];

export default useAddons;