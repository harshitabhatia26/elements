import { Discussion } from '@elements/compositions/action/discussion';
import { Header } from '@elements/compositions/action/header';
import { Home } from '@elements/compositions/action/home';
import { Updates } from '@elements/compositions/action/updates';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';

type TabId = 'home' | 'discussion' | 'updates';

export const Action = wrapPage(() => {
  const activeTabId = useValue<TabId>('action.tabs/active-tab-id');
  const actionId = useValue<string>('current.action/id');
  let tab;

  switch (activeTabId) {
    case 'home':
      tab = <Home />;
      break;
    case 'updates':
      tab = (
        <Updates referenceAttribute={'action/id'} referenceId={actionId} suspense={{ lines: 12 }} />
      );
      break;
    case 'discussion':
      tab = <Discussion suspense={{ lines: 12 }} />;
      break;
    default:
      tab = <Home />;
  }

  return (
    <div className={'flex flex-col gap-6'}>
      <Header />
      {tab}
    </div>
  );
});

export const routes = {
  'action/view': <Action />,
};
