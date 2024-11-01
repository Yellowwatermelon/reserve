import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import { format, isWeekend } from 'date-fns';
import { ko } from 'date-fns/locale';
import Layout from '../components/Layout';
import { useReservation } from '../contexts/ReservationContext';
import { config } from '../config';

export default function DateSelect() {
  const router = useRouter();
  const { state, dispatch } = useReservation();
  const timeSlots = config.TIME_SLOTS;

  const isValidDate = (date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + config.MAX_RESERVATION_DAYS);
    maxDate.setHours(23, 59, 59, 999);
    
    return date >= now && date <= maxDate && !isWeekend(date);
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (!isValidDate(date)) {
        return 'text-red-300 cursor-not-allowed bg-red-50';
      }
    }
    return null;
  };

  const handleDateSelect = (date) => {
    if (isValidDate(date)) {
      dispatch({ type: 'SET_DATE_TIME', date, time: null });
    }
  };

  const handleTimeSelect = (time) => {
    dispatch({ type: 'SET_DATE_TIME', date: state.date, time });
  };

  useEffect(() => {
    if (state.date && state.time) {
      router.push('/user-info');
    }
  }, [state.date, state.time]);

  return (
    <Layout 
      pageTitle="날짜 및 시간 선택"
      pageSubtitle="예약 가능한 날짜와 시간을 선택해주세요"
      showFooter={false}
    >
      <div className="space-y-8">
        <Calendar 
          onChange={handleDateSelect}
          value={state.date}
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + config.MAX_RESERVATION_DAYS))}
          formatDay={(locale, date) => format(date, 'd')}
          formatMonthYear={(locale, date) => 
            format(date, 'yyyy년 M월', { locale: ko })
          }
          className="mx-auto rounded-lg shadow-lg"
          tileClassName={getTileClassName}
          tileDisabled={({ date }) => !isValidDate(date)}
          calendarType="US"
        />
        
        {state.date && (
          <div className="mt-8 grid grid-cols-2 gap-4 animate-fade-in">
            {timeSlots.map(({ id, label, value }) => {
              const isDisabled = false; // 시간대 비활성화 로직 추가 가능
              return (
                <button
                  key={id}
                  onClick={() => handleTimeSelect(value)}
                  disabled={isDisabled}
                  className={`p-4 rounded-lg border transition-all
                    ${state.time === value 
                      ? 'bg-[#007AFF] text-white border-transparent' 
                      : isDisabled
                        ? 'border-red-200 text-red-300 bg-red-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-[#007AFF]'
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}