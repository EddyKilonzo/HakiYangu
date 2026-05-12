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
      offset: 60,
      delay: 0,
    });
  }, []);

  // On route change, wait one tick for new DOM to paint then re-init all elements
  useEffect(() => {
    const id = setTimeout(() => AOS.refreshHard(), 60);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
