export class EmailService {
  // Implementation of the interface properties
  constructor() {}

  // Implementation of the interface methods
  async send(to: string, subject: string, body: string): Promise<void> {
    // Implementation
    console.log(
      `Sending email to ${to} with subject: ${subject} and body: ${body}`
    );
  }
}
