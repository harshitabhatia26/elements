import { QrCodeOutline } from '@elements/icons';
import type { ButtonProps } from '@elements/components/button';
import { Button } from '@elements/components/button';
import { memo } from 'react';

type QRCodeButtonProps = Omit<ButtonProps, 'value' | 'Icon'>;

export const QRCodeButton = memo(({ clicked, ...props }: QRCodeButtonProps) => {
  return (
    <Button
      {...props}
      Icon={QrCodeOutline}
      clicked={clicked}
      iconClassName={'stroke-2'}
      value={'QR Code'}
    />
  );
});
