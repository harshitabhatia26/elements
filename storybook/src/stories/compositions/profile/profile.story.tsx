import { Profile as Component } from '@elements/compositions/profile/profile';
import { store as wrapPageStore } from '@story/stores/wrap-page';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/Profile/Profile',
  component: Component,
};

const store = {
  read: {
    ...wrapPageStore.read,
    'profile.user/id': '2',
    'user/name': 'Sunil KS',
    'profile/actions': ['1', '2', '3'],
    'profile/issues': ['1', '2', '3'],
    'action/title': lorem.generateSentences(1),
    'issue/title': lorem.generateSentences(1),
    'profile.tabs/active-tab-id': 'actions',
  },
  dispatch: [...wrapPageStore.dispatch, 'auth.sign-in/initiate', 'profile.tabs/update'],
};

const args = {
  suspense: { lines: 5 },
};
export const Profile = mockStory({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});
