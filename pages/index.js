import Link from "next/link";

import { API_URL } from "config";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

export default function HomePage({ events }) {
   return (
      <Layout>
         <h1>Upcoming Brunches</h1>
         {events.length === 0 && <h3>No brunches to show</h3>}

         {events.map((evt) => (
            <EventItem key={evt.id} evt={evt} />
         ))}
         {events.length > 0 && (
            <Link href="/events">
               <a className="btn-secondary">View All Brunches</a>
            </Link>
         )}
      </Layout>
   );
}

export async function getStaticProps() {
   const response = await fetch(`${API_URL}brunches?_sort=date:ASC&_limit=3`);
   const data = await response.json();

   return {
      props: { events: data },
   };
}
