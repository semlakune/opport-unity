import SignUp from "@/components/pages/auth/SignUp";
import {Skeleton} from "@/components/ui/skeleton";
import {Suspense} from "react";

export default async function SignUpPage() {
  return (
    <Suspense fallback={<Skeleton className={"w-full h-80 mt-2 rounded-2xl"} /> }>
      <SignUp />
    </Suspense>
  );
}
