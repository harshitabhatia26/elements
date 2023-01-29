import { Modal } from '@elements/components/modal';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export function Examples() {
  return (
    <div className={'flex-column flex gap-10'}>
      <Modal show={true} title={'Sign in'}>
        <div className={'w-56'}>{'Whatever'}</div>
      </Modal>
    </div>
  );
}
