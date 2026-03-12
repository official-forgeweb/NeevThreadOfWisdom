import { useState, useEffect, useRef } from 'react';

export function useReveal(th = 0.15) {
    const r = useRef(null);
    const [v, s] = useState(false);
    useEffect(() => {
        const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { s(true); o.unobserve(e.target) } }, { threshold: th });
        if (r.current) o.observe(r.current);
        return () => o.disconnect()
    }, [th]);
    return [r, v];
}
