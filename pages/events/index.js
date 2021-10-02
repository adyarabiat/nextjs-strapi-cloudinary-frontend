import Link from "next/link";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "config";

const PER_PAGE = 5;

export default function BruncehsPage({ events, total, page }) {
   const lastPage = Math.ceil(total / PER_PAGE);

   return (
      <Layout>
         <h1>Events</h1>
         {events.length === 0 && <h3>No events to show</h3>}

         {events.map((evt) => (
            <EventItem key={evt.id} evt={evt} />
         ))}
         {page > 1 && (
            <Link href={`/events?page=${page - 1}`}>
               <a className="btn-secondary">Prev</a>
            </Link>
         )}
         {page < lastPage && (
            <Link href={`/events?page=${page + 1}`}>
               <a className="btn-secondary">Next</a>
            </Link>
         )}
      </Layout>
   );
}

export async function getServerSideProps(context) {
   const { query } = context;

   // so we create const page in the empty query and set it's value to 1
   const { page = 1 } = query;

   // Calculate start page
   // +page to get the number version of it not string
   const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

   // Fetch total/counts
   const totalRes = await fetch(`${API_URL}/brunches/count`);
   const total = await totalRes.json();

   // Fetch events
   const brunchesRes = await fetch(
      `${API_URL}brunches?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
   );
   const data = await brunchesRes.json();

   return {
      props: { events: data, page: +page, total },
   };
}
