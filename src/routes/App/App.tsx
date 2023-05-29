import './App.scss';

import Loading from '../../common/components/Loading/Loading';
import NameSearch from '../NameSearch/NameSearch';
import SeatingChartProvider from '../../context/SeatingChart';
import {
  fetchAppData,
} from '../../store/slices/wedding';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const {data, errorMessage, status} = useAppSelector((state) => state.wedding);

  useEffect(() => {
    if (status == 'idle') {
      dispatch(fetchAppData());
    }
  }, [status, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="is-center-aligned xs-y-margin-between-2">
        <p className="is-size-4">Loading...</p>
        <Loading size="160px" rippleWidth="6px" speed="1s" />
      </div>
    );
  } else if (status === 'rejected') {
    return (
      <div>
        ERROR:
        {' '}
        {errorMessage}
      </div>
    );
  } else {
    const {
      bride, groom, lastName, date, time, location,
    } = data!;
    return (
      <div className="app is-center-aligned xs-y-margin-between-2">
        <img src="https://i.ibb.co/QJx1jj0/Seating-Chart-Text.png"></img>
        <div className="content">
          <SeatingChartProvider data={data?.seatingChart}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<NameSearch />} />
                {/* <Route path="/chart" element={<SeatingChart />} /> */}
              </Routes>
            </BrowserRouter>
          </SeatingChartProvider>
        </div>
      </div>
    );
  }
}

export default App;
