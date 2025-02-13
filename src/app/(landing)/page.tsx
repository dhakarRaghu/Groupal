import CallToAction from "./_components/call-to-action";
import DashbaordSnippet from "./_components/dashboard-snippet";

import dynamic from 'next/dynamic';

const PricingSection = dynamic(() =>
  import('./_components/pricing').then((component) => component.PricingSection),
  { ssr: true }
);

export default function Home() {
  return (
     <main className="md : px-10 py-20 flex flex-col gap-36">
        <div>
              <CallToAction/>
              <DashbaordSnippet/>
        </div>
        <PricingSection></PricingSection>
     </main>
  );
}
