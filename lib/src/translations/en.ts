export default {
  'common/outcome': 'Outcome',
  'common/email': 'Email',
  'common/phone': 'Phone',
  'common/issue': 'Issue',
  'common/action': 'Action',
  'common/create': 'Create',
  'common/sign-in': 'Sign in',
  'common/sign-out': 'Sign out',
  'common/edit': 'Edit',
  'common/save': 'Save',
  'common/cancel': 'Cancel',
  'relation/resolves': 'Resolves',
  'relation/partially-resolves': 'Partially Resolves',
  'relation/relates': 'Relates To',
  'auth/send-otp': 'Send OTP',
  'auth/sign-in': 'Sign In',
  'auth/wait-to-resend-otp': ({ waitSeconds }: { waitSeconds: number }) => {
    const secondsText = waitSeconds === 1 ? 'second' : 'seconds';
    return `You can resend OTP in ${waitSeconds} ${secondsText}.`;
  },
  'auth/resend-otp': 'Resend OTP',
  'auth/enter-otp': 'Enter OTP',
  'auth/invalid-otp': 'Incorrect OTP, please try again.',
  'auth.verify-otp/success': 'OTP successfully verified.',
  'auth/sign-in-with-google': 'Sign in with Google',
};
