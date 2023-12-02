"use client"
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useSession} from "next-auth/react";
import {ReloadIcon} from "@radix-ui/react-icons";
import {useProfileForm} from "@/lib/useProfileForm";
import {ImageUpload} from "@/components/pages/dashboard/ImageUpload";

export default function CompanyProfile() {
  const { data, update } = useSession();
  const { image, handleImageUpload, removeImage, name, setName, handleUpdate, isUpdating } = useProfileForm({sessionData: data, updateSessionData: update}, "EMPLOYER");

  return (
    <div className={"mt-5 space-y-6"}>
      <ImageUpload image={image} onUpload={handleImageUpload} onRemove={removeImage} altText={data?.user?.name} sessionData={data} />
      <div className={"flex flex-col gap-2"}>
        <Label>Company Name</Label>
        <Input type="text" value={name} onChange={e => setName(e.target.value)}/>
      </div>
      <Button onClick={handleUpdate} disabled={isUpdating}>{isUpdating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} Update Company Profile</Button>
    </div>
  )
}