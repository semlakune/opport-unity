"use client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useSession} from "next-auth/react";

export default function UserInfo() {
  const { data, status, loading } = useSession()
  const { user } = data || {};
  return (
    <>
      <Avatar className="h-20 w-20 shadow mx-auto mb-5">
        <AvatarImage
          src={
            user.userType === "USER"
              ? user.profile?.photo
              : user.employer?.logo
          }
          alt={user.name}
          className={"object-cover"}
        />
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={"w-full"}>
            <p
              className={
                "line-clamp-3 font-wotfardBold mb-5 mx-auto"
              }
            >
              {user.name}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            {user.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}