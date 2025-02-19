import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store/interface';
import { EntityTypeBadge } from '@elements/compositions/entity-type-badge';
import { EntityType as Type } from '@elements/types';
import { LastActive } from '@elements/compositions/last-active';
import { Voting } from '@elements/compositions/voting';
import { useTranslation } from '@elements/translation';
import { Locality as RawLocality } from '@elements/components/locality';
import { useCallback } from 'react';
import { Link } from '@elements/components/link';
import { useIdent } from '@elements/store/hooks';
import { ActionStatusButton } from '@elements/compositions/action/action-status';
import { ActionStatus } from '@elements/logic/action';

interface ActionCardProps {
  id: string;
  onLocalitySlideOverOpen: (entityId: string, entityType: Type) => void;
}

export const Locality = suspensify(
  ({ actionId, onClick }: { actionId: string; onClick: () => void }) => {
    const t = useTranslation();
    const isLocalityChosen = useValue('action.locality/exists', { 'action/id': actionId });
    const localityName = useValue('action.locality/caption', { 'action/id': actionId });

    return (
      <RawLocality
        isLocalityChosen={isLocalityChosen}
        localityName={localityName}
        notChosenText={t('action.locality/add')}
        onClick={onClick}
      />
    );
  }
);

export const ActionCard = suspensify(({ id, onLocalitySlideOverOpen }: ActionCardProps) => {
  const title = useValue('action.title/text', { 'action/id': id });
  const isDraft = useValue('action.status/check', {
    'action/id': id,
    in: [ActionStatus.Draft],
  });
  const onLocalityClick = useCallback(
    () => onLocalitySlideOverOpen(id, Type.Action),
    [id, onLocalitySlideOverOpen]
  );

  const ident = useIdent('action/id', id);
  const updatedAt = useValue('action/updated-at', { 'action/id': id });

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-7 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex items-center gap-7 flex-wrap'}>
        <EntityTypeBadge size={'sm'} type={Type.Action} />
        <LastActive timestamp={updatedAt} />
        <ActionStatusButton actionId={id} />
      </div>
      <Locality actionId={id} onClick={onLocalityClick} />
      <Link
        className={'text-2xl font-medium hover:underline w-full break-all'}
        href={`/action/${id}`}>
        {title}
      </Link>
      {isDraft ? null : (
        <div className={'flex items-center gap-5'}>
          <Voting ident={ident} size={'xs'} suspenseLines={2} />
        </div>
      )}
    </div>
  );
});

/*
TODO
- Enable locality
- Add choose locality
 */
