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

type ConsultationEmailProps = {
  name: string;
  email: string;
  message: string;
};

export default function ConsultationEmail({
  name,
  email,
  message,
}: ConsultationEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @media (prefers-color-scheme: dark) {
            .light-logo { display: none !important; }
            .dark-logo { display: block !important; }
          }
          @media (prefers-color-scheme: light) {
            .light-logo { display: block !important; }
            .dark-logo { display: none !important; }
          }
        `}</style>
      </Head>
      <Preview>Consultation request received - J.H. Textiles</Preview>

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
                style={{ ...logo, display: "none" }}
              />
            </Link>
          </Section>
          <Heading style={h1}>Consultation Request Received! 📋</Heading>

          <Text style={text}>Hi {name},</Text>

          <Text style={text}>
            Thank you for your interest in working with J.H. Textiles! We've
            received your consultation request and are excited to learn about
            your project.
          </Text>

          <Section style={detailsSection}>
            <Heading as="h2" style={h2}>
              Your Request Details:
            </Heading>

            <Text style={detailText}>
              <strong>Email:</strong> {email}
            </Text>

            <Text style={messageText}>
              <strong>Message:</strong>
              <br />
              {message}
            </Text>
          </Section>

          <Text style={text}>
            Our team will review your request and reach out within 1-2 business
            days to schedule your consultation and discuss your vision.
          </Text>

          <Hr style={hr} />

          <Section style={tipsSection}>
            <Heading as="h3" style={h3}>
              💡 Preparing for Your Consultation:
            </Heading>
            <Text style={tipText}>
              • Gather inspiration images, mood boards, or examples
            </Text>
            <Text style={tipText}>
              • Think about your target market and brand aesthetic
            </Text>
            <Text style={tipText}>
              • Consider color preferences and any technical requirements
            </Text>
            <Text style={tipText}>• Define your budget and timeline</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            In the meantime, feel free to explore{" "}
            <Link href="https://yourwebsite.com/shop" style={link}>
              our portfolio
            </Link>{" "}
            or check out{" "}
            <Link href="https://yourwebsite.com/about" style={link}>
              our services
            </Link>
            .
          </Text>

          <Text style={footer}>
            Questions? Email us at{" "}
            <Link href="mailto:jhtextiles@icloud.com" style={link}>
              jhtextiles@icloud.com
            </Link>
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
  marginBottom: "24px",
};

const logo = {
  margin: "0 auto",
  display: "block",
};

const h2 = {
  color: "#1C1B0B",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 15px",
};

const h3 = {
  color: "#1C1B0B",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 12px",
};

const text = {
  color: "#4E5157",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const detailsSection = {
  margin: "30px 0",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const detailText = {
  color: "#1C1B0B",
  fontSize: "15px",
  margin: "8px 0",
};

const messageText = {
  color: "#4E5157",
  fontSize: "15px",
  lineHeight: "22px",
  margin: "15px 0 0",
  whiteSpace: "pre-wrap" as const,
};

const tipsSection = {
  margin: "25px 0",
  padding: "20px",
  backgroundColor: "#fffbeb",
  borderRadius: "8px",
  borderLeft: "4px solid #f59e0b",
};

const tipText = {
  color: "#78350f",
  fontSize: "14px",
  margin: "8px 0",
  paddingLeft: "10px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "30px 0",
};

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "8px 0",
  textAlign: "center" as const,
};

const link = {
  color: "#1C1B0B",
  textDecoration: "underline",
};
