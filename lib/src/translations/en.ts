import isNil from 'lodash/isNil';

const common = {
  'common/action': 'Action',
  'common/actions': 'Actions',
  'common/add': 'Add',
  'common/cancel': 'Cancel',
  'common/create': 'Create',
  'common/delete': 'Delete',
  'common/remove': 'Remove',
  'common/description': 'Description',
  'common/discuss': 'Discuss',
  'common/done': 'Done',
  'common/email': 'Email',
  'common/edit': 'Edit',
  'common/outcome': 'Outcome',
  'common/phone': 'Phone',
  'common/issue': 'Issue',
  'common/issues': 'Issues',
  'common/sign-in': 'Sign in',
  'common/sign-out': 'Sign out',
  'common/save': 'Save',
  'common/okay': 'Okay',
  'common/home': 'Home',
  'common/post': 'Post',
  'common/reply': 'Reply',
  'common/update': 'Update',
  'common/updates': 'Updates',
  'common/you': 'You',
  'common/media': 'Media',
  'common/locations': 'Locations',
  'common/spots': 'Spots',
  'common/name': 'Name',
  'common/user': 'User',
  'common/relationships': 'Relationships',
  'common/severity': 'Severity',
  'common/verify': 'Verify',
  'common/otp': 'OTP',
  'common/initiative': 'Initiative',
  'common.phrase/empty-results': 'No results found.',
  'common.user.name/placeholder': 'Enter your name.',
  'common/whatsapp': 'WhatsApp',
  'common/telegram': 'Telegram',
  'common/welcome-to-aktopia': 'Welcome to Aktopia',
  'common/boost': 'Boost',
  'common/suppress': 'Suppress',
};

const action = {
  'action.description/empty':
    "You haven't added a description yet. Describe what the action is all about.",
  'action.description/placeholder': 'Describe the action.',
  'action.locality/add': 'Choose action locality',
  'action.locality/update': 'Update action locality',
  'action.locality/description': 'The center at which the action will be taking place.',
  'action/locality': 'Action locality',
  'action.outcome/empty':
    "You haven't added an outcome yet. Describe what promise to fulfill with this action.",
  'action.outcome/placeholder': 'Describe the outcome.',
  'action.title/placeholder': 'Give the action a title.',
  'action/promised-outcome': 'Promised Outcome',
  'action.delete.modal/title': 'Delete Action',
  'action.delete.modal/body': 'Are you sure you want to delete the action? This cannot be undone.',
  'action.status/draft': 'Draft',
  'action.status/active': 'Active',
  'action.status/reviewing': 'In Review',
  'action.status/completed': 'Completed',
  'action.updates/unavailable': 'Updates are not available when the action is still in draft.',
  'action.discussion/unavailable': 'Discussion is not available when the action is still in draft.',
};

const issue = {
  'issue.title/placeholder': 'Give the issue a title.',
  'issue.description/placeholder': 'Describe the issue.',
  'issue.resolution/placeholder': 'Describe the resolution.',
  'issue.description/empty':
    "You haven't added a description yet. Describe what the issue is all about.",
  'issue.resolution/empty':
    "You haven't added a resolution yet. Describe what an ideal resolution for this issue should be.",
  'issue/expected-resolution': 'Expected Resolution',
  'issue.spots.slide-over/list': 'Issue Spots',
  'issue.spots.slide-over/empty': 'No spots have been added yet.',
  'issue.locality/add': 'Choose issue locality',
  'issue.locality/update': 'Update issue locality',
  'issue.locality/description': 'The locality around which the issue is centered.',
  'issue/locality': 'Issue locality',
  'issue.severity/label': ({ avgScore, userScore, votes }: any) => {
    const oneVote = votes === 1 || votes === '1';
    const userScoreText = userScore
      ? `You voted <span class="user-score">${userScore}</span>`
      : "You haven't voted yet";

    return isNil(avgScore)
      ? 'No one has voted yet.'
      : `Severity <span class="avg-score">${avgScore}</span> from <span class="votes">${votes}</span> ${
          oneVote ? 'vote' : 'votes'
        }. ${userScoreText}.`;
  },
  'issue/severity': 'Severity',
  'issue/facing': 'Facing',
  'issue.facing.tooltip/text': "Raise hand if you're directly affected by this issue.",
  'issue.media/description': 'Images related to the issue.',
  'issue.image.delete.modal/title': 'Delete Image',
  'issue.image.delete.modal/body':
    'Are you sure you want to delete the image? This cannot be undone.',
};

const update = {
  'update.delete.modal/title': 'Delete Update',
  'update.delete.modal/body': 'Are you sure you want to delete the update? This cannot be undone.',
};

const relationship = {
  'relation/resolves': 'Resolves',
  'relation/partially-resolves': 'Partially Resolves',
  'relation/relates': 'Relates To',
  'relationship.delete.modal/title': 'Delete Relationship',
  'relationship.delete.modal/body':
    'Are you sure you want to delete the relationship? This cannot be undone.',
};

const location = {
  'location.delete.modal/title': 'Delete Location',
  'location.delete.modal/body':
    'Are you sure you want to delete the location? This cannot be undone.',
};

const comment = {
  'comment.delete.modal/title': 'Delete Comment',
  'comment.delete.modal/body':
    'Are you sure you want to delete the comment? This cannot be undone.',
  'comment/deleted': 'Comment was deleted.',
};

const error = {
  'error/not-found': 'Not Found',
  'error.not-found/message': "Sorry, we couldn't find what you were looking for.",
};

const metaInitiative = {
  'meta.initiative.title/placeholder': 'Give the initiative a title.',
  'meta.initiative.description/placeholder': 'Describe the initiative.',
  'meta.initiative.description/empty': "You haven't added a description yet.",
  'meta.initiative.status/evaluating': 'Evaluating',
  'meta.initiative.status/in-progress': 'In progress',
  'meta.initiative.status/planning': 'Planning',
  'meta.initiative.status/planned': 'Planned',
};

const profile = {
  'profile.actions/empty': 'No actions yet.',
  'profile.issues/empty': 'No issues yet.',
};

const mediaGallery = {
  'media-gallery.drag-and-drop/hint': 'You can drag and drop your image here to add.',
};

const translation = {
  ...common,
  ...action,
  ...issue,
  ...update,
  ...relationship,
  ...location,
  ...comment,
  ...error,
  ...metaInitiative,
  ...profile,
  ...mediaGallery,
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
  'auth.sign-in.modal/sign-in-or-up': 'Sign in or create an account.',
  'auth.verify-otp.modal/otp-sent': 'OTP has been sent to',
  'comment/placeholder': 'What do you think?',
  'main-search/placeholder': 'Search',
  'relationships/empty': 'No relationships yet.',
  'locations/confirm': 'Confirm Location',
  'percentage/complete': 'Complete',
  'percentage/funded': 'Funded',
  'text.draft/create': 'Create Draft',
  'registration.full-name/placeholder': 'Please enter your full name.',
  'choose-locality/add': 'Choose your locality',
  'choose-locality/update': 'Update your locality',
  'choose-locality/description': 'Your experience will be streamlined to your chosen locality.',
};

type Action = typeof action;
type Common = typeof common;
type Misc = typeof translation;

export type Translation = Action & Common & Misc;
export default translation;
