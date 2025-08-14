import { GetServerSideProps } from "next";
import { getSessionCustomer } from "../lib/auth";

type Props = {
  customerKey: string | null;
};

export default function Home({ customerKey }: Props) {
 if (!customerKey) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

//   return (
//  <div > 
//   <h3> 
//       <p>This is the server-side rendered dashboard for {theme.primaryColor}.</p>
//       <p>The theme color and logo above are applied based on login.</p>
//       </h3>  
//   </div>
//   );
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
