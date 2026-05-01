import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
  Link,
  Img,
} from "@react-email/components";

type ContactReceiptEmailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactReceiptEmail({
  name,
  email,
  subject,
  message,
}: ContactReceiptEmailProps) {
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
      <Preview>We received your message - J.H. Textiles</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Link href="https://jesudarahinmikaiye.com">
              {/* Light Mode Logo (Dark text on light background) */}
              <Img
                src="https://res.cloudinary.com/dzspn2gi7/image/upload/v1777624437/JH_TEXTILES-COLOR_EMAIL_l2dm0p.jpg"
                width="100"
                alt="J.H Textiles"
                className="light-logo"
                style={logo}
              />
              {/* Dark Mode Logo (White text) - Upload your white logo to Cloudinary */}
              <Img
                src="https://res.cloudinary.com/dzspn2gi7/image/upload/v1777624437/JH_TEXTILES-COLOR_EMAIL_l2dm0p.jpg"
                width="100"
                alt="J.H Textiles"
                className="dark-logo"
                style={logo}
              />
            </Link>
          </Section>
          <Heading style={h1}>Thank You for Contacting Us!</Heading>

          <Text style={text}>Hi {name},</Text>

          <Text style={text}>
            We've received your message and will get back to you within 24-48
            hours.
          </Text>

          <Section style={messageSection}>
            <Heading as="h2" style={h2}>
              Your Message:
            </Heading>

            <Text style={messageSubject}>
              <strong>Subject:</strong> {subject}
            </Text>

            <Text style={messageBody}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            In the meantime, feel free to explore our collection of textile
            prints or learn more about our custom design services.
          </Text>

          <Text style={footer}>
            This is an automated confirmation. Please do not reply to this
            email.
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

const h2 = {
  color: "#1C1B0B",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 15px",
};

const text = {
  color: "#4E5157",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const messageSection = {
  margin: "30px 0",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const logo = {
  margin: "0 auto",
  display: "block",
};

const messageSubject = {
  color: "#1C1B0B",
  fontSize: "16px",
  margin: "0 0 15px",
};

const messageBody = {
  color: "#4E5157",
  fontSize: "15px",
  lineHeight: "22px",
  whiteSpace: "pre-wrap" as const,
  padding: "15px",
  backgroundColor: "#ffffff",
  borderRadius: "4px",
  border: "1px solid #e6ebf1",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "30px 0",
};

const footer = {
  color: "#666",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "8px 0",
  textAlign: "center" as const,
};
