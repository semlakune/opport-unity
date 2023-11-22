import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import {getInitials} from "@/lib/utils";
import Link from "next/link";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {menu} from "@/lib/constants";

const UserNav = ({user}) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.userType === 'USER' ? user.profile?.photo : user.employer?.logo}
              alt={user.name}
              className={"object-cover"}
            />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <TooltipProvider>
              <Tooltip delayDuration={2000}>
                <TooltipTrigger>
                  <p className="text-left text-sm font-medium leading-none line-clamp-2">{user.name}</p>
                </TooltipTrigger>
                <TooltipContent className={"w-52"}>
                  {user.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-xs leading-none text-muted-foreground">
              {user.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menu.filter(menuItem => menuItem.user.includes(user?.userType)).map((item, index) => (
            <Link href={item.href} key={index}><DropdownMenuItem>{item.name}</DropdownMenuItem></Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;