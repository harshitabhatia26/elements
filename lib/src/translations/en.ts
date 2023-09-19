export default {
  'common/outcome': 'Outcome',
  'common/email': 'Email',
  'common/phone': 'Phone',
  'common/issue': 'Issue',
  'common/issues': 'Issues',
  'common/action': 'Action',
  'common/actions': 'Actions',
  'common/create': 'Create',
  'common/sign-in': 'Sign in',
  'common/sign-out': 'Sign out',
  'common/edit': 'Edit',
  'common/save': 'Save',
  'common/cancel': 'Cancel',
  'common/done': 'Done',
  'common/add': 'Add',
  'common/okay': 'Okay',
  'action/promised-outcome': 'Promised Outcome',
  'common/description': 'Description',
  'common/home': 'Home',
  'common/post': 'Post',
  'common/discuss': 'Discuss',
  'common/reply': 'Reply',
  'common/update': 'Update',
  'common/updates': 'Updates',
  'common/you': 'You',
  'common/delete': 'Delete',
  'common/media': 'Media',
  'common/locations': 'Locations',
  'common/full-name': 'Full Name',
  'common/user': 'User',
  'relation/resolves': 'Resolves',
  'relation/partially-resolves': 'Partially Resolves',
  'relation/relates': 'Relates To',
  'auth/send-otp': 'Send OTP',
  'auth/sign-in': 'Sign In',
  'auth/wait-to-resend-otp': ({ waitSeconds }: { waitSeconds: number }) => {
    const secondsText = waitSeconds === 1 ? 'second' : 'seconds';
    return `You can resend OTP in ${waitSeconds} ${secondsText}.`;
  },
  'auth/verify-otp': 'Verify OTP',
  'auth/resend-otp': 'Resend OTP',
  'auth/enter-otp': 'Enter OTP',
  'auth/invalid-otp': 'Incorrect OTP, please try again.',
  'auth.verify-otp/success': 'OTP successfully verified.',
  'auth/sign-in-with-google': 'Sign in with Google',
  'comment/placeholder': 'What do you think?',
  'main-search/placeholder': 'Search',
  'common.phrase/empty-results': 'No results found.',
  'update.delete.modal/title': 'Delete Update',
  'update.delete.modal/body': 'Are you sure you want to delete the Update? This cannot be undone.',
  'comment.delete.modal/title': 'Delete Comment',
  'comment.delete.modal/body':
    'Are you sure you want to delete the Comment? This cannot be undone.',
  'comment/deleted': 'Comment was deleted.',
  'issue/expected-resolution': 'Expected Resolution',
  'common/relationships': 'Relationships',
  'relationships/empty': 'No relationships yet.',
  'locations/confirm': 'Confirm Location',
  'issue.location.slide-over/location-list': 'Locations',
  'percentage/complete': 'Complete',
  'common/severity': 'Severity',
  'action.title/placeholder': 'Give the action a title.',
  'action.description/placeholder': 'Describe the action.',
  'action.outcome/placeholder': 'Describe the outcome.',
  'action.description/empty':
    "You haven't added a description yet. Describe what the action is all about.",
  'action.outcome/empty':
    "You haven't added an outcome yet. Describe what promise to fulfill with this action.",
  'text.draft/create': 'Create Draft',
  'issue.title/placeholder': 'Give the issue a title.',
  'issue.description/placeholder': 'Describe the issue.',
  'issue.resolution/placeholder': 'Describe the resolution.',
  'issue.description/empty':
    "You haven't added a description yet. Describe what the issue is all about.",
  'issue.resolution/empty':
    "You haven't added a resolution yet. Describe what an ideal resolution for this issue should be.",
  'registration.full-name/placeholder': 'Please enter your full name.',
  'issue.severity/label': ({ avgScore, userScore, votes }: any) => {
    const userScoreText = userScore
      ? `You voted <span class="user-score">${userScore}</span>`
      : "You haven't voted yet";
    return votes === 0
      ? 'No one has voted yet.'
      : `Severity <span class="avg-score">${avgScore}</span> from <span class="votes">${votes}</span> votes. ${userScoreText}.`;
  },
  'choose-locality/add': 'Choose your Locality',
  'choose-locality/update': 'Update your Locality',
  'action.locality/add': 'Choose Action Locality',
  'action.locality/update': 'Update Action Locality',
  'issue.locality/add': 'Choose Issue Locality',
  'issue.locality/update': 'Update Issue Locality',
};
