export const config = {
  // 예약 가능한 최대 일수
  MAX_RESERVATION_DAYS: 10,
  
  // 영업 시간
  BUSINESS_HOURS: {
    start: 10, // 오전 10시
    end: 16,   // 오후 4시
    breakStart: 12, // 점심시간 시작
    breakEnd: 14,   // 점심시간 종료
  },
  
  // 예약 가능한 시간대
  TIME_SLOTS: [
    { id: 1, label: "오전 10시", value: "10:00" },
    { id: 2, label: "오전 11시", value: "11:00" },
    { id: 3, label: "오후 2시", value: "14:00" },
    { id: 4, label: "오후 3시", value: "15:00" },
    { id: 5, label: "오후 4시", value: "16:00" }
  ],
  
  // API 엔드포인트
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
  
  // 유효성 검사 규칙
  VALIDATION: {
    name: {
      minLength: 3,
      pattern: /^[가-힣]{3,}$/,
      message: '한글 3자 이상 입력해주세요'
    },
    phone: {
      pattern: /^01[0-9]{9}$/,
      message: '올바른 전화번호 형식이 아닙니다'
    }
  }
};