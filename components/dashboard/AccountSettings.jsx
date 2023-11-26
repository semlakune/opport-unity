"use client";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function AccountSettings() {
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
      <Button disabled={true}>Update password</Button>
    </div>
  )
}