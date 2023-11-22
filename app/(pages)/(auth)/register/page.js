"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import { TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {EyeClosedIcon, EyeOpenIcon, ReloadIcon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator";
import {RegisterSchema} from "@/lib/schema";

export default function Register() {
  const router = useRouter();
  const { data, status } = useSession();
  const [isShowPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      userType: null
    }
  })

  const userType = [
    { label: "User", value: "USER" },
    { label: "Company", value: "EMPLOYER" }
  ]

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      if (data.error) {
        console.log(data.error)
        form.setError("username", {
          type: "manual",
          message: "Username already taken."
        })
      }

      if (data.id) {
        await signIn("credentials", {
          username: values.username,
          password: values.password,
          redirect: false,
        });
        router.push("/dashboard");
      }

      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      console.error(error)
    }
  }

  useEffect(() => {
    if (data && status === "authenticated") {
      router.push("/dashboard");
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
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className={"flex justify-between"}>
                      <FormLabel>Password</FormLabel>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setShowPassword(!isShowPassword)
                        }}
                        className={"text-sm cursor-pointer hover:text-primary"}
                      >
                        {!isShowPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </button>
                    </div>
                    <FormControl>
                      <Input
                        type={isShowPassword ? "text" : "password"}
                        placeholder={"Type your password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userType"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={(value) => form.setValue('userType', value, { shouldValidate: true })}>
                      <SelectTrigger className="w-full focus:ring-0">
                        <SelectValue placeholder="Select your role" aria-label={"User Role"} />
                      </SelectTrigger>
                      <SelectContent>
                        {userType?.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.userType ? <p className={"text-[0.8rem] font-medium text-destructive"}>Please choose your role</p> : null}
                  </FormItem>
                )}
              />
              <Separator className={"w-full my-10"} />
              <Button type="submit" className={"w-full"} disabled={isSubmitting}>{isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} Register</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
