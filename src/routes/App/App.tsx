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
        <div className="hide">
          <h1 className="is-size-3 is-regular-weight">Wedding Seating Chart</h1>
          <h2 className="is-size-4 is-color-secondary is-italic is-light-weight">
            {bride}
            {' '}
            &
            {' '}
            {groom}
            {' '}
            {lastName}
          </h2>
          <h3 className="is-size-5 is-color-secondary is-italic is-light-weight">
            {new Date(`${date} ${time}`).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </h3>
          <h3 className="is-size-5 is-color-secondary is-italic is-light-weight">
            {location}
          </h3>
        </div>
        <div className="content">
          <a href="https://wsc.jonathanfoundhisjeevan.com/">
            <img id="wIMG" src="https://i.imgur.com/1Zk6P8z.png" alt="Image" />
          </a>
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
