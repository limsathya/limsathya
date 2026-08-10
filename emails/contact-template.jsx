import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";

export function ContactEmail({ name, email, subject, message }) {
  return (
    <Html>
      <Head />
      <Preview>New message from {name} — {subject}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>New Contact Message</Heading>
            <Text style={subhead}>
              Someone reached out via your website contact form.
            </Text>
          </Section>

          <Section style={card}>
            <InfoRow label="Name" value={name} />
            <InfoRow label="Email" value={email} />
            <InfoRow label="Subject" value={subject} />
          </Section>

          <Section style={messageCard}>
            <Text style={messageLabel}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={divider} />

          <Section style={footer}>
            <Text style={footerText}>
              Sent via{" "}
              <Link href="https://limsathya.com" style={link}>
                limsathya.com
              </Link>{" "}
              contact form
            </Text>
            <Text style={footerDim}>
              You can reply directly to {email}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function InfoRow({ label, value }) {
  return (
    <Section style={row}>
      <Text style={labelStyle}>{label}</Text>
      <Text style={valueStyle}>{value}</Text>
    </Section>
  );
}

// ─── styles ────────────────────────────────────────────

const body = {
  backgroundColor: "#0b1020",
  fontFamily: '"MiSans", sans-serif',
  padding: "32px 16px",
};

const container = {
  maxWidth: "560px",
  margin: "0 auto",
};

const header = {
  padding: "32px 0 24px",
  textAlign: "center",
};

const heading = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#ffe3b0",
  margin: "0 0 8px",
  letterSpacing: "-0.02em",
};

const subhead = {
  fontSize: "15px",
  color: "#93a4c4",
  margin: "0",
};

const card = {
  backgroundColor: "#121a30",
  borderRadius: "12px",
  padding: "24px 28px",
  border: "1px solid #243156",
  marginBottom: "12px",
};

const row = {
  padding: "8px 0",
  borderBottom: "1px solid #1c2746",
  margin: "0",
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#7e8eb2",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  margin: "0 0 4px",
};

const valueStyle = {
  fontSize: "16px",
  color: "#e8e6df",
  margin: "0",
  lineHeight: "1.5",
};

const messageCard = {
  backgroundColor: "#121a30",
  borderRadius: "12px",
  padding: "24px 28px",
  border: "1px solid #243156",
};

const messageLabel = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#7e8eb2",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  margin: "0 0 12px",
};

const messageText = {
  fontSize: "15px",
  color: "#e8e6df",
  lineHeight: "1.7",
  margin: "0",
  whiteSpace: "pre-wrap",
};

const divider = {
  borderColor: "#243156",
  margin: "28px 0 20px",
};

const footer = {
  textAlign: "center",
};

const footerText = {
  fontSize: "13px",
  color: "#7e8eb2",
  margin: "0 0 4px",
};

const footerDim = {
  fontSize: "12px",
  color: "#5a6a8a",
  margin: "0",
};

const link = {
  color: "#f6a23c",
  textDecoration: "underline",
};

export default ContactEmail;
