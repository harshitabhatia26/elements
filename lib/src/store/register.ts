import { StoreApi } from 'zustand';
import { rpcGet } from '@elements/rpc';

type Read = (args: { state: any; params?: any }) => any;

type AsyncRead<Params, Result> = (args: { params?: Params }) => Promise<Result>;

export type Dispatch = (args: {
  setState: StoreApi<any>['setState'];
  getState: Function;
  params?: any;
}) => void;

export const subscriptions: any = {};
export const events: any = {};

export function sub(id: string, fn: Read) {
  subscriptions[id] = { fn, async: false };
}

export function asyncSub<Params, Result>(id: string, fn: AsyncRead<Params, Result>) {
  subscriptions[id] = { fn, async: true };
}

export function remoteSub<Params, Result>(id: string) {
  asyncSub<Params, Result>(id, async ({ params }) => {
    return rpcGet(id, params);
  });
}

export function evt(id: string, fn: Dispatch) {
  events[id] = { fn };
}
