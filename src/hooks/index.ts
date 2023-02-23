import {AppStore} from '../store';
import {useAppDispatch} from '../store/hooks';

import {Dispatch, SetStateAction} from 'react';
import {
  Location,
  NavigateFunction,
  Params,
  useSearchParams,
} from 'react-router-dom';

interface AllStatelessReactHooks {
    dispatch?: ReturnType<typeof useAppDispatch>,
    navigate?: NavigateFunction,
    location?: Location,
    params?: Readonly<Params<string>>,
    searchParams?: ReturnType<typeof useSearchParams>[0],
    setSearchParams?: ReturnType<typeof useSearchParams>[1],
    store?: AppStore,
}

interface AllReactHooks<S> extends AllStatelessReactHooks {
    state: S,
    setState?: Dispatch<SetStateAction<S>>,
}

export type ReactHooks<S, K extends keyof AllReactHooks<S>>
    = Required<Pick<AllReactHooks<S>, 'state' | K>>;

export type StatelessReactHooks<K extends keyof AllStatelessReactHooks>
    = Required<Pick<AllStatelessReactHooks, K>>;
