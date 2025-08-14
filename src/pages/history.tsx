import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getSessionCustomer } from "../lib/auth";

const ProductHistory = dynamic(() => import("../components/ProductHistory"), {
  ssr: false
});

type Props = {
  customerKey: string | null;
};

export default function History({ customerKey }: Props) {
 if (!customerKey) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return (
    <div>
      <ProductHistory
        customerkey={customerKey}

        //primaryColor={theme.primaryColor}
        //logoUrl={theme.logoUrl}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const customerKey = getSessionCustomer(req);
  if (!customerKey) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }
  return { props: { customerKey } };
};
