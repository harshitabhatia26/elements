import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store';
import { IssueCard } from '@elements/compositions/issue/issue-card';
import { ViewLocalitySlideOver as RawViewLocalitySlideOver } from '@elements/components/view-locality-slide-over';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from '@elements/translation';

const ViewIssueLocalitySlideOver = suspensify(({ entityId, onClose }: any) => {
  const t = useTranslation();
  const initialCenter = useValue('issue.locality/location', { 'issue/id': entityId });
  const initialZoom = useValue('issue.locality/zoom', { 'issue/id': entityId });
  const locations = useMemo(() => [initialCenter], [initialCenter]);

  return (
    <RawViewLocalitySlideOver
      initialCenter={initialCenter}
      initialZoom={initialZoom}
      locations={locations}
      title={t('issue/locality')}
      visible={true}
      onClose={onClose}
    />
  );
});

export const Issues = suspensify(() => {
  const userId = useValue('profile.user/id');
  const issueIds = useValue('profile.issue/ids', { 'user/id': userId });
  const [localitySlideOverId, setLocalitySlideOverId] = useState<string | null>(null);

  const slideOverVisible = localitySlideOverId !== null;

  const onLocalitySlideOverOpen = useCallback((entityId: string) => {
    setLocalitySlideOverId(entityId);
  }, []);

  const onLocalitySlideOverClose = useCallback(() => {
    setLocalitySlideOverId(null);
  }, []);

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        {issueIds.map((id) => (
          <IssueCard
            key={id}
            id={id}
            suspenseLines={2}
            onLocalitySlideOverOpen={onLocalitySlideOverOpen}
          />
        ))}
      </div>
      {slideOverVisible ? (
        <ViewIssueLocalitySlideOver
          entityId={localitySlideOverId}
          onClose={onLocalitySlideOverClose}
        />
      ) : null}
    </>
  );
});
