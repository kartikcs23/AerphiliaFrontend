import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopOptions {
  behavior?: 'smooth' | 'instant' | 'auto';
  top?: number;
  left?: number;
}

/**
 * Custom hook that scrolls to the top of the page whenever the route changes
 */
export const useScrollToTop = (options: ScrollToTopOptions = {}) => {
  const { pathname } = useLocation();
  const { behavior = 'smooth', top = 0, left = 0 } = options;

  useEffect(() => {
    // Small delay to ensure page content is loaded
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top,
        left,
        behavior
      });
    }, 50);

    return () => clearTimeout(scrollTimeout);
  }, [pathname, behavior, top, left]);
};

/**
 * Component wrapper for useScrollToTop hook
 * Can be used as a component in the Router for automatic scroll-to-top behavior
 */
interface ScrollToTopProps {
  behavior?: 'smooth' | 'instant' | 'auto';
  top?: number;
  left?: number;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  behavior = 'smooth', 
  top = 0, 
  left = 0 
}) => {
  useScrollToTop({ behavior, top, left });
  return null;
};

export default ScrollToTop;
