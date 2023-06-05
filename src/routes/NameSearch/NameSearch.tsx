import './NameSearch.scss';

import EscortCard from './components/EscortCard';
import {ReactHooks} from '../../hooks';
import {SeatingChartService} from '../../services/SeatingChartService';
import {useSearchParams} from 'react-router-dom';
import {useSeatingChart} from '../../context/SeatingChart';

import React, {
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';

interface NameSearchState {
  name: string,
  initial: boolean,
  tables: [string, string][],
}

type NameSearchHooks = ReactHooks<NameSearchState, 'setState' | 'searchParams' | 'setSearchParams'>;

function searchForName(
  name: string,
  {state, setState, setSearchParams}: NameSearchHooks,
  service: SeatingChartService,
) {
  setSearchParams({q: name}, {replace: true});
  const tables = service.getTable(name.trim());
  setState({
    ...state,
    name,
    initial: false,
    tables,
  });
}

function onSubmit(
  event: FormEvent<HTMLElement>,
  hooks: NameSearchHooks,
  service: SeatingChartService,
) {
  event.preventDefault();
  searchForName(hooks.state.name, hooks, service);
}

function onRandomTagClick(
  event: MouseEvent<HTMLElement>,
  hooks: NameSearchHooks,
  service: SeatingChartService,
) {
  const randomTag = service.getRandomTag();
  searchForName(randomTag, hooks, service);
}

function NameSearch() {
  const service = useSeatingChart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<NameSearchState>({
    name: searchParams.get('q') ?? '',
    initial: true,
    tables: [],
  });
  const hooks: NameSearchHooks = {
    state,
    setState,
    searchParams,
    setSearchParams,
  };

  useEffect(() => {
    if (state.name) {
      searchForName(state.name, hooks, service);
    }
  }, []);

  return (
    <div className="name-search xs-y-margin-between-10">
      <form
        className="flex col xs-x-center xs-y-margin-between-4"
        onSubmit={(event) => onSubmit(event, hooks, service)}
      >
        <p className="is-size-5 is-color-secondary"> </p>
        <input
          className="name-input
          is-size-4
          is-color-primary
          is-center-aligned"
          type="text"
          value={state.name}
          onChange={(event) => setState({...state, name: event.target.value})}
          placeholder="FIRST OR LAST NAME"
        />
        <button type="submit" className="name-submit is-size-5 xs-x-self-center">🔍</button>

      </form>
      <hr />
      {state.initial ? undefined : (
        <div className="results">
          {(() => {
            if (state.tables.length === 0) {
              return (<p className="is-size-5">No results!</p>);
            } else {
              return (
                <div className="results flex col xs-x-center xs-y-margin-between-5">
                  {state.tables.map(([name, table]) => (
                    <EscortCard
                      key={name}
                      name={name}
                      table={table}
                    />
                  ))}
                </div>
              );
            }
          })()}

        </div>
      )}
    </div>
  );
}

export default NameSearch;
