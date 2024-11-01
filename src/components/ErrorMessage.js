export default function ErrorMessage({ error }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white p-4 z-50">
        <div className="bg-red-50 p-6 rounded-lg max-w-md w-full">
          <h3 className="text-red-800 font-medium mb-2">오류가 발생했습니다</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-lg 
                     hover:bg-red-200 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }