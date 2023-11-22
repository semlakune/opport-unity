"use client";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const SettingsPage = () => {
  return (
    <div className={"w-full"}>
      <div className={"bg-white rounded-xl mt-5"}>
        <div className={"flex flex-col p-5"}>
          <div className={"flex flex-col"}>
            <h3 className={"text-lg font-semibold"}>Account Settings</h3>
            <p className={"text-sm text-gray-400"}>Update your password</p>
          </div>
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
        </div>
      </div>
    </div>
  )
}

export default SettingsPage