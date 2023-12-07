import { Button } from "@/components/ui/button";
import { Link2Icon, Share1Icon } from "@radix-ui/react-icons";
import { TwitterShareButton, WhatsappShareButton } from "next-share";
import { WhatsAppIcon, XIcon } from "@/components/Icons";
import { toast } from "sonner";

export default function ShareButton({ withText = false, jobId }) {
  let shareUrl = "https://opport-unity.vercel.app";

  if (typeof window !== "undefined") {
    shareUrl = jobId ?  window.location.href + "/job/" + jobId : window.location.href;
  }
  const handleCopyUrl = () => {
    if (typeof navigator === "undefined") {
      toast.error("Your browser does not support this feature", {
        position: "top-center",
      });
      return;
    }

    navigator.clipboard.writeText(shareUrl);
    toast.success("Copied to clipboard!", { position: "top-center" });
  };

  return (
    <div className={"share-button"}>
      <span>
        <Button variant={"outline"} className={`w-full ${withText && "py-6"} bg-white`}>
          <Share1Icon className={"mr-2"} /> {withText && "Share"}
        </Button>
      </span>
      <TwitterShareButton url={shareUrl} title={"Look at this awesome job!"}>
        <XIcon />
      </TwitterShareButton>
      <WhatsappShareButton
        url={shareUrl}
        title={"Look at this awesome job!"}
        separator=":: "
      >
        <WhatsAppIcon />
      </WhatsappShareButton>
      <Link2Icon onClick={handleCopyUrl} className={"w-5 h-5 cursor-pointer"} />
    </div>
  );
}
