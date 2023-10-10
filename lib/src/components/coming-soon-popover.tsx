import { ComingSoon, type Status } from '@elements/components/coming-soon';
import { Dialog, DialogTrigger, Popover } from 'react-aria-components';
import type { ReactNode } from 'react';

export const WrapComingSoonPopover = ({
  id,
  status,
  children,
}: {
  id: string;
  status: Status;
  children: ReactNode;
}) => {
  return (
    <DialogTrigger>
      {children}
      <Popover>
        <Dialog
          className={
            'z-tooltip bg-white border border-300 shadow-lg p-3 rounded-lg focus:outline-none focus:ring-0'
          }>
          <ComingSoon id={id} status={status} />
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
