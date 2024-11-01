import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import html2canvas from 'html2canvas';
import Layout from '../components/Layout';
import { useReservation } from '../contexts/ReservationContext';

export default function Complete() {
  const router = useRouter();
  const { state } = useReservation();

  useEffect(() => {
    if (!state.date || !state.time || !state.name || !state.phone) {
      router.replace('/');
    }
  }, []);

  // 서버사이드 렌더링 시 기본값 처리
  if (!state.date) {
    return null;
  }

  const handleCapture = async () => {
    try {
      const element = document.getElementById('capture-area');
      const canvas = await html2canvas(element);
      
      // 이미지로 저장
      const link = document.createElement('a');
      link.download = `예약확인서_${format(new Date(state.date), 'yyyyMMdd')}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('화면 캡처 중 오류가 발생했습니다:', error);
      window.print();
    }
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'yyyy년 M월 d일', { locale: ko });
    } catch (error) {
      console.error('날짜 형식 변환 중 오류:', error);
      return '날짜 정보 없음';
    }
  };

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
          <p>예약 일시: {formatDate(state.date)} {state.time}</p>
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

// getStaticProps 추가
export async function getStaticProps() {
  return {
    props: {}
  };
}