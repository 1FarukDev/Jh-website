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
  Img,
  Link,
} from "@react-email/components";

type OrderStatusEmailProps = {
  customerName: string;
  orderId: string;
  status: "processing" | "shipped" | "delivered";
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
};

const statusConfig = {
  processing: {
    icon: "📦",
    title: "Your Order is Being Processed",
    message:
      "We're carefully preparing your order and it will be shipped soon.",
  },
  shipped: {
    icon: "🚚",
    title: "Your Order Has Been Shipped!",
    message: "Your order is on its way and will arrive soon.",
  },
  delivered: {
    icon: "✅",
    title: "Your Order Has Been Delivered!",
    message: "We hope you love your new textile prints!",
  },
};

export default function OrderStatusEmail({
  customerName,
  orderId,
  status,
  trackingNumber,
  trackingUrl,
  estimatedDelivery,
}: OrderStatusEmailProps) {
  const config = statusConfig[status];

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
      <Preview>
        Order #{orderId} update: {config.title}
      </Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Logo Section with Dark Mode Support */}
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

          <Section style={iconSection}>
            <Text style={icon}>{config.icon}</Text>
          </Section>

          <Heading style={h1}>{config.title}</Heading>

          <Text style={text}>Hi {customerName},</Text>

          <Text style={text}>
            Great news about your order <strong>{orderId}</strong>!
          </Text>

          <Text style={text}>{config.message}</Text>

          {trackingNumber && (
            <Section style={trackingSection}>
              <Text style={trackingLabel}>Tracking Number:</Text>
              <Text style={trackingNumberStyle}>{trackingNumber}</Text>

              {trackingUrl && (
                <Section style={buttonSection}>
                  <Button style={button} href={trackingUrl}>
                    Track Your Package
                  </Button>
                </Section>
              )}
            </Section>
          )}

          {estimatedDelivery && (
            <Section style={estimatedSection}>
              <Text style={text}>
                <strong>Estimated Delivery:</strong> {estimatedDelivery}
              </Text>
            </Section>
          )}

          <Hr style={hr} />

          <Text style={footer}>
            Questions? Contact us at{" "}
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

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "30px",
};

const logo = {
  margin: "0 auto",
  display: "block",
};

const iconSection = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const icon = {
  fontSize: "64px",
  margin: "0",
};

const h1 = {
  color: "#1C1B0B",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const text = {
  color: "#4E5157",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const trackingSection = {
  margin: "30px 0",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  textAlign: "center" as const,
};

const trackingLabel = {
  fontSize: "14px",
  color: "#666",
  margin: "0 0 8px",
};

const trackingNumberStyle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#1C1B0B",
  margin: "0",
  fontFamily: "monospace",
};

const buttonSection = {
  margin: "20px 0 0",
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

const estimatedSection = {
  margin: "20px 0",
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "30px 0",
};

const link = {
  color: "#8A8635",
  textDecoration: "underline",
};

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "8px 0",
  textAlign: "center" as const,
};