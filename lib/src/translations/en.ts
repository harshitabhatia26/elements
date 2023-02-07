export default {
  'common/outcome': 'Outcome',
  'common/email': 'Email',
  'common/phone': 'Phone',
  'auth/send-otp': 'Send OTP',
  'auth/sign-in': 'Sign In',
  'auth/wait-to-resend-otp': ({ waitSeconds }: { waitSeconds: number }) => {
    const secondsText = waitSeconds === 1 ? 'second' : 'seconds';
    return `You can resend OTP in ${waitSeconds} ${secondsText}.`;
  },
  'auth/resend-otp': 'Resend OTP',
  'auth/enter-otp': 'Enter OTP',
  'auth/invalid-otp': 'Incorrect OTP, please try again.',
};
