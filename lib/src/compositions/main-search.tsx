import { MagnifyingGlassSolid } from '@elements/icons';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useState, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import React, { Fragment, useCallback } from 'react';
import type { EntityType } from '@elements/types';
import { EntityType as ResultType } from '@elements/compositions/entity-type';
import { Modal, ModalPanel } from '@elements/components/modal';
import { Combobox } from '@headlessui/react';

const nameMap = {
  'entity.type/action': 'action',
  'entity.type/issue': 'issue',
};

function makeLink(type: EntityType, entityId: string) {
  return `/${nameMap[type]}/${entityId}`;
}

interface ResultProps {
  type: EntityType;
  id: string;
  entityId: string;
  snippet: string;
}

const Result = ({ type, entityId, snippet }: ResultProps) => {
  return (
    <Combobox.Option as={Fragment} value={entityId}>
      <div className={'ui-active:bg-gray-100 cursor-default select-none px-4 py-2'}>
        <a className={'flex items-center justify-between'} href={makeLink(type, entityId)}>
          <div
            dangerouslySetInnerHTML={{ __html: snippet }}
            className={'text-base text-gray-800 [&_mark]:rounded [&_mark]:bg-blue-100 [&_mark]:p-1'}
          />
          <ResultType type={type} />
        </a>
      </div>
    </Combobox.Option>
  );
};

const Results = suspensify(({ query }: { query: string }) => {
  const t = useTranslation();

  const results = useValue('main-search/results', { query });
  const noResults = query && query.trim() !== '' && results?.length === 0;

  return (
    <>
      {results?.length > 0 && (
        <Combobox.Options
          className={'max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800'}>
          {results.map((result) => (
            <Result
              key={result['match/id']}
              entityId={result['entity/id']}
              id={result['match/id']}
              snippet={result['match/snippet']}
              type={result['entity/type']}
            />
          ))}
        </Combobox.Options>
      )}

      {noResults && (
        <p className={'p-4 text-sm text-gray-500'}>{t('common.phrase/empty-results')}</p>
      )}
    </>
  );
});

export const MainSearch = suspensify(() => {
  const t = useTranslation();

  const visible = useValue('main-search/visible');

  const [query, setQuery] = useState('main-search/query', 'main-search.query/set');

  const close = useDispatch('main-search/close');

  const onClose = useCallback(() => close({}), [close]);

  const onQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <Combobox>
          <div className={'relative w-full'}>
            <MagnifyingGlassSolid
              aria-hidden={'true'}
              className={'pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400'}
            />
            <Combobox.Input
              autoComplete={'off'}
              className={
                'h-12 w-[500px] border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0'
              }
              placeholder={t('main-search/placeholder')}
              value={query}
              onChange={onQueryChange}
            />
          </div>
          <Results query={query} suspenseLines={6} />
        </Combobox>
      </ModalPanel>
    </Modal>
  );
});

/*
TODO Unify with modal
 */
