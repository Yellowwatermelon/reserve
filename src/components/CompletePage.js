import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import html2canvas from 'html2canvas';
import Layout from './Layout';
import { useReservation } from '../contexts/ReservationContext';

export default function CompletePage() {
  const router = useRouter();
  const { state } = useReservation();

  useEffect(() => {
    if (!state.date || !state.time || !state.name || !state.phone) {
      router.replace('/');
    }
  }, []);

  const handleCapture = async () => {
    try {
      const element = document.getElementById('capture-area');
      if (!element) return;
      
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = `예약확인서_${format(new Date(), 'yyyyMMdd')}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('화면 캡처 중 오류가 발생했습니다:', error);
      window.print();
    }
  };

  if (!state.date || !state.time) {
    return (
      <Layout 
        pageTitle="예약 완료"
        pageSubtitle="예약이 성공적으로 완료되었습니다"
        showFooter={false}
      >
        <div className="text-center">잘못된 접근입니다.</div>
      </Layout>
    );
  }

  return (
    <Layout 
      pageTitle="예약 완료"
      pageSubtitle="예약이 성공적으로 완료되었습니다"
      showFooter={false}
    >
      <div className="text-center space-y-8">
        <div id="capture-area" className="bg-gray-50 p-6 rounded-lg space-y-4">
          <p className="text-sm text-gray-500">
            예약 완료 시간: {new Date().toLocaleString('ko-KR')}
          </p>
          <p>
            예약 일시: {format(new Date(state.date), 'yyyy년 M월 d일', { locale: ko })} {state.time}
          </p>
          <p>성명: {state.name}</p>
          <p>연락처: {state.phone}</p>
        </div>

        <button
          onClick={handleCapture}
          className="w-full bg-[#007AFF] text-white py-4 rounded-lg font-medium
                   hover:bg-[#0066CC] transition-colors"
        >
          예약확인서 저장하기
        </button>

        <button
          onClick={() => router.push('/')}
          className="w-full bg-gray-100 text-gray-800 py-4 rounded-lg font-medium
                   hover:bg-gray-200 transition-colors"
        >
          처음으로 돌아가기
        </button>
      </div>
    </Layout>
  );
}