// those to show error message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import Image from "next/image";
import { API_URL } from "config";

import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";

export default function EventPage({ selectedEvent }) {
   return (
      <Layout>
         <div className={styles.event}>
            <span>
               {new Date(selectedEvent.date).toLocaleDateString("en-Us")} at {selectedEvent.time}
            </span>
            <h1>{selectedEvent.name}</h1>
            <ToastContainer />
            {selectedEvent.image && (
               <div className={styles.image}>
                  <Image
                     alt="event"
                     src={selectedEvent.image.formats.medium.url}
                     width={960}
                     height={600}
                  />
               </div>
            )}
            <h3>Performer: </h3>
            <p>{selectedEvent.performers}</p>
            <h3>Description:</h3>
            <p>{selectedEvent.description}</p>
            <h3>Venue: {selectedEvent.venue}</h3>
            <p>{selectedEvent.address}</p>

            <Link href="/events">
               <a className={styles.back}>{"<"} Go Back</a>
            </Link>
         </div>
      </Layout>
   );
}

// export async function getStaticPaths() {
//    const response = await fetch(`${API_URL}brunches`);
//    const data = await response.json();

//    const paths = data.map((evt) => ({
//       params: { slug: evt.slug },
//    }));
//    return {
//       paths,
//       fallback: false,
//    };
// }

// export async function getStaticProps({ params: { slug } }) {
//    const response = await fetch(`${API_URL}brunches`);
//    const data = await response.json();

//    const selectedEvent = data.find((event) => event.slug === slug);

//    return {
//       props: {
//          selectedEvent,
//       },
//    };
// }

export async function getServerSideProps({ query: { slug } }) {
   const res = await fetch(`${API_URL}brunches?slug=${slug}`);
   const events = await res.json();

   return {
      props: {
         selectedEvent: events[0],
      },
   };
}
