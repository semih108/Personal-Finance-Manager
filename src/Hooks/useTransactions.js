import { useState, useEffect } from "react";

export default () => {
    const [transactions, setTransactions] = useState(
        localStorage.getItem("transactions")
         ? JSON.parse(localStorage.getItem("transactions"))
         : []
    );

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions])

    return {transactions, setTransactions};
};