"use client";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {usePasswordForm} from "@/lib/useProfileForm";
import {ReloadIcon} from "@radix-ui/react-icons";

export default function AccountSettings() {
  const { data, status } = useSession()
  const [isDisabled, setIsDisabled] = useState(false)
  const { password, setPassword, handleUpdate, isUpdating } = usePasswordForm({sessionData: data});

  const handleOnChange = (e) => {
    setPassword({...password, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    if ((data?.user?.id === 1 && data?.user?.id === 2) || (Object.values(password).some(value => value === ""))) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }

    // setIsDisabled(false)
  }, [data, password]);
  return (
    <div className={"space-y-6"}>
      <div className={"flex flex-col"}>
        <h3 className={"text-lg font-semibold"}>Password</h3>
        <p className={"text-sm text-gray-400"}>Update your password</p>
      </div>
      <div className={"flex flex-col gap-2"}>
        <Label>Current password</Label>
        <Input type="password" name={"currentPassword"} value={password.currentPassword} onChange={handleOnChange}/>
      </div>
      <div className={"flex flex-col gap-2"}>
        <Label>New password</Label>
        <Input type="password" name={"newPassword"} value={password.newPassword} onChange={handleOnChange}/>
      </div>
      <div className={"flex flex-col gap-2"}>
        <Label>Confirm password</Label>
        <Input type="password" name={"confirmPassword"} value={password.confirmPassword} onChange={handleOnChange}/>
      </div>
      <Button disabled={isDisabled || isUpdating} onClick={handleUpdate}>{isUpdating && <ReloadIcon className={"animate-spin mr-2"} /> } Update password</Button>
    </div>
  )
}