import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';

// Configure NProgress
NProgress.configure({
    showSpinner: false,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    speed: 800,
    minimum: 0.08,
    trickleSpeed: 200,
});

const LoadingProgress: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        // Start progress bar on location change
        NProgress.start();

        // Finish progress bar after a short delay (simulating page load)
        const timer = setTimeout(() => {
            NProgress.done();
        }, 300);

        return () => {
            clearTimeout(timer);
            NProgress.done();
        };
    }, [location.pathname]);

    return null; // This component doesn't render anything itself
};

export default LoadingProgress;
