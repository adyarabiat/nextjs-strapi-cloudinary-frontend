import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "config";

export default function SearchPage({ events }) {
   const router = useRouter();
   console.log(router);
   return (
      <Layout title="Search Brunches">
         <Link href="/events">Go Back</Link>
         <h1>Search Results for {router.query.term}</h1>
         {events.length === 0 && <h3>No Brunch to show</h3>}

         {events.map((evt) => (
            <EventItem key={evt.id} evt={evt} />
         ))}
      </Layout>
   );
}

export async function getServerSideProps({ query: { term } }) {
   const query = qs.stringify({
      _where: {
         _or: [
            { name_contains: term },
            { performers_contains: term },
            { description_contains: term },
            { venue_contains: term },
         ],
      },
   });
   console.log(query);
   const response = await fetch(`${API_URL}brunches?${query}`);
   const data = await response.json();

   return {
      props: { events: data },
   };
}
