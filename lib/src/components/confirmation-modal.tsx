import { CheckSolid, ExclamationTriangleOutline } from '@elements/_icons';
import { Button } from '@elements/components/button';
import { Modal, ModalTitle } from '@elements/components/modal';
import { memo } from 'react';

const IconBadge = ({ kind }: { kind: any }) => {
  let component;
  switch (kind) {
    case 'danger':
      component = (
        <div
          className={'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100'}>
          <ExclamationTriangleOutline aria-hidden={'true'} className={'h-6 w-6 text-red-600'} />
        </div>
      );
      break;
    default:
      component = (
        <div
          className={
            'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'
          }>
          <CheckSolid aria-hidden={'true'} className={'h-6 w-6 text-green-600'} />
        </div>
      );
      break;
  }
  return component;
};

export const ConfirmationModal = memo(
  ({ titleText, bodyText, visible, onClose, confirmText, onConfirm, kind, cancelText }: any) => {
    return (
      <Modal visible={visible} onClose={onClose}>
        <div className={'flex w-full flex-col items-center justify-center gap-6'}>
          <div>
            <IconBadge kind={kind} />
            <div className={'mt-3 text-center sm:mt-5'}>
              <ModalTitle as={'h3'} className={'text-base font-semibold leading-6 text-gray-900'}>
                {titleText}
              </ModalTitle>
              <div className={'mt-2'}>
                <p className={'text-sm text-gray-500'}>{bodyText}</p>
              </div>
            </div>
          </div>
          <div className={'flex gap-6'}>
            <Button kind={'tertiary'} size={'sm'} value={cancelText} onClick={onClose} />
            <Button kind={kind} size={'sm'} value={confirmText} onClick={onConfirm} />
          </div>
        </div>
      </Modal>
    );
  }
);
