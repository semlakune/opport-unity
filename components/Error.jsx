import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function Error() {
  const router = useRouter();
  return (
    <div className={"flex flex-col items-center justify-center space-y-6 h-[80vh]"}>
      <div className={"flex flex-col items-center space-y-2"}>
        <h1 className={"text-6xl"}>😢</h1>
        <h1 className={"text-2xl font-bold"}>Something went wrong...</h1>
        <p className={"text-lg text-gray-400"}>
          Please try again later or contact us if the problem persists.
        </p>
      </div>
      <div className={"flex flex-col items-center space-y-2"}>
        <Button className={"w-full"} variant={"outline"} onClick={() => router.push("https://www.linkedin.com/in/ajipurnomo")}>Contact Us</Button>
        <Button className={"w-full"} onClick={() => router.refresh()}>Try Again</Button>
      </div>
    </div>
  );
}