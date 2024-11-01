import { useRouter } from 'next/router';
import { useReservation } from '../contexts/ReservationContext';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function Layout({ 
  children, 
  marketingText, 
  showFooter = true,
  footerText = "다음 단계",
  pageTitle = "",
  pageSubtitle = ""
}) {
  const { state } = useReservation();
  const router = useRouter();

  if (state.loading) return <LoadingSpinner />;
  if (state.error) return <ErrorMessage error={state.error} />;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 히어로 섹션 */}
      <div className="bg-[#007AFF] text-white">
        <div className="container mx-auto px-4 py-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-white/90">{pageSubtitle}</p>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-md">
        {children}
        
        {marketingText && (
          <div className="text-center my-8 text-gray-600 animate-fade-in">
            {marketingText}
          </div>
        )}
      </main>

      {/* 하단 고정 버튼 (모바일) */}
      {showFooter && (
        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-top md:hidden">
          <button 
            onClick={() => router.push(router.pathname === '/' ? '/date' : router.pathname)}
            className="w-full bg-[#007AFF] text-white py-4 rounded-lg font-medium
                     transition-all hover:bg-[#0066CC] active:bg-[#005AB5]
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {footerText}
          </button>
        </footer>
      )}
    </div>
  );
}