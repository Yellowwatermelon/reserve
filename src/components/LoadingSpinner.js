export default function LoadingSpinner() {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative flex flex-col items-center">
          {/* 세련된 원형 스피너 */}
          <div className="relative">
            <div className="w-16 h-16">
              <div className="absolute w-16 h-16 border-4 border-[#007AFF]/20 rounded-full"></div>
              <div className="absolute w-16 h-16 border-4 border-transparent border-t-[#007AFF] rounded-full animate-spin"></div>
            </div>
          </div>
          {/* 로딩 텍스트 */}
          <div className="mt-4">
            <p className="text-[#007AFF] text-sm font-medium">처리중...</p>
          </div>
        </div>
      </div>
    );
  }