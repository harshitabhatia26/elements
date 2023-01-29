import { SocialSignIn } from '@elements/compositions/sign-in/social-sign-in';

export default {
  title: 'Compositions/SignIn/SocialSignIn',
  component: SocialSignIn,
};

export function Main() {
  return (
    <SocialSignIn
      show={true}
      titleText={'Sign in'}
      onClose={() => {}}
      onGoogleClick={console.log}
    />
  );
}
