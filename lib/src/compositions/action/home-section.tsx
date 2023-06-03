import { TrophyMiniSolid } from '@elements/_icons';
import { suspensify } from '@elements/components/suspensify';
import { TextAreaEditor } from '@elements/components/text-area-editor';
import { WithContextMenu } from '@elements/components/with-context-menu';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { memo, useCallback } from 'react';

const Description = suspensify(() => {
  const t = useTranslation();
  const actionId = useValue('current.action/id');
  const description = useValue<string>('action/description', { 'action/id': actionId });
  const isEditing = useValue<boolean>('current.action.description/editing');
  const onEdit = useDispatch('current.action.description/edit', { emptyParams: true });
  const onEditCancel = useDispatch('current.action.description.edit/cancel', {
    emptyParams: true,
  });
  const onEditDone = useDispatch('current.action.description.edit/done', {
    emptyParams: true,
  });
  const updateDescription = useDispatch('current.action.description/update');
  const onChange = useCallback(
    (value: string) => updateDescription({ value }),
    [updateDescription]
  );

  return (
    <WithContextMenu
      disable={isEditing}
      items={[{ id: 'edit', label: t('common/edit') }]}
      onItemClick={onEdit}>
      <TextAreaEditor
        cancelText={t('common/cancel')}
        doneText={t('common/done')}
        editable={isEditing}
        value={description}
        onCancel={onEditCancel}
        onChange={onChange}
        onDone={onEditDone}
      />
    </WithContextMenu>
  );
});

const OutcomeText = suspensify(() => {
  const t = useTranslation();
  const actionId = useValue<string>('current.action/id');
  const outcome = useValue<string>('action/outcome', { 'action/id': actionId });
  const isEditing = useValue<boolean>('current.action.outcome/editing');
  const onEdit = useDispatch('current.action.outcome/edit', { emptyParams: true });
  const onEditCancel = useDispatch('current.action.outcome.edit/cancel', {
    emptyParams: true,
  });
  const onEditDone = useDispatch('current.action.outcome.edit/done', {
    emptyParams: true,
  });
  const updateOutcome = useDispatch('current.action.outcome/update');
  const onChange = useCallback((value: string) => updateOutcome({ value }), [updateOutcome]);

  return (
    <WithContextMenu
      disable={isEditing}
      items={[{ id: 'edit', label: t('common/edit') }]}
      onItemClick={onEdit}>
      <TextAreaEditor
        cancelText={t('common/cancel')}
        doneText={t('common/done')}
        editable={isEditing}
        value={outcome}
        onCancel={onEditCancel}
        onChange={onChange}
        onDone={onEditDone}
      />
    </WithContextMenu>
  );
});

const Outcome = memo(() => {
  const t = useTranslation();

  return (
    <div className={'flex w-full flex-col gap-2 rounded-md border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center gap-3'}>
        <TrophyMiniSolid className={'h-4 w-5 text-blue-700'} />
        <div className={'font-medium text-blue-700'}>{t('common/outcome')}</div>
      </div>
      <OutcomeText suspenseColor={'primary'} suspenseLines={6} />
    </div>
  );
});

interface Relation {
  relation: 'resolves' | 'partially-resolves';
  type: 'issue' | 'action';
  title: string;
}

const relationTypeTKey = {
  issue: 'common/issue',
  action: 'common/action',
};

const relationTKey = {
  resolves: 'relation/resolves',
  'partially-resolves': 'relation/partially-resolves',
  relates: 'relation/relates',
};

const Relation = suspensify(({ id }: any) => {
  const t = useTranslation();
  const relation = useValue<Relation>('action/relation', {
    'relation/id': id,
  });

  return (
    <div className={'flex flex-col gap-2 rounded-md border border-gray-300 p-4 shadow-sm'}>
      <div className={'flex'}>
        <div>{t(relationTKey[relation.relation])}</div>
        <div className={'w-max rounded border border-rose-200 bg-rose-50 px-2 py-1 shadow-inner'}>
          <p className={'text-xs font-medium text-rose-600'}>
            {t(relationTypeTKey[relation.type])}
          </p>
        </div>
      </div>
      <div className={'text-gray-700'}>{relation.title}</div>
    </div>
  );
});

const Relations = suspensify(() => {
  const actionId = useValue('current.action/id');
  const relationIds = useValue<{ type: string; title: string }[]>('action.relation/ids', {
    'action/id': actionId,
  });

  return (
    <div className={'flex flex-col gap-5'}>
      {relationIds.map((relationId) => (
        <Relation key={relationId} id={relationId} suspenseLines={3} />
      ))}
    </div>
  );
});

export const HomeSectionFuture = () => {
  return (
    <div className={'flex w-full gap-8'}>
      <div className={'flex w-full flex-col gap-5'}>
        <Description suspenseLines={6} />
        <Outcome />
      </div>
      <Relations suspenseLines={8} />
    </div>
  );
};

export const HomeSection = () => {
  return (
    <div className={'flex w-full flex-col gap-5'}>
      <Description suspenseLines={6} />
      <Outcome />
    </div>
  );
};
