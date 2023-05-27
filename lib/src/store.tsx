import {
  createContext,
  memo,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';

export type Subscribe = (
  id: string,
  params: Record<string, any>,
  onStoreChange: () => void
) => () => void;

export type Read = (id: string, params?: Record<string, any>) => any;

export type Dispatch = (id: string, params?: Record<string, any>) => void;

export type CheckPending = (value: any) => boolean;

export type Equal = (x: any, y: any) => boolean;

export type Marshal = (x: any) => any;

type StoreContextType = {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
  checkPending: CheckPending;
  equal?: Equal;
  marshal?: Marshal;
};

type DispatchReturn = (params?: Record<string, any>) => void;

const placeholderContext: StoreContextType = {
  read: (_id, _params) => {
    throw new Error('"read" not set for StoreContext');
  },
  subscribe: (_callback) => {
    throw new Error('"subscribe" not set for StoreContext');
  },
  dispatch: (_id, _params) => {
    throw new Error('"dispatch" not set for StoreContext');
  },
  checkPending: (_value: any) => {
    throw new Error('"checkPending" not set for StoreContext');
  },
};

export const StoreContext = createContext<StoreContextType>(placeholderContext);

export function useValue<T>(id: string, params?: Record<string, any>): T {
  const { read, subscribe, checkPending, equal, marshal } = useContext(StoreContext);
  const suspenseResolveRef = useRef<Function | null>();
  const valueRef = useRef<any>(read(id, params));
  const paramsStringified = JSON.stringify(params);

  const _subscribe = useCallback(
    (onStoreChange: () => void) => {
      return subscribe(id, params || {}, () => {
        const value = read(id, params);
        const suspenseResolve = suspenseResolveRef.current;
        if (!equal || (equal && !equal(valueRef.current, value))) {
          valueRef.current = value;
        }
        if (suspenseResolve && !checkPending(value)) {
          suspenseResolve(value);
          suspenseResolveRef.current = null;
        }
        onStoreChange();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [read, paramsStringified, id, checkPending, subscribe]
  );

  const value = useSyncExternalStore(_subscribe, () => valueRef.current);

  if (checkPending(value)) {
    throw new Promise((resolve) => {
      suspenseResolveRef.current = resolve;
    });
  }

  return marshal ? marshal(value) : value;
}

interface DispatchOptions {
  emptyParams?: boolean;
}

export function useDispatch(id: string, options?: any): DispatchReturn {
  const { emptyParams = false }: DispatchOptions = options || {};
  const { dispatch } = useContext(StoreContext);
  return useCallback(
    (params?: Record<string, any>) => dispatch(id, emptyParams ? {} : params || {}),
    [dispatch, id, emptyParams]
  );
}

export type StoreProps = {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
  children: ReactNode;
  checkPending: CheckPending;
  equal?: Equal;
  marshal?: Marshal;
};

export const Store = memo(
  ({ read, dispatch, subscribe, checkPending, children, equal, marshal }: StoreProps) => {
    const ctx = useMemo(
      () => ({
        read,
        dispatch,
        subscribe,
        checkPending,
        equal,
        marshal,
      }),
      [read, dispatch, subscribe, checkPending, equal, marshal]
    );

    return <StoreContext.Provider value={ctx}>{children}</StoreContext.Provider>;
  }
);
