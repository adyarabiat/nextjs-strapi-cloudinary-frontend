import cookie from "cookie";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import { API_URL } from "config";

import styles from "@/styles/Dashboard.module.css";

function parseCookies(req) {
   return cookie.parse(req ? req.headers.cookie || "" : "");
}

export default function DashboardPage({ brunches, token }) {
   const router = useRouter();

   const deleteEvent = async (id) => {
      if (confirm("Are you sure?")) {
         const res = await fetch(`${API_URL}brunches/${id}`, {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         const data = await res.json();
         if (!res.ok) {
            toast.error(data.message);
         } else {
            router.reload();
         }
      }
   };

   return (
      <Layout title="User Dashboard">
         <div className={styles.dash}>
            <h1>Dashboard</h1>
            <h3>My Events</h3>

            {brunches.map((evt) => (
               <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
            ))}
         </div>
      </Layout>
   );
}

export async function getServerSideProps({ req }) {
   const { token } = parseCookies(req);

   const res = await fetch(`${API_URL}brunches/me`, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   const brunches = await res.json();

   return {
      props: {
         brunches,
         token,
      },
   };
}
