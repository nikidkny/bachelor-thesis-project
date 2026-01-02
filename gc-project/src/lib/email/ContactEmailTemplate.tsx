import { ContactEmailType } from "@/types/ContactEmailType";
import {
  Html,
  Tailwind,
  Text,
  Section,
  Link,
  Row,
  Column,
} from "@react-email/components";

export const ContactEmailTemplate = ({
  full_name,
}: ContactEmailType) => (
  <Tailwind>
    <Html>
      <Section className="text-center">
        <Text>Thank you for contacting us, {full_name}!</Text>
        <Text>
          We have received your message and will get back to you shortly.
        </Text>
      </Section>
      <Section className="text-center">
        <table className="w-full">
          <tr className="w-full">
            <td className="align-center">
              <Text>Good City Team</Text>
            </td>
          </tr>
          <tr className="w-full">
            <td className="align-center">
              <Text>COPENHAGEN + PARIS</Text>
              <Text>Good City Digital Studio</Text>
            </td>
          </tr>
          <tr className="w-full">
            <td className="align-center">
              <Row  className="align-center table-cell w-full">
                <Column>
                  <Link href="https://www.instagram.com/goodcity.studio/">
                    Instagram
                  </Link>
                </Column>
                <Column>
                  <Link href="https://www.linkedin.com/company/good-city">
                    LinkedIn
                  </Link>
                </Column>
                <Column>
                  <Link href="https://goodcity.studio/">Website</Link>
                </Column>
              </Row>
            </td>
          </tr>
        </table>
      </Section>
    </Html>
  </Tailwind>
);
