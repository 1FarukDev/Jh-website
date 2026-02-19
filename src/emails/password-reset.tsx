import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Button,
  Hr,
  Link,
  Img,
} from "@react-email/components";

type PasswordResetEmailProps = {
  firstName: string;
  resetLink: string;
};

export default function PasswordResetEmail({
  firstName,
  resetLink,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head>
       <style>{`
  .light-logo { display: block !important; }
  .dark-logo { display: none !important; }

  @media (prefers-color-scheme: dark) {
    .light-logo { display: none !important; }
    .dark-logo { display: block !important; }
  }
`}</style>
      </Head>
      <Preview>Reset your J.H. Textiles password</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Link href="https://jesudarahinmikaiye.com">
              {/* Light Mode Logo (Dark text on light background) */}
              <Img
                src="https://res.cloudinary.com/dzspn2gi7/image/upload/v1768515835/PNG_f5mj7o.png"
                width="100"
                alt="J.H Textiles"
                className="light-logo"
                style={logo}
              />
              {/* Dark Mode Logo (White text) - Upload your white logo to Cloudinary */}
              <Img
                src="https://res.cloudinary.com/dzspn2gi7/image/upload/v1768681123/Asset_1_10x_vcfotp.png"
                width="100"
                alt="J.H Textiles"
                className="dark-logo"
                style={logo}
              />
            </Link>
          </Section>
          <Heading style={h1}>Password Reset Request</Heading>

          <Text style={text}>Hi {firstName},</Text>

          <Text style={text}>
            We received a request to reset your password for your J.H. Textiles
            account. Click the button below to create a new password:
          </Text>

          <Section style={buttonSection}>
            <Button style={button} href={resetLink}>
              Reset Password
            </Button>
          </Section>

          <Text style={text}>
            This link will expire in 24 hours for security reasons.
          </Text>

          <Hr style={hr} />

          <Text style={warningText}>
            If you didn't request this password reset, please ignore this email
            or contact support if you have concerns.
          </Text>

          <Text style={footer}>
            For security reasons, never share this email or link with anyone.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const h1 = {
  color: "#1C1B0B",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 20px",
};
const logoSection = {
  textAlign: "center" as const,
  marginBottom: "30px",
};

const logo = {
  margin: "0 auto",
  display: "block",
};

const text = {
  color: "#4E5157",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const buttonSection = {
  margin: "30px 0",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#1C1B0B",
  borderRadius: "0",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "500",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 40px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "30px 0",
};

const warningText = {
  color: "#d9534f",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "16px 0",
  padding: "12px",
  backgroundColor: "#fcf8e3",
  borderRadius: "4px",
};

const footer = {
  color: "#666",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "8px 0",
  textAlign: "center" as const,
};
