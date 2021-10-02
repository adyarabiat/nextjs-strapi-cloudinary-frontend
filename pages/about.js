import { useState } from "react";
import Layout from "@/components/Layout";

export default function AboutPage() {
   return (
      <Layout title="About Brunches">
         <h1>About</h1>
         <p>This is an app to find the nicest brunches</p>
         <p>version: 1.0.0</p>
      </Layout>
   );
}
