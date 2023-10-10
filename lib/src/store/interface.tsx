import type { ReactNode } from 'react';
import { createContext, memo, useCallback, useContext, useMemo } from 'react';
import type { Events, Subs } from '@elements/store/types';

export type Read = <T extends keyof Subs>(id: T, params?: Subs[T]['params']) => Subs[T]['result'];
export type Dispatch = <T extends keyof Events>(id: T, params?: Events[T]['params']) => void;

export type ValueHook = <T extends keyof Subs>(
  id: T,
  params?: Subs[T]['params']
) => Subs[T]['result'];

export type DispatchHook = <T extends keyof Events>(id: T) => (params: Events[T]['params']) => void;

interface StoreContextType {
  useValueImpl: ValueHook;
  useDispatchImpl: DispatchHook;
}

const placeholderContext: StoreContextType = {
  useValueImpl: (_id, _params) => {
    throw new Error('"useValueImpl" not set for StoreContext');
  },
  useDispatchImpl: (_id) => {
    throw new Error('"useDispatchImpl" not set for StoreContext');
  },
};

export const StoreContext = createContext<StoreContextType>(placeholderContext);

export const useValue: ValueHook = (id, params?) => {
  const { useValueImpl } = useContext(StoreContext);
  return useValueImpl(id, params);
};

export const useDispatch: DispatchHook = (id) => {
  const { useDispatchImpl } = useContext(StoreContext);
  return useDispatchImpl(id);
};

export function useStateLike(
  valueId: keyof Subs,
  dispatchId: keyof Events
): [any, (value: any) => void] {
  // TODO Deprecate
  const value = useValue(valueId);
  const dispatch = useDispatch(dispatchId);
  const setValue = useCallback((value: any) => dispatch({ value }), [dispatch]);
  return [value, setValue];
}

interface StoreProps {
  useValue: ValueHook;
  useDispatch: DispatchHook;
  children: ReactNode;
}

export const Store = memo(({ useValue, useDispatch, children }: StoreProps) => {
  const ctx = useMemo(
    () => ({
      useValueImpl: useValue,
      useDispatchImpl: useDispatch,
    }),
    [useValue, useDispatch]
  );

  return <StoreContext.Provider value={ctx}>{children}</StoreContext.Provider>;
});
