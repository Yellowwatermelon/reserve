import { createContext, useContext, useReducer } from 'react';

const ReservationContext = createContext();

const initialState = {
  date: null,
  time: null,
  name: '',
  phone: '',
  loading: false,
  error: null
};

function reservationReducer(state, action) {
  switch (action.type) {
    case 'SET_DATE_TIME':
      return { 
        ...state, 
        date: action.date, 
        time: action.time 
      };
    
    case 'SET_USER_INFO':
      return { 
        ...state, 
        name: action.name, 
        phone: action.phone 
      };
    
    case 'SET_LOADING':
      return { 
        ...state, 
        loading: action.loading 
      };
    
    case 'SET_ERROR':
      return { 
        ...state, 
        error: action.error 
      };
    
    case 'RESET':
      return initialState;
    
    default:
      return state;
  }
}

export function ReservationProvider({ children }) {
  const [state, dispatch] = useReducer(reservationReducer, initialState);

  return (
    <ReservationContext.Provider value={{ state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};