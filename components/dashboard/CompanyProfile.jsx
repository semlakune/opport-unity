"use client"
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useSession} from "next-auth/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/lib/utils";
import {ImageIcon, ReloadIcon, TrashIcon} from "@radix-ui/react-icons";
import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";

export default function CompanyProfile() {
  const inputFileRef = useRef(null)
  const { data, update } = useSession()
  const employer = data?.user?.employer
  const username = data?.user?.username

  const [logo, setLogo] = useState(null)
  const [file, setFile] = useState(null)
  const [companyName, setCompanyName] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const removeLogo = () => {
    setLogo(null)
    setFile(null)
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      setLogo(e.target.result)
    }
    reader.readAsDataURL(file)

    setFile(file)
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      if (companyName.length < 1) {
        console.log("Company name is required")
        return
      }
      const formData = new FormData()
      formData.append("username", username)
      formData.append("name", companyName)
      console.log(file, logo)

      // if file is not null and logo is start with data:, then we have a new logo
      if (file && logo?.startsWith("data:")) {
        formData.append("file", file)
      }
      // if file null and logo have value start with https://, then we do not change the logo
      else if (!file && logo?.startsWith("https://")) {
        formData.append("file", "DO_NOT_CHANGE")
      }
      // if file null and logo null, then we delete the logo
      else if (!file && !logo) {
        formData.append("file", "DELETE_LOGO")
      } else {
        console.log("Unknown case")
      }

      const response = await fetch("/api/profile", {
        method: "PUT",
        body: formData
      })

      const data = await response.json()
      console.log(data)
      if (data.success) {
        await update({user: data.user})
        toast.success("Company profile updated")
      }

      setIsUpdating(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (data) {
      setLogo(employer?.logo)
      setCompanyName(data?.user.name)
      setFile(null)
    }
  }, [data]);

  return (
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
        <Input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}/>
      </div>
      <Button onClick={handleUpdate} disabled={isUpdating}>{isUpdating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} Update Company Profile</Button>
    </div>
  )
}