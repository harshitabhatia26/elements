import { store as textEditorStore } from '@story/stores/text-editor';

export const store = {
  sub: {
    ...textEditorStore.sub,
    'current.action/id': '1',
    'current.user/id': '2',
    'action.follow/count': 2600,
    'action/saved': false,
    'action/followed': false,
    'action.title/text': 'Clear large garbage dump on Vandipalayam road',
    'action/last-active': 'ADD-ME',
    'action/bumped': false,
    'action.bump/count': 10,
    'action.progress-bar/active-switch': 'work',
    'action.work/percentage': 23,
    'action.funding/percentage': 24,
    'action.progress-bar/switches': [
      { id: 'work', label: 'Work' },
      { id: 'funding', label: 'Funding' },
    ],
    'action.tabs/active-tab': 'home',
  },
  evt: [
    ...textEditorStore.evt,
    'action/follow',
    'action/unfollow',
    'action/save',
    'action/unsave',
    'action/bump',
    'action/unbump',
    'action/fund',
    'action.progress-bar/update',
    'action.tabs/update',
  ],
};
