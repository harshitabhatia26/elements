import { Modal } from '@elements/components/modal';
import { NamedSwitch } from '@elements/components/named-switch';
import { Button } from '@elements/components/button';
import React, { useCallback, useState } from 'react';

const loginOpts = [
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
];

interface ISignIn {
  onSendPhoneOtp: Function;
  onSendEmailOtp: Function;
  onClose: Function;
  show: boolean;
  titleText: string;
  sendOtpText: string;
}

export const SignIn = ({
  onSendPhoneOtp,
  onSendEmailOtp,
  onClose,
  show,
  titleText,
  sendOtpText,
}: ISignIn) => {
  const [activeSwitch, setActiveSwitch] = useState('phone');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const onSendOtp = useCallback(() => {
    activeSwitch == 'phone' ? onSendPhoneOtp(phone) : onSendEmailOtp(email);
  }, [activeSwitch, phone, email]);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      activeSwitch == 'phone' ? setPhone(e.target.value) : setEmail(e.target.value);
    },
    [activeSwitch]
  );

  const onModalClose = useCallback(() => {
    setPhone('');
    setEmail('');
    onClose();
  }, []);

  const inputValue = activeSwitch == 'phone' ? phone : email;

  return (
    <Modal title={titleText} onClose={onModalClose} show={show}>
      <div className={'flex flex-col gap-5'}>
        <NamedSwitch
          options={loginOpts}
          variant={{ size: 'sm' }}
          activeSwitch={activeSwitch}
          onSwitchClick={setActiveSwitch}
        />
        <input
          value={inputValue}
          type={'text'}
          onChange={onInputChange}
          className={
            'h-max w-[360px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-xl font-medium text-gray-600 shadow-inner'
          }
        />
        <div className={'flex w-full justify-center'}>
          <Button
            onClick={onSendOtp}
            value={sendOtpText}
            variant={{ size: 'sm', type: 'primary' }}
          />
        </div>
      </div>
    </Modal>
  );
};

/*
Mobile responsive
Phone validations
Email validation
Send Otp disabled until valid phone or email
Error messages
Phone Input component
Email Input component
Translations
Pass option labels and props
OutsideClick close
*/
