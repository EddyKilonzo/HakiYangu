'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 40,
      delay: 0,
      disable: false, // Ensure it's enabled on all devices
    });
  }, []);

  // On route change or scroll, refresh AOS to find new elements
  useEffect(() => {
    const handleRefresh = () => AOS.refreshHard();
    const id = setTimeout(handleRefresh, 100);
    
    window.addEventListener('scroll', handleRefresh, { passive: true });
    return () => {
      clearTimeout(id);
      window.removeEventListener('scroll', handleRefresh);
    };
  }, [pathname]);

  return null;
}
