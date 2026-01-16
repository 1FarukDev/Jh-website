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
  Row,
  Column,
  Link,
} from "@react-email/components";

type PaymentConfirmationEmailProps = {
  customerName: string;
  orderId: string;
  paymentAmount: string;
  paymentMethod?: string;
  transactionId: string;
  paymentDate: string;
};

export default function PaymentConfirmationEmail({
  customerName,
  orderId,
  paymentAmount,
  paymentMethod,
  transactionId,
  paymentDate,
}: PaymentConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Payment received for order #{orderId}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={successBadge}>
            <Text style={successIcon}>✓</Text>
          </Section>

          <Heading style={h1}>Payment Successful!</Heading>

          <Text style={text}>Hi {customerName},</Text>

          <Text style={text}>
            Your payment has been successfully processed. Thank you for your
            purchase!
          </Text>

          <Section style={paymentDetailsSection}>
            <Heading as="h2" style={h2}>
              Payment Details
            </Heading>

            <Row style={detailRow}>
              <Column style={detailLabel}>Order Number:</Column>
              <Column style={detailValue}>#{orderId}</Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabel}>Amount Paid:</Column>
              <Column style={detailValue}>${paymentAmount}</Column>
            </Row>

            {paymentMethod && (
              <Row style={detailRow}>
                <Column style={detailLabel}>Payment Method:</Column>
                <Column style={detailValue}>{paymentMethod}</Column>
              </Row>
            )}

            <Row style={detailRow}>
              <Column style={detailLabel}>Transaction ID:</Column>
              <Column style={detailValue}>{transactionId}</Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabel}>Date:</Column>
              <Column style={detailValue}>{paymentDate}</Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            Your order is now being processed and you'll receive a shipping
            confirmation soon.
          </Text>

          <Text style={footer}>
            <Link href="https://yourwebsite.com/orders" style={link}>
              View Order Status
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

const successBadge = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const successIcon = {
  fontSize: "48px",
  color: "#22c55e",
  fontWeight: "bold",
  margin: "0",
};

const h1 = {
  color: "#1C1B0B",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 20px",
  textAlign: "center" as const,
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

const paymentDetailsSection = {
  margin: "30px 0",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const detailRow = {
  margin: "12px 0",
};

const detailLabel = {
  fontSize: "14px",
  color: "#666",
  width: "50%",
};

const detailValue = {
  fontSize: "16px",
  color: "#1C1B0B",
  fontWeight: "500",
  width: "50%",
  textAlign: "right" as const,
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
