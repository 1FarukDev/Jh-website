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
  Img,
  Link,
} from "@react-email/components";

type OrderItem = {
  name: string;
  quantity: number;
  /** Pre-formatted line total in the customer's checkout currency */
  lineTotal: string;
  image?: string;
  color?: string;
  size?: string;
};

type OrderConfirmationEmailProps = {
  customerName: string;
  orderId: string;
  orderDate: string;
  /** Pre-formatted order total in the customer's checkout currency */
  total: string;
  items: OrderItem[];
  shippingAddress?: string;
};

export default function OrderConfirmationEmail({
  customerName,
  orderId,
  orderDate,
  total,
  items,
  shippingAddress,
}: OrderConfirmationEmailProps) {
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
      <Preview>Your J.H. Textiles order {orderId} is confirmed</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Link href="https://jesudarahinmikaiye.com">
              <Img
                src="https://res.cloudinary.com/dzspn2gi7/image/upload/v1777624437/JH_TEXTILES-COLOR_EMAIL_l2dm0p.jpg"
                width="100"
                alt="J.H Textiles"
                className="light-logo"
                style={logo}
              />

              <Img
                src="https://res.cloudinary.com/dzspn2gi7/image/upload/v1777624437/JH_TEXTILES-COLOR_EMAIL_l2dm0p.jpg"
                width="100"
                alt="J.H Textiles"
                className="dark-logo"
                style={logo}
              />
            </Link>
          </Section>

          <Heading style={h1}>Thank you for your order! 🎉</Heading>

          <Text style={text}>Hi {customerName},</Text>

          <Text style={text}>
            We've received your order and you'll receive print scale options via
            email within 24 hours. Your order number is{" "}
            <strong>{orderId}</strong>.
          </Text>

          <Section style={orderInfoSection}>
            <Text style={orderInfoLabel}>Order Date:</Text>
            <Text style={orderInfoValue}>{orderDate}</Text>
          </Section>

          <Hr style={hr} />

          <Heading as="h2" style={h2}>
            Order Summary
          </Heading>

          {items.map((item, index) => (
            <Section key={index} style={itemSection}>
              <Row>
                <Column style={{ width: "20%" }}>
                  {item.image && (
                    <Img
                      src={item.image}
                      alt={item.name}
                      width="60"
                      height="60"
                      style={itemImage}
                    />
                  )}
                </Column>
                <Column style={{ width: "50%" }}>
                  <Text style={itemName}>{item.name}</Text>
                  {item.color && (
                    <Text style={itemDetails}>Color: {item.color}</Text>
                  )}
                  {item.size && (
                    <Text style={itemDetails}>Size: {item.size}</Text>
                  )}
                  <Text style={itemDetails}>Qty: {item.quantity}</Text>
                </Column>
                <Column style={{ width: "30%", textAlign: "right" }}>
                  <Text style={itemPrice}>{item.lineTotal}</Text>
                </Column>
              </Row>
            </Section>
          ))}

          <Hr style={hr} />

          <Section style={totalSection}>
            <Row>
              <Column style={{ width: "70%", textAlign: "right" }}>
                <Text style={totalLabel}>Total:</Text>
              </Column>
              <Column style={{ width: "30%", textAlign: "right" }}>
                <Text style={totalValue}>{total}</Text>
              </Column>
            </Row>
          </Section>
          <Text style={footer}>
            Questions about your order? Contact us at{" "}
            <Link href="mailto:jhtextiles@icloud.com" style={link}>
              jhtextiles@icloud.com
            </Link>
          </Text>

          <Text style={footer}>
            <Link href="https://jesudarahinmikaiye.com/orders" style={link}>
              View Order Status
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

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
  marginBottom: "24px",
};

const logo = {
  margin: "0 auto",
  display: "block",
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
  margin: "30px 0 15px",
};

const text = {
  color: "#4E5157",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const orderInfoSection = {
  margin: "20px 0",
};

const orderInfoLabel = {
  fontSize: "14px",
  color: "#666",
  margin: "0",
};

const orderInfoValue = {
  fontSize: "16px",
  color: "#1C1B0B",
  fontWeight: "500",
  margin: "4px 0 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const itemSection = {
  margin: "15px 0",
};

const itemImage = {
  borderRadius: "8px",
  objectFit: "cover" as const,
};

const itemName = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#1C1B0B",
  margin: "0 0 8px",
};

const itemDetails = {
  fontSize: "14px",
  color: "#666",
  margin: "4px 0",
};

const itemPrice = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#1C1B0B",
  margin: "0",
};

const totalSection = {
  margin: "20px 0",
};

const totalLabel = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1C1B0B",
  margin: "0",
  paddingRight: "20px",
};

const totalValue = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1C1B0B",
  margin: "0",
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
