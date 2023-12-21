"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  InfoCircledIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const runtime = 'edge'

export default function SignIn() {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl");

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [isShowPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const infoLogin = [
    {
      username: "johndoe",
      password: "demo123",
      type: "user",
    },
    {
      username: "glycon",
      password: "demo123",
      type: "company",
    },
    {
      username: "deepwell",
      password: "demo123",
      type: "company",
    },
    {
      username: "onyx",
      password: "demo123",
      type: "company",
    },
    {
      username: "springfog",
      password: "demo123",
      type: "company",
    },
  ];

  const handleLogin = async () => {
    try {
      setIsSigningIn(true);
      const res = await signIn("credentials", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        redirect: false,
      });

      if (res?.error) {
        if (res?.status === 401) {
          toast.error("Invalid username or password");
        }
        return
      }
      router.push(callbackUrl || "/dashboard")
    } catch (e) {
      console.log(e);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleInsert = (username, password) => {
    usernameRef.current.value = username;
    passwordRef.current.value = password;
    passwordRef.current.focus();
  };

  return (
    <TabsContent value="login">
      <Card className={"bg-white backdrop-blur bg-opacity-50"}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Login to your account to access your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className={"flex items-end gap-1"}>
              Username{" "}
              <Popover>
                <PopoverTrigger>
                  <InfoCircledIcon className={"w-3 h-3"} />
                </PopoverTrigger>
                <PopoverContent className={"w-auto"} side={"right"}>
                  <table className={`table-info-login`}>
                    <thead>
                      <tr>
                        <th className={"text-left"}>Username</th>
                        <th className={"text-left"}>Password</th>
                        <th className={"text-left"}>Type</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {infoLogin.map((item, index) => (
                        <tr key={index}>
                          <td>{item.username}</td>
                          <td>{item.password}</td>
                          <td>{item.type}</td>
                          <td
                            className={"bg-primary text-white cursor-pointer"}
                            onClick={() =>
                              handleInsert(item.username, item.password)
                            }
                          >
                            insert
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </PopoverContent>
              </Popover>
            </Label>
            <Input
              ref={usernameRef}
              id="username"
              name={"username"}
              placeholder={"Your username"}
            />
          </div>
          <div className="space-y-2">
            <div className={"flex justify-between"}>
              <Label htmlFor="password">Password</Label>
              <button
                onClick={() => setShowPassword(!isShowPassword)}
                className={"text-sm cursor-pointer hover:text-primary"}
              >
                {!isShowPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>
            <Input
              ref={passwordRef}
              id="password"
              name={"password"}
              type={isShowPassword ? "text" : "password"}
              placeholder={"Your password"}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleLogin}
            disabled={isSigningIn}
            className={"w-full"}
          >
            {isSigningIn && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}{" "}
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
