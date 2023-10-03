import { Crowd, Giving } from '@elements/icons';
import { Button } from '@elements/components/button';
import { FollowButton } from '@elements/components/follow-button';
import { NamedSwitch } from '@elements/components/named-switch';
import { ProgressBar } from '@elements/components/progress-bar';
import { QRCodeButton } from '@elements/components/qr-code-button';
import { SaveButton } from '@elements/components/save-button';
import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { EntityType } from '@elements/compositions/entity-type';
import { TextEditor } from '@elements/compositions/text-editor';
import { Voting } from '@elements/compositions/voting';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';
import { EditButton } from '@elements/components/edit-button';
import { EntityType as Type } from '@elements/types';
import { Locality, LocalitySlideOver } from '@elements/compositions/action/locality';
import { LastActive } from '@elements/compositions/last-active';
import { updateHashParams } from '@elements/router';

export const SubscriptionBar = suspensify(() => {
  const actionId = useValue('current.action/id');
  const userId = useValue('current.user/id');
  const ident = useMemo(() => ({ 'user/id': userId, 'action/id': actionId }), [userId, actionId]);
  const followCount = useValue('action.follow/count', { 'action/id': actionId });
  const saved = useValue('action/saved', ident);
  const followed = useValue('action/followed', ident);
  const follow = useDispatch('action/follow');
  const unFollow = useDispatch('action/unfollow');
  const save = useDispatch('action/save');
  const unSave = useDispatch('action/unsave');

  const onFollowButtonClick = useCallback(() => {
    if (followed) {
      unFollow(ident);
    } else {
      follow(ident);
    }
  }, [followed, follow, unFollow, ident]);

  const onSaveButtonClick = useCallback(() => {
    if (saved) {
      unSave(ident);
    } else {
      save(ident);
    }
  }, [saved, save, unSave, ident]);

  return (
    <div className={'flex gap-4'}>
      <QRCodeButton kind={'tertiary'} size={'xs'} />
      <FollowButton
        clicked={followed}
        count={followCount}
        kind={'tertiary'}
        size={'xs'}
        onClick={onFollowButtonClick}
      />
      <SaveButton clicked={saved} kind={'tertiary'} size={'xs'} onClick={onSaveButtonClick} />
    </div>
  );
});

const Title = suspensify(() => {
  const actionId = useValue('current.action/id');
  const title = useValue('action.title/text', { 'action/id': actionId });

  const canEdit = useValue('action.title/can-edit', { 'action/id': actionId });
  const onEdit = useDispatch('action.title/edit');

  return (
    <div className={'flex items-start justify-between gap-3'}>
      <TextEditor
        className={'text-3xl font-semibold text-gray-800'}
        content={title}
        output={'text'}
        refAttribute={'action.title/text'}
        refId={actionId}
        richText={false}
        suspenseLines={1}
      />
      <EditButton
        canEdit={canEdit}
        className={'mt-2 h-5 w-5 text-gray-500'}
        suspenseLines={1}
        onEdit={onEdit}
      />
    </div>
  );
});

export const ActionBar = suspensify(() => {
  const actionId = useValue('current.action/id');
  const userId = useValue('current.user/id');

  const ident = useMemo(() => ({ 'user/id': userId, 'action/id': actionId }), [userId, actionId]);

  const volunteer = useDispatch('action/volunteer');
  const navigateToFunding = useDispatch('action/fund');

  const onVolunteerButtonClick = useCallback(() => {
    volunteer(ident);
  }, [volunteer, ident]);

  const onFundButtonClick = useCallback(() => {
    navigateToFunding(ident);
  }, [navigateToFunding, ident]);

  return (
    <div className={'flex gap-10'}>
      <Voting refAttribute={'entity.type/action'} refId={actionId} size={'md'} suspenseLines={1} />
      <Button
        Icon={Giving}
        containerClassName={'w-32'}
        kind={'primary'}
        size={'md'}
        value={'Fund'}
        onClick={onFundButtonClick}
      />
      <Button
        Icon={Crowd}
        kind={'secondary'}
        size={'md'}
        value={'Volunteer'}
        onClick={onVolunteerButtonClick}
      />
    </div>
  );
});

export const ProgressIndicator = suspensify(() => {
  const t = useTranslation();
  const actionId = useValue('current.action/id');
  const activeSwitchId = useValue('action.progress-bar/active-switch');
  const workPercentage = useValue('action.work/percentage', { 'action/id': actionId });
  const fundingPercentage = useValue('action.funding/percentage', { 'action/id': actionId });
  const updateSwitch = useDispatch('action.progress-bar/update');
  const workPercentageText = `${workPercentage}%`;

  const switches = useMemo(
    () => [
      { id: 'work', label: 'Work' },
      { id: 'funding', label: 'Funding' },
    ],
    []
  );

  const onSwitchClick = useCallback(
    (switchId: string) => {
      updateSwitch({ 'switch/id': switchId });
    },
    [updateSwitch]
  );

  fundingPercentage;

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex items-end justify-between'}>
        <NamedSwitch
          activeSwitchId={activeSwitchId}
          size={'xs'}
          switches={switches}
          onSwitchClick={onSwitchClick}
        />
        <div className={'flex gap-1 text-xs text-gray-500'}>
          <span className={'font-bold'}>{workPercentageText}</span>
          <span>{t('percentage/complete')}</span>
        </div>
      </div>
      <ProgressBar current={workPercentage} total={100} />
    </div>
  );
});

export const ActionTabs = suspensify(() => {
  const t = useTranslation();
  const activeTabId = useValue('action.tabs/active-tab');
  const tabs = useMemo(
    () => [
      { id: 'home', label: t('common/home') },
      // { id: 'funding', label: t('common/funding') },
      { id: 'updates', label: t('common/updates') },
      { id: 'discuss', label: t('common/discuss') },
      // { id: 'team', label: t('common/team') },
    ],
    [t]
  );

  const onTabClick = useCallback((tabId: string) => {
    updateHashParams({ tab: tabId }, { replace: true });
  }, []);

  return <Tabs activeTabId={activeTabId} size={'lg'} tabs={tabs} onTabClick={onTabClick} />;
});

export const Header = suspensify(() => {
  const actionId = useValue('current.action/id');

  return (
    <>
      <div className={'flex flex-col gap-16'}>
        <div className={'flex flex-col gap-10'}>
          <div className={'flex flex-col gap-8'}>
            <div className={'flex items-baseline justify-between'}>
              <div className={'flex gap-7'}>
                <EntityType size={'sm'} type={Type.Action} />
                <LastActive entityId={actionId} />
                <Locality actionId={actionId} />
              </div>
              <SubscriptionBar suspenseLines={2} />
            </div>
            <div className={'flex flex-col items-start gap-10'}>
              <div className={'mr-5 h-full w-full'}>
                <Title suspenseLineHeight={'36'} suspenseLines={1} />
              </div>
              <ActionBar suspenseLines={2} />
            </div>
          </div>
          <ProgressIndicator suspenseLines={1} />
        </div>
        <div className={'sticky'}>
          <ActionTabs suspenseLines={1} />
        </div>
      </div>
      <LocalitySlideOver actionId={actionId} />
    </>
  );
});
