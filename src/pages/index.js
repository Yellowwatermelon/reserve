import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useReservation } from '../contexts/ReservationContext';

export default function Home() {
  const router = useRouter();
  const { dispatch } = useReservation();

  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const handleStart = () => {
    router.push('/date');
  };

  return (
    <Layout 
      pageTitle="서비스 예약"
      pageSubtitle="원하시는 날짜와 시간을 선택해주세요"
      marketingText="더 나은 서비스를 위해 노력하겠습니다"
      showFooter={true}
      footerText="예약 시작하기"
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-8">
          <div className="mb-8">
            <Image 
              src="/logo.svg" 
              alt="로고"
              width={120} 
              height={40} 
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">
              서비스 예약
            </h1>
            <p className="text-gray-600">
              원하시는 날짜와 시간을 선택해주세요
            </p>
          </div>

          <div className="hidden md:block mt-8">
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-[#007AFF] text-white rounded-lg
                       hover:bg-[#0066CC] transition-colors
                       focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2"
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}