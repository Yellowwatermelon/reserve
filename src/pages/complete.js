import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

// 클라이언트 사이드에서만 렌더링되는 컴포넌트
const CompletePage = dynamic(() => import('../components/CompletePage'), {
  ssr: false,
  loading: () => (
    <Layout 
      pageTitle="예약 완료"
      pageSubtitle="예약이 성공적으로 완료되었습니다"
      showFooter={false}
    >
      <div className="text-center">로딩중...</div>
    </Layout>
  )
});

export default function Complete() {
  return <CompletePage />;
}