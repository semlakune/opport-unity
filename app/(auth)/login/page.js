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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeftIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {toast, Toaster} from "sonner";

export default function Login() {
  const router = useRouter();
  const { data, status } = useSession();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isShowPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

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

      console.log(res, "ini res")

      router.push("/");
    } catch (e) {
      console.log(e)
    } finally {
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    if (data && status === "authenticated") {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, status]);

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
            <Label htmlFor="username">Username</Label>
            <Input
              ref={usernameRef}
              id="username"
              name={"username"}
              defaultValue={"user-demo"}
              className={"rounded"}
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
              defaultValue={"demo123"}
              className={"rounded"}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} disabled={isSigningIn}>{isSigningIn ? "Signing you in..." : "Sign In"}</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
