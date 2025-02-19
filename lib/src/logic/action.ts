import { rpcGet, rpcPost } from '@elements/rpc';
import {
  endEditing,
  isEmpty,
  onEditCancelDefault,
  onTextUpdateDefault,
  registerTextEditor,
  setError,
  startEditing,
  text,
} from '@elements/logic/text-editor';
import type { Match } from '@elements/utils/router';
import { parseClosestLocality, resolveLatLng } from '@elements/utils/location';
import { type LatLng } from '@elements/components/map';
import { wrapRequireAuth } from '@elements/logic/authentication';
import type { Evt, Sub } from '@elements/store/types';
import { asyncSub, evt, remoteSub, sub } from '@elements/store/register';

export enum ActionTab {
  Home = 'action.tab/home',
  Discuss = 'action.tab/discuss',
  Updates = 'action.tab/updates',
}

export type SwitchId = 'work' | 'funding';

export enum ActionStatus {
  Draft = 'action.status/draft',
  Reviewing = 'action.status/reviewing',
  Active = 'action.status/active',
  Completed = 'action.status/completed',
}

export type Subs = {
  'action.tabs/active-tab': Sub<{}, ActionTab>;
  'action.progress-bar.switches/active-switch': Sub<{}, string>;
  'action.title/text': Sub<{ 'action/id': string }, string>;
  'action.description/text': Sub<{ 'action/id': string }, string>;
  'action.outcome/text': Sub<{ 'action/id': string }, string>;
  'action.funding/percentage': Sub<{}, number>;
  'action/status': Sub<{ 'action/id': string }, ActionStatus>;
  'action/saved': Sub<{}, boolean>;
  'action/followed': Sub<{}, boolean>;
  'action.bump/count': Sub<{}, number>;
  'action.follow/count': Sub<{}, number>;
  'action.work/percentage': Sub<{}, number>;
  'action/updated-at': Sub<{}, number>;
  'current.action/id': Sub<{}, string>;
  'action.create.modal/title': Sub<{}, string>;
  'action.create.modal/visible': Sub<{}, boolean>;
  'action.title/can-edit': Sub<{}, boolean>;
  'action.description/can-edit': Sub<{}, boolean>;
  'action.outcome/can-edit': Sub<{}, boolean>;
  'action.locality/exists': Sub<{ 'action/id': string }, boolean>;
  'action.locality/caption': Sub<{ 'action/id': string }, string>;
  'action.locality.slide-over/visible': Sub<{}, boolean>;
  'action.locality/location': Sub<{ 'action/id': string }, LatLng>;
  'action.locality/zoom': Sub<{ 'action/id': string }, number>;
  'action.status/modal': Sub<{}, { 'action/id': string; visible: boolean }>;
  'action/can-delete': Sub<{ 'action/id': string }, boolean>;
  'action/exists': Sub<{ 'action/id': string }, boolean>;
  'action.status/check': Sub<{ 'action/id': string; in: ActionStatus[] }, boolean>;
  'action.locality/error': Sub<{}, string>;
  'action.status/can-update': Sub<{ 'action/id': string; status: ActionStatus }, boolean>;
};

export type Events = {
  'action.title/edit': Evt<{ 'ref/id': string; 'ref/attribute': string }>;
  'action.description/edit': Evt<{ 'ref/id': string; 'ref/attribute': string }>;
  'action.outcome/edit': Evt<{ 'ref/id': string; 'ref/attribute': string }>;
  'current.action.id/set': Evt<{ 'action/id': string }>;
  'action/volunteer': Evt<{}>;
  'action/follow': Evt<{}>;
  'action/unfollow': Evt<{}>;
  'action/save': Evt<{}>;
  'action/unsave': Evt<{}>;
  'action/bump': Evt<{}>;
  'action/unbump': Evt<{}>;
  'action/fund': Evt<{}>;
  'action.progress-bar.switches/update': Evt<{ 'switch/id': SwitchId }>;
  'action.tabs/update': Evt<{ 'tab/id': ActionTab }>;
  'action.create.modal/open': Evt<{}>;
  'action.create.modal/close': Evt<{}>;
  'action.create.modal.title/update': Evt<{ value: string }>;
  'action.locality.slide-over/open': Evt<{}>;
  'action.locality.slide-over/close': Evt<{}>;
  'action.status.modal/open': Evt<{ 'action/id': string }>;
  'action.status.modal/close': Evt<{}>;
  'action.locality/choose': Evt<{ location: LatLng; zoom: number }>;
  'navigated.action/view': Evt<{ route: Match }>;
  'navigated.action/new': Evt<{ route: Match }>;
  'action.status/update': Evt<{ 'action/id': string; status: ActionStatus }>;
  'action/delete': Evt<{ 'action/id': string }>;
  'action.locality.error/clear': Evt<{}>;
};

export const actionSlice = () => ({
  'action/state': {
    'action.tabs/active-tab': ActionTab.Home,
    'action.progress-bar.switches/active-switch': 'work',
    'action.create.modal/visible': false,
    'action.create.modal/title': '',
    'action.locality.slide-over/visible': false,
    'action.status/modal': { visible: false },
    'action.locality/error': null,
  },
});

sub('action.tabs/active-tab', ({ state }) => state['action/state']['action.tabs/active-tab']);

sub(
  'action.progress-bar.switches/active-switch',
  ({ state }) => state['action/state']['action.progress-bar.switches/active-switch']
);

sub('action.funding/percentage', () => 42);
sub('action/saved', () => false);
sub('action/followed', () => false);
sub('action.bump/count', () => 10);
sub('action.follow/count', () => 2600);
sub('action.work/percentage', () => 23);

sub('current.action/id', ({ state }) => state['action/state']['current.action/id']);

sub('action.create.modal/title', ({ state }) => state['action/state']['action.create.modal/title']);

sub(
  'action.create.modal/visible',
  ({ state }) => state['action/state']['action.create.modal/visible']
);

sub(
  'action.locality.slide-over/visible',
  ({ state }) => state['action/state']['action.locality.slide-over/visible']
);

sub('action.status/modal', ({ state }) => state['action/state']['action.status/modal']);

sub('action.locality/error', ({ state }) => state['action/state']['action.locality/error']);

asyncSub('action.status/check', async ({ params }) => {
  const status: ActionStatus = await rpcGet('action/status', { 'action/id': params['action/id'] });
  return params['in'].includes(status);
});

remoteSub('action.title/text');
remoteSub('action.description/text');
remoteSub('action.outcome/text');
remoteSub('action/updated-at');
remoteSub('action.locality/exists');
remoteSub('action.locality/caption');
remoteSub('action.locality/location');
remoteSub('action.locality/zoom');
remoteSub('action.title/can-edit');
remoteSub('action.description/can-edit');
remoteSub('action.outcome/can-edit');
remoteSub('action/status');
remoteSub('action/can-delete');
remoteSub('action/exists');
remoteSub('action.status/can-update');

evt('action.title/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: { ref: ['action.title/text', currenActionId] },
  });
});

evt('action.description/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: {
      ref: ['action.description/text', currenActionId],
    },
  });
});

evt('action.outcome/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: {
      ref: ['action.outcome/text', currenActionId],
    },
  });
});

evt('current.action.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['current.action/id'] = params['action/id'];
  });
});

evt('action/volunteer', () => null);
evt('action/follow', () => null);
evt('action/unfollow', () => null);
evt('action/save', () => null);
evt('action/unsave', () => null);
evt('action/bump', () => null);
evt('action/unbump', () => null);
evt('action/fund', () => null);

evt('action.progress-bar.switches/update', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['action.progress-bar.switches/active-switch'] = params['switch/id'];
  });
});

evt('action.tabs/update', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['action.tabs/active-tab'] = params['tab/id'];
  });
});

evt(
  'action.create.modal/open',
  wrapRequireAuth(({ setState }) => {
    setState((state: any) => {
      state['action/state']['action.create.modal/visible'] = true;
    });
  })
);

evt('action.create.modal/close', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/visible'] = false;
    state['action/state']['action.create.modal/title'] = '';
  });
});

evt('action.create.modal.title/update', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/title'] = params.value;
  });
});

evt('navigated.action/view', ({ params, dispatch }) => {
  const id = params.route.pathParams.id;
  const tab = params.route.hashParams.tab as ActionTab;
  if (tab) {
    dispatch('action.tabs/update', { 'tab/id': tab });
  }
  dispatch('current.action.id/set', { 'action/id': id });
  dispatch('route.navigation/complete');
});

evt('navigated.action/new', async ({ params, dispatch }) => {
  const { title } = params.route.queryParams;
  const { 'action/id': id } = await rpcPost('action.draft/create', { 'action.title/text': title });
  dispatch('navigate/route', { id: 'action/view', pathParams: { id }, replace: true });
});

evt('action.locality.slide-over/open', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.locality.slide-over/visible'] = true;
  });
});

evt('action.locality.slide-over/close', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.locality.slide-over/visible'] = false;
  });
});

evt('action.locality/choose', async ({ getState, params, dispatch, replaceAsyncSubs }) => {
  const actionId = getState()['action/state']['current.action/id'];
  const { location, zoom } = params;
  const placeDetails = await resolveLatLng(location);
  const caption = parseClosestLocality(placeDetails.addressComponents);

  const res = await rpcPost('action.locality/upsert', {
    'action/id': actionId,
    location,
    zoom,
    caption,
  });

  replaceAsyncSubs([
    [['action.locality/location', { 'action/id': actionId }], res['action.locality/location']],
    [['action.locality/zoom', { 'action/id': actionId }], res['action.locality/zoom']],
    [['action.locality/caption', { 'action/id': actionId }], res['action.locality/caption']],
    [['action.locality/exists', { 'action/id': actionId }], res['action.locality/exists']],
  ]);

  dispatch('action.locality.slide-over/close', {});
});

evt('action.locality.error/clear', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.locality/error'] = null;
  });
});

evt('action.status.modal/open', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['action.status/modal'] = {
      visible: true,
      'action/id': params['action/id'],
    };
  });
});

evt('action.status.modal/close', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.status/modal'] = { visible: false };
  });
});

evt(
  'action.status/update',
  async ({ params, dispatch, getState, setState, read, invalidateAsyncSub }) => {
    const actionId = params['action/id'];

    // TODO Think about abstracting validations than having them in the logic layer.
    if ([ActionStatus.Reviewing, ActionStatus.Active].includes(params.status)) {
      const isDescriptionEmpty = isEmpty({
        getState,
        params: { ref: ['action.description/text', actionId] },
      });

      const isOutcomeEmpty = isEmpty({
        getState,
        params: { ref: ['action.outcome/text', actionId] },
      });

      const isLocalityNotChosen = !read('action.locality/exists', { 'action/id': actionId });

      const hasErrors = isDescriptionEmpty || isOutcomeEmpty || isLocalityNotChosen;

      if (isDescriptionEmpty) {
        startEditing({ setState, params: { ref: ['action.description/text', actionId] } });
        setError({
          setState,
          params: {
            ref: ['action.description/text', actionId],
            error: 'Description cannot be empty.', // TODO i18n
          },
        });
      }

      if (isOutcomeEmpty) {
        startEditing({ setState, params: { ref: ['action.outcome/text', actionId] } });
        setError({
          setState,
          params: {
            ref: ['action.outcome/text', actionId],
            error: 'Outcome cannot be empty.', // TODO i18n
          },
        });
      }

      if (isLocalityNotChosen) {
        setState((state: any) => {
          state['action/state']['action.locality/error'] = 'Locality must be chosen.'; // TODO i18n
        });
      }

      if (hasErrors) {
        return;
      }
    }

    await rpcPost('action.status/update', {
      'action/id': params['action/id'],
      status: params.status,
    });

    dispatch('action.status.modal/close', {});
    dispatch('alert/flash', {
      message: 'Action status has been updated.',
      kind: 'info',
    });
    await invalidateAsyncSub(['action/status', { 'action/id': params['action/id'] }]);
  }
);

evt('action/delete', async ({ params, dispatch }) => {
  await rpcPost('action/delete', { 'action/id': params['action/id'] });
  dispatch('navigate/route', { replace: true, id: 'home/view' });
});

registerTextEditor('action.title/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params, invalidateAsyncSub }) => {
    const title = text({ getState, params })?.trim();

    // TODO Think about abstracting validations than having them in the logic layer.
    if (title === '') {
      return setError({ setState, params: { ...params, error: 'Title cannot be empty.' } });
    }

    await rpcPost('action.title.text/update', {
      'action/id': params.ref[1],
      value: title,
    });
    await invalidateAsyncSub(['action.title/text', { 'action/id': params.ref[1] }]);
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});

registerTextEditor('action.description/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params, invalidateAsyncSub }) => {
    const description = text({ getState, params });
    await rpcPost('action.description.text/update', {
      'action/id': params.ref[1],
      value: description,
    });
    await invalidateAsyncSub(['action.description/text', { 'action/id': params.ref[1] }]);
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});

registerTextEditor('action.outcome/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params, invalidateAsyncSub }) => {
    const outcome = text({ getState, params });
    await rpcPost('action.outcome.text/update', {
      'action/id': params.ref[1],
      value: outcome,
    });
    await invalidateAsyncSub(['action.outcome/text', { 'action/id': params.ref[1] }]);
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});
