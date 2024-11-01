import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ReservationProvider } from '../contexts/ReservationContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <ReservationProvider>
      <Component {...pageProps} />
    </ReservationProvider>
  );
}

export default MyApp;