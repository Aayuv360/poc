import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
type Faq = {
  id: number;
  companyId: number;
  question: string;
  answer: string;
};

type FaqPageProps = {
  faqs: Faq[];
  companyId: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-build for HP (1) and Lenovo (2)
  const paths = [
    { params: { companyId: "hp" } },
    { params: { companyId: "lenovo" } },
  ];
  return { paths, fallback: "blocking" }; // ISR for new companies
};


export const getStaticProps: GetStaticProps<FaqPageProps> = async ({
  params,
}) => {
  const companyId = params?.companyId === "hp" ? "1" : "2";
  const res = await fetch(`http://localhost:5010/api/faqs/${companyId}`);
  const faqs: Faq[] =await res.json()

  return {
    props: {
      faqs,
      companyId,
      customerKey: companyId === "1" ? "acme" : "globex",
    },
    revalidate: 25, // ISR: revalidate every 60 seconds
  };
};

export default function FaqPage({
  faqs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container maxWidth="md" sx={{ m: 2 }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      {faqs.map((faq) => (
        <Accordion key={faq.id} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

    </Container>
  );
}