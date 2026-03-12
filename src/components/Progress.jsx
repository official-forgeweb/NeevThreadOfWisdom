import React, { useState, useEffect } from 'react';

const Progress = () => {
    const [w, s] = useState(0);
    useEffect(() => {
        const h = () => {
            const t = document.documentElement;
            s((t.scrollTop / (t.scrollHeight - window.innerHeight)) * 100);
        };
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);
    return <div id="progress" style={{ width: `${w}%` }} />
};

export default Progress;
