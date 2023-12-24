"use client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useAppSelector} from "@/lib/reduxHooks";

export default function UserInfo() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      <Avatar className="h-20 w-20 shadow mx-auto mb-5">
        <AvatarImage
          src={
            user?.userType === "USER"
              ? user?.profile?.photo
              : user?.employer?.logo
          }
          alt={user?.name}
          className={"object-cover"}
        />
        <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
      </Avatar>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={"w-full"}>
            <p
              className={
                "line-clamp-3 font-custombold mb-5 mx-auto"
              }
            >
              {user?.name}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            {user?.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}