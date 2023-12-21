import Navbar from "@/components/Navbar";
import Orbit from "@/components/Orbit";
import Footer from "@/components/Footer";
import Home from "@/components/pages/home/Home";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import {getCategories, getJobs} from "@/lib/actions";

export default async function HomePage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["jobs", "categories"],
    queryFn: async () => {
      const categories = await getCategories();
      const jobs = await getJobs();
      return { categories, jobs };
    },
  })
  return (
    <div>
      <Navbar isLanding={true} />
      <Orbit />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home />
      </HydrationBoundary>
      <Footer />
    </div>
  );
}
