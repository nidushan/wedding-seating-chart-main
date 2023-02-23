import {SeatingChart} from '../store/slices/wedding';
import {SeatingChartService} from '../services/SeatingChartService';

import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

const SeatingChartContext = createContext<SeatingChartService | undefined>(undefined);

interface SeatingChartProviderState {
    service: SeatingChartService,
}

interface SeatingChartProviderProps {
    data?: SeatingChart,
    children?: ReactNode,
}

function SeatingChartProvider({data, children}: SeatingChartProviderProps) {
  const [state] = useState<SeatingChartProviderState>({
    service: new SeatingChartService(data),
  });
  return (
    <SeatingChartContext.Provider value={state.service}>
      {children}
    </SeatingChartContext.Provider>
  );
}

SeatingChartProvider.defaultProps = {
  data: undefined,
  children: undefined,
};

export const useSeatingChart = (): SeatingChartService => {
  const context = useContext(SeatingChartContext);
  if (!context) {
    throw new Error('useSeatingChart must be used within a SeatingChartProvider');
  }
  return context;
};

export default SeatingChartProvider;
