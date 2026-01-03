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
  } from "@react-email/components";
  
  type WelcomeEmailProps = {
    firstName: string;
    email: string;
  };
  
  export default function WelcomeEmail({ firstName, email }: WelcomeEmailProps) {
    return (
      <Html>
        <Head />
        <Preview>Welcome to J.H. Textiles - Your Creative Journey Begins</Preview>
  
        <Body style={main}>
          <Container style={container}>
            <Heading style={h1}>Welcome to J.H. Textiles! 🎨</Heading>
  
            <Text style={text}>Hi {firstName},</Text>
  
            <Text style={text}>
              Thank you for joining J.H. Textiles! We're excited to have you as
              part of our community of textile print enthusiasts.
            </Text>
  
            <Text style={text}>
              We specialize in custom surface pattern design, textile prints, and
              print development. Whether you're looking for exclusive designs or
              ready-to-use prints, we're here to bring your creative vision to
              life.
            </Text>
  
            <Section style={benefitsSection}>
              <Heading as="h2" style={h2}>
                What You Can Do:
              </Heading>
              <Text style={bulletText}>
                ✓ Browse our curated collection of textile prints
              </Text>
              <Text style={bulletText}>
                ✓ Commission custom designs tailored to your brand
              </Text>
              <Text style={bulletText}>
                ✓ License exclusive or non-exclusive prints
              </Text>
              <Text style={bulletText}>
                ✓ Request color variations and print development services
              </Text>
            </Section>
  
            <Section style={buttonSection}>
              <Button style={button} href="https://yourwebsite.com/shop">
                Explore Our Prints
              </Button>
            </Section>
  
            <Hr style={hr} />
  
            <Text style={footer}>
              Need help getting started?{" "}
              <Link href="https://yourwebsite.com/contact" style={link}>
                Contact us
              </Link>{" "}
              or{" "}
              <Link href="https://yourwebsite.com/about" style={link}>
                book a consultation
              </Link>
              .
            </Text>
  
            <Text style={footer}>
              Email: {email}
              <br />
              <Link href="mailto:jhtextiles@icloud.com" style={link}>
                jhtextiles@icloud.com
              </Link>
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
  
  // Styles (reuse similar styles from above with modifications)
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
    fontSize: "14px",
    lineHeight: "24px",
    margin: "8px 0",
    textAlign: "center" as const,
  };
  
  const link = {
    color: "#1C1B0B",
    textDecoration: "underline",
  };