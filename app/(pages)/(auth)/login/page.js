import SignIn from "@/components/pages/auth/SignIn";
import {Skeleton} from "@/components/ui/skeleton";
import {Suspense} from "react";

export default async function SignInPage() {
  return (
    <Suspense fallback={<Skeleton className={"w-full h-80 mt-2 rounded-2xl"} /> }>
      <SignIn />
    </Suspense>
  );
}
