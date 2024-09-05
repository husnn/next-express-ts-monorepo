import Email from "./Email";
import sgMail from '@sendgrid/mail';
import config from "./config";

export class EmailClient {
  private static instance: EmailClient;

  private constructor() {
    sgMail.setApiKey(config.sendgrid.apiKey);
  }

  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new EmailClient();
    return this.instance;
  }

  async send(email: Email) {
    try {
      await sgMail.send({
        to: email.to,
        from: config.from,
        subject: email.subject,
        html: email.build()
      })
    } catch (err) {
      throw err;
    }
  }
}

export default EmailClient;
