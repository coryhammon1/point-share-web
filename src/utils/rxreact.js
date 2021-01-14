import { useState, useEffect } from "react";

export function useSubscription(obs) {
    const [next, setNext] = useState(null);

    useEffect(() => {
        const sub = obs.subscribe(n => {
            setNext(n);
        });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return next;
}