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
  const [registerForm, setRegisterForm] = useState({
    name: "",
    username: "",
    password: "",
  });
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

      router.push("/");
    } catch (e) {
      console.log(e)
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerForm);
  };

  useEffect(() => {
    if (data && status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <div
      className={
        "w-screen h-screen overflow-hidden flex flex-col gap-5 justify-start pt-40 items-center bg-gradient-to-br from-[#bbe3d1] to-white"
      }
    >
      <Toaster richColors />
      <div>
        <h1>Hi, Welcome</h1>
      </div>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-white backdrop-blur bg-opacity-50">
          <TabsTrigger
            value="login"
            className={
              "data-[state=active]:bg-primary data-[state=active]:text-white"
            }
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className={
              "data-[state=active]:bg-primary data-[state=active]:text-white"
            }
            disabled={isSigningIn}
          >
            Register
          </TabsTrigger>
        </TabsList>
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
        <TabsContent value="register">
          <Card className={"bg-white backdrop-blur bg-opacity-50"}>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Register to create your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name={"name"}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name={"username"}
                  onChange={handleChange}
                  placeholder="johndoe123"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name={"password"}
                  onChange={handleChange}
                  placeholder="********"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={(e) => handleSubmit(e)}>Sign Up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Link
        href={"/"}
        className={
          "text-sm text-primary flex items-center justify-between gap-2"
        }
      >
        <span>
          <ArrowLeftIcon />{" "}
        </span>
        Back to Home
      </Link>
    </div>
  );
}
