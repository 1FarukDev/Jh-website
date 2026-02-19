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
  Button,
  Link,
  Img,
} from "@react-email/components";

type NewsletterWelcomeEmailProps = {
  firstName?: string;
  email: string;
};

export default function NewsletterWelcomeEmail({
  firstName,
  email,
}: NewsletterWelcomeEmailProps) {
  const greeting = firstName ? `Hi ${firstName}` : "Hello";

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
      <Preview>Welcome to J.H. Textiles Newsletter!</Preview>

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
          <Heading style={h1}>Welcome to Our Community! 🎉</Heading>

          <Text style={text}>{greeting},</Text>

          <Text style={text}>
            Thank you for subscribing to J.H. Textiles newsletter! You're now
            part of our creative community.
          </Text>

          <Section style={benefitsSection}>
            <Heading as="h2" style={h2}>
              What to Expect:
            </Heading>
            <Text style={bulletText}>
              ✨ Exclusive access to new print collections
            </Text>
            <Text style={bulletText}>🎨 Behind-the-scenes design insights</Text>
            <Text style={bulletText}>
              💰 Special offers and early-bird discounts
            </Text>
            <Text style={bulletText}>
              📚 Tips on textile design and print usage
            </Text>
            <Text style={bulletText}>🌟 Industry trends and inspiration</Text>
          </Section>

          <Section style={buttonSection}>
            <Button style={button} href="https://jesudarahinmikaiye.com/shop">
              Explore Latest Prints
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            You're receiving this because you subscribed to J.H. Textiles
            newsletter with {email}.
          </Text>

          {/* <Text style={footer}>
            <Link href="https://jesudarahinmikaiye.com/unsubscribe" style={link}>
              Unsubscribe
            </Link>{" "}
            |{" "}
            <Link href="https://jesudarahinmikaiye.com/preferences" style={link}>
              Update Preferences
            </Link>
          </Text> */}
        </Container>
      </Body>
    </Html>
  );
}

// Styles (similar to welcome email)
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
  textAlign: "center" as const,
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
  margin: "20px 0 15px",
};

const text = {
  color: "#4E5157",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const benefitsSection = {
  margin: "30px 0",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const bulletText = {
  color: "#1C1B0B",
  fontSize: "16px",
  lineHeight: "28px",
  margin: "8px 0",
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

const footer = {
  color: "#666",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "8px 0",
  textAlign: "center" as const,
};

const link = {
  color: "#1C1B0B",
  textDecoration: "underline",
};
