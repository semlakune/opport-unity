"use client";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

export default function AccountSettings() {
  const { data, status } = useSession()
  const [isDisabled, setIsDisabled] = useState(true)

  const handleUpdatePassword = () => {
    console.log("update password")
  }

  useEffect(() => {
    if (data?.user?.id !== 1 && data?.user?.id !== 2) {
      setIsDisabled(false)
    }

    setIsDisabled(true)
  }, [data]);
  return (
    <div className={"mt-5 space-y-6"}>
      <div className={"flex flex-col gap-2"}>
        <Label>Current password</Label>
        <Input type="password"/>
      </div>
      <div className={"flex flex-col gap-2"}>
        <Label>New password</Label>
        <Input type="password"/>
      </div>
      <div className={"flex flex-col gap-2"}>
        <Label>Confirm password</Label>
        <Input type="password"/>
      </div>
      <Button disabled={isDisabled || !data} onClick={handleUpdatePassword}>Update password</Button>
    </div>
  )
}