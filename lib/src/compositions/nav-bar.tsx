import {
  ChevronDownMiniSolid,
  MagnifyingGlassOutline,
  MapPinOutline,
  UserCircleSolid,
} from '@elements/icons';
import { Button } from '@elements/components/button';
import { Dropdown } from '@elements/components/dropdown';
import { suspensify } from '@elements/components/suspensify';
import { MainSearch } from '@elements/compositions/main-search';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useMemo } from 'react';
import { Auth } from '@elements/compositions/auth/auth';
import { CreateModal as ActionCreateModal } from '@elements/compositions/action/create-modal';
import { CreateModal as IssueCreateModal } from '@elements/compositions/issue/create-modal';

const aktopia = 'Aktopia';

const CreateButton = () => {
  const t = useTranslation();

  return (
    <div className={'flex cursor-pointer items-start gap-4'}>
      <div
        className={
          'relative flex items-center justify-center gap-1 overflow-hidden rounded-md bg-blue-600 py-2 pl-3 pr-2'
        }>
        <p className={'text-xs font-medium text-white'}>{t('common/create')}</p>
        <ChevronDownMiniSolid className={'h-4 w-4 text-white'} />
      </div>
    </div>
  );
};

const CreateDropdown = () => {
  const t = useTranslation();

  const onCreateAction = useDispatch('action.create.modal/open');
  const onCreateIssue = useDispatch('issue.create.modal/open');

  const items = useMemo(
    () => [
      {
        text: t('common/action'),
        onClick: onCreateAction,
      },
      {
        text: t('common/issue'),
        onClick: onCreateIssue,
      },
    ],
    [onCreateAction, onCreateIssue, t]
  );
  return <Dropdown Button={CreateButton} items={items} />;
};

const Avatar = () => {
  return (
    <div className={'flex cursor-pointer items-center gap-1'}>
      <UserCircleSolid className={'h-8 w-8 text-gray-600'} />
      <ChevronDownMiniSolid className={'h-4 w-4 text-gray-600'} />
    </div>
  );
};

export const SignInButton = () => {
  const t = useTranslation();
  const onSignInClick = useDispatch('auth.sign-in/initiate');

  return (
    <div>
      <div className={'cursor-pointer text-sm font-medium text-blue-600'} onClick={onSignInClick}>
        {t('common/sign-in')}
      </div>
    </div>
  );
};

const UserDropdown = suspensify(() => {
  const userId = useValue('current.user/id');
  const authenticated = useValue('auth.session/exists');
  const onSignOutClick = useDispatch('auth/sign-out');
  const items = useMemo(
    () => [
      {
        text: 'My Actions',
        href: `/profile/${userId}/actions`,
      },
      {
        text: 'My Issues',
        href: `/profile/${userId}/issues`,
      },
      {
        text: 'Sign out',
        onClick: () => onSignOutClick({}),
      },
    ],
    [userId, onSignOutClick]
  );
  return authenticated ? (
    <Dropdown Button={Avatar} align={'right'} items={items} />
  ) : (
    <SignInButton />
  );
});

const Logo = () => {
  return (
    <div
      className={
        'font-logo flex h-full w-max items-center bg-gradient-to-br from-blue-800 to-blue-600 px-3 text-xl text-white'
      }>
      <a href={'/home'}>{aktopia}</a>
    </div>
  );
};

const SearchBar = () => {
  const t = useTranslation();
  const onSearchClick = useDispatch('main-search/open');

  return (
    <div
      className={
        'flex cursor-pointer gap-5 rounded-xl border border-gray-300 bg-gray-100 py-2 pl-3 pr-7'
      }
      onClick={onSearchClick}>
      <MagnifyingGlassOutline className={'h-4 w-4 text-gray-500'} />
      <div className={'text-xs text-gray-500'}>{t('main-search/placeholder')}</div>
    </div>
  );
};

const UserLocation = () => {
  return (
    <Button
      Icon={MapPinOutline}
      iconClassName={'stroke-2 relative bottom-px'}
      kind={'warning'}
      size={'xs'}
      value={'Set Location'}
    />
  );
};

export const NavBar = () => {
  return (
    <>
      <div
        className={
          'fixed z-20 grid h-max w-full grid-cols-7 border-b border-b-gray-300 bg-white shadow-sm'
        }>
        <div className={'col-start-1 col-end-2'}>
          <Logo />
        </div>
        <div className={'col-start-2 col-end-2 flex items-center justify-start'}>
          <CreateDropdown />
        </div>
        <div className={'col-start-3 col-end-3 flex items-center justify-start'}>
          <UserLocation />
        </div>
        <div className={'col-start-4 col-end-4 my-3 flex items-center justify-center'}>
          <SearchBar />
        </div>
        <div
          className={
            'col-start-7 col-end-7 flex w-full items-center justify-center bg-white py-2.5 pl-2 pr-6 md:pl-12 md:pr-14'
          }>
          <UserDropdown suspenseLines={5} />
        </div>
      </div>
      <Auth suspenseLines={5} />
      <MainSearch suspenseLines={5} />
      <ActionCreateModal suspenseLines={1} />
      <IssueCreateModal suspenseLines={1} />
    </>
  );
};
