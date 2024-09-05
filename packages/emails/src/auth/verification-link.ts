import Email from '../Email';

type Props = {
  verificationUrl: string;
  cta?: string;
};

export class VerificationLinkEmail extends Email {
  subject = 'Your verification link';

  constructor(to: string, data: Props) {
    super(to, 'verification-link', {
      ...data,
      title: 'Your verification link',
      message: 'Click the button below to verify your account.'
    });
  }
}
