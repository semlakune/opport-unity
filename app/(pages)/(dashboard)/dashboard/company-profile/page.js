"use client"
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useSession} from "next-auth/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/lib/utils";
import {ImageIcon, TrashIcon} from "@radix-ui/react-icons";
import {useEffect, useRef, useState} from "react";

export default function CompanyProfile() {
  const inputFileRef = useRef(null)
  const { data } = useSession()
  const employer = data?.user?.employer

  const [logo, setLogo] = useState(null)
  console.log(logo, "logo")

  const removeLogo = () => {
    setLogo(null)
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      setLogo(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    setLogo(employer?.logo)
  }, [data]);
  return (
    <div className={"w-full"}>
      <div className={"bg-white rounded-xl mt-5"}>
        <div className={"flex flex-col p-5"}>
          <div className={"flex flex-col"}>
            <h3 className={"text-lg font-semibold"}>Company Profile</h3>
            <p className={"text-sm text-gray-400"}>Update your company profile</p>
          </div>
          <div className={"mt-5 space-y-6"}>
            <div className={"flex gap-2 items-center"}>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={logo}
                  alt={data?.user?.name}
                  className={"object-cover"}
                />
                <AvatarFallback>{getInitials(data?.user?.name)}</AvatarFallback>
              </Avatar>
              <Button variant={"outline"} onClick={() => inputFileRef.current.click()}>Upload Logo <ImageIcon className={"ml-2"} /></Button>
              {logo && <Button variant={"destructive"} onClick={removeLogo}>Remove <TrashIcon className={"ml-2"} /></Button>}
              <input type="file" className={"hidden"} ref={inputFileRef} onChange={handleUpload} />
            </div>
            <div className={"flex flex-col gap-2"}>
              <Label>Company Name</Label>
              <Input type="text"/>
            </div>
            <Button>Update Company Profile</Button>
          </div>
        </div>
      </div>
    </div>
  )
}