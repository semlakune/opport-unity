"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useEffect} from "react";

export default function Register() {
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (data && status === "authenticated") {
      router.push("/dasboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, status]);
  return (
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
              onChange={() => console.log("")}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name={"username"}
              onChange={() => console.log("")}
              placeholder="johndoe123"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name={"password"}
              onChange={() => console.log("")}
              placeholder="********"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={(e) => console.log("")}>Sign Up</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  )
}