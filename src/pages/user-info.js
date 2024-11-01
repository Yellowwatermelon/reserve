import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { useReservation } from '../contexts/ReservationContext';
import { config } from '../config';

export default function UserInfo() {
  const router = useRouter();
  const { state, dispatch } = useReservation();
  
  const { register, handleSubmit, formState: { errors, isValid }, setFocus } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: state.name,
      phone: state.phone
    }
  });

  useEffect(() => {
    if (!state.date || !state.time) {
      router.replace('/date');
    } else {
      // 컴포넌트 마운트 시 이름 필드에 포커스
      setFocus('name');
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      
      // API 호출 및 데이터 저장
      await saveReservation({
        date: state.date,
        time: state.time,
        ...data
      });

      dispatch({ type: 'SET_USER_INFO', name: data.name, phone: data.phone });
      router.push('/complete');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  // 엔터 키로 다음 필드로 이동
  const handleKeyDown = (e, nextField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setFocus(nextField);
    }
  };

  return (
    <Layout 
      pageTitle="예약자 정보 입력"
      pageSubtitle="계약자의 성명과 연락처를 입력해주세요"
      marketingText="고객님의 정보를 안전하게 보관하겠습니다"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <input
              {...register('name', {
                required: '이름을 입력해주세요',
                pattern: {
                  value: config.VALIDATION.name.pattern,
                  message: config.VALIDATION.name.message
                }
              })}
              onKeyDown={(e) => handleKeyDown(e, 'phone')}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-[#007AFF]
                       focus:border-transparent transition-all"
              placeholder="계약자 성명 (한글 3자 이상)"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('phone', {
                required: '전화번호를 입력해주세요',
                pattern: {
                  value: config.VALIDATION.phone.pattern,
                  message: config.VALIDATION.phone.message
                }
              })}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-[#007AFF]
                       focus:border-transparent transition-all"
              placeholder="계약자 전화번호 ('-' 없이 숫자만)"
              type="tel"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-[#007AFF] text-white py-4 rounded-lg font-medium
                   transition-all hover:bg-[#0066CC] active:bg-[#005AB5]
                   disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          예약 완료하기
        </button>
      </form>
    </Layout>
  );
}