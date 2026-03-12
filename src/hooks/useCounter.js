import { useState, useEffect } from 'react';

export function useCounter(t, d = 2e3, go = true) {
    const [c, s] = useState(0);
    useEffect(() => {
        if (!go) return;
        let v = 0;
        const i = t / (d / 16);
        const tm = setInterval(() => {
            v += i;
            if (v >= t) { s(t); clearInterval(tm) }
            else s(Math.ceil(v))
        }, 16);
        return () => clearInterval(tm)
    }, [t, d, go]);
    return c;
}
