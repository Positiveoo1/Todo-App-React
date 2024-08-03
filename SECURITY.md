# Security Policy

## Supported Versions

I release patches for security vulnerabilities. The following table lists the versions that are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within this application, please follow these steps:

1. **Do not** open an issue publicly on GitHub. Security vulnerabilities should be reported privately to prevent potential abuse.

2. Contact us directly via email at ludlowbecker@gmail.com with the details of the vulnerability.

3. Include as much information as possible to help us understand and resolve the issue:
    - A description of the vulnerability and its impact
    - Steps to reproduce the vulnerability
    - Any proof-of-concept code or screenshots that demonstrate the vulnerability
    - Your recommendations on how to mitigate or fix the vulnerability

We take all security vulnerabilities seriously and will acknowledge your email within 48 hours. After the initial acknowledgement, we will work to understand and fix the issue as quickly as possible. 

## Security Best Practices

To help maintain the security of this application, we recommend the following best practices:

1. **Authentication**: Ensure strong password policies are enforced. Use two-factor authentication (2FA) for additional security.
2. **Data Protection**: Encrypt sensitive data both in transit and at rest.
3. **Dependency Management**: Regularly update your dependencies to the latest versions to patch any known vulnerabilities.
4. **Access Control**: Use role-based access control (RBAC) to limit user permissions based on their roles.
5. **Input Validation**: Validate all user inputs to prevent common security issues such as SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).
6. **Monitoring and Logging**: Implement comprehensive logging and monitoring to detect and respond to security incidents.

## Code of Conduct

We expect all contributors to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md). Please report any behavior that does not align with this code.

Thank you for helping us keep our application secure!
