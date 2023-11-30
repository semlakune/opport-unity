import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, TrashIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import {Button} from "@/components/ui/button";
import {getInitials} from "@/lib/utils";

export const ImageUpload = ({ image, onUpload, onRemove, altText, sessionData }) => {
  const inputFileRef = useRef(null);

  return (
    <div className={"flex gap-2 items-center"}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={image} alt={altText} className={"object-cover"} />
        <AvatarFallback>{getInitials(sessionData?.user?.name)}</AvatarFallback>
      </Avatar>
      <Button variant={"outline"} onClick={() => inputFileRef.current.click()}>
        Upload <ImageIcon className={"ml-2"} />
      </Button>
      {image && (
        <Button variant={"destructive"} onClick={onRemove}>
          Remove <TrashIcon className={"ml-2"} />
        </Button>
      )}
      <input type="file" className={"hidden"} ref={inputFileRef} onChange={onUpload} />
    </div>
  );
};
