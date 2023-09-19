import { dispatch, evt, sub } from '@elements/store';
import type { LatLng } from '@elements/components/map';
import { geolocate, parseClosestLocality, resolveLatLng } from '@elements/utils/location';

interface Locality {
  location: LatLng;
  name: string;
  zoom: number;
}

export type Subs = {
  'choose-locality.slide-over/visible': {
    params: {};
    result: boolean;
  };
  'user.chosen.locality/exists': {
    params: {};
    result: boolean;
  };
  'user.apparent.locality/location': {
    params: {};
    result: LatLng | undefined;
  };
  'user.chosen.locality/location': {
    params: {};
    result: LatLng | undefined;
  };
  'user.chosen.locality/name': {
    params: {};
    result: string | undefined;
  };
  'user.chosen.locality/zoom': {
    params: {};
    result: number | undefined;
  };
  'user.locality/location': {
    params: {};
    result: LatLng;
  };
  'user.locality/zoom': {
    params: {};
    result: number;
  };
};

export type Events = {
  'choose-locality.slide-over/close': {
    params: {};
  };
  'choose-locality.slide-over/open': {
    params: {};
  };
  'choose-locality.location/done': {
    params: {
      location: LatLng | undefined;
      zoom: number | undefined;
    };
  };
  'user.chosen.locality/sync': {
    params: {};
  };
  'user.apparent.locality/sync': {
    params: {};
  };
};

const getChosenLocality = (): Locality | null => {
  const localityJson = localStorage.getItem('user.chosen/locality');

  if (!localityJson) {
    return null;
  }

  return JSON.parse(localityJson);
};

export const localitySlice = () => ({
  'locality/state': {
    'choose-locality.slide-over/visible': false,
    'choose-locality/location': null,
  },
});

sub(
  'choose-locality.slide-over/visible',
  ({ state }: any) => state['locality/state']['choose-locality.slide-over/visible']
);

sub(
  'user.chosen.locality/location',
  ({ state }: any) => state['locality/state']['user.chosen.locality/location']
);

sub(
  'user.chosen.locality/name',
  ({ state }: any) => state['locality/state']['user.chosen.locality/name']
);

sub(
  'user.chosen.locality/zoom',
  ({ state }: any) => state['locality/state']['user.chosen.locality/zoom']
);

sub(
  'user.chosen.locality/exists',
  ({ state }: any) =>
    state['locality/state']['user.chosen.locality/location'] &&
    state['locality/state']['user.chosen.locality/name'] &&
    state['locality/state']['user.chosen.locality/zoom']
);

sub(
  'user.locality/location',
  ({ state }: any) =>
    state['locality/state']['user.chosen.locality/location'] ||
    state['locality/state']['user.apparent.locality/location']
);

sub(
  'user.locality/zoom',
  ({ state }: any) => state['locality/state']['user.chosen.locality/zoom'] || 13
);

evt('user.chosen.locality/sync', ({ setState }) => {
  const chosenLocality = getChosenLocality();

  setState((state: any) => {
    state['locality/state']['user.chosen.locality/location'] = chosenLocality?.location;
    state['locality/state']['user.chosen.locality/name'] = chosenLocality?.name;
    state['locality/state']['user.chosen.locality/zoom'] = chosenLocality?.zoom;
  });
});

evt('user.apparent.locality/sync', async ({ setState }) => {
  const result = await geolocate();

  setState((state: any) => {
    state['locality/state']['user.apparent.locality/location'] = result?.location;
  });
});

evt('choose-locality.slide-over/close', ({ setState }) => {
  setState((state: any) => {
    state['locality/state']['choose-locality.slide-over/visible'] = false;
  });
});

evt('choose-locality.slide-over/open', ({ setState }) => {
  setState((state: any) => {
    state['locality/state']['choose-locality.slide-over/visible'] = true;
  });
});

evt('choose-locality.location/done', async ({ setState, params }) => {
  const { location, zoom } = params;

  setState((state: any) => {
    state['locality/state']['choose-locality.slide-over/visible'] = false;
  });

  if (!location) {
    return;
  }

  const placeDetails = await resolveLatLng(location);
  const name = parseClosestLocality(placeDetails.addressComponents);
  const chosenLocality = { location, name, zoom };

  localStorage.setItem('user.chosen/locality', JSON.stringify(chosenLocality));

  dispatch('user.chosen.locality/sync');
});

/*
TODO
- Handle undefined locality values

 */
