import { NavBar as Component } from '@elements/compositions/nav-bar';
import { store as mainSearchStore } from '@story/stores/main-search';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/NavBar',
  component: Component,
};

const store = {
  read: {
    'current.user/id': '2',
    'auth.session/exists': false,
    'auth.sign-in/visible': false,
    ...mainSearchStore.read,
    'main-search/visible': false,
  },
  dispatch: ['auth.sign-in/initiate', 'main-search/open', ...mainSearchStore.dispatch],
};

export const NavBar = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
