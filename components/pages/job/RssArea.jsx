import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CheckCircledIcon, ReloadIcon} from "@radix-ui/react-icons";
import {useState} from "react";

export default function RssArea() {
  const [isSubscribed, setIsSubscribed] = useState("not-subscribed");
  const [subscribeEmail, setSubscribeEmail] = useState("");

  const handleSubscribe = () => {
    setIsSubscribed("waiting");
    setTimeout(() => {
      setIsSubscribed("subscribed");
    }, 3000);
  };
  return (
    <div className="pattern w-full h-40 rounded-md relative flex items-center justify-center">
      <div className={"flex flex-col gap-2 w-full p-5"}>
        <p className={"font-custombold"}>
          Most Recent Jobs Listing Directly in Inbox!
        </p>
        <p className={"text-xs text-muted-foreground"}>
          Kindly provide your email address
        </p>
        <div className={"h-12 flex items-center"}>
          <div
            className={
              `${isSubscribed === "not-subscribed" ? "p-1" : "p-0"} rounded-full bg-white flex flex-row items-center gap-1 w-full text-xs mt-2 transition-all duration-500`
            }
          >
            {isSubscribed === "not-subscribed" && (
              <div className={"w-full flex flex-col md:flex-row"}>
                <Input
                  type="email"
                  name="subscribeEmail"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={
                    "py-[3px] ml-3 h-auto rounded-none border-none outline-none shadow-none focus-visible:ring-0 pl-0"
                  }
                />
              </div>
            )}
            <Button
              onClick={handleSubscribe}
              disabled={
                isSubscribed === "subscribed" || subscribeEmail.length < 1
              }
              className={`rounded-full h-auto py-[0.25rem] px-3 font-customitalic ${
                isSubscribed !== "not-subscribed" ? "w-full" : "w-fit"
              }`}
            >
              {isSubscribed === "not-subscribed" ? (
                "subscribe"
              ) : isSubscribed === "waiting" ? (
                <ReloadIcon className={"animate-spin h-4 w-4"} />
              ) : (
                <CheckCircledIcon className={"h-5 w-5"} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}