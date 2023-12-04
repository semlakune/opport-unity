import { useState, useEffect } from 'react';
import {toast} from "sonner";

export const useProfileForm = (session, entityType) => {
  const { sessionData, updateSessionData } = session;
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Common methods for handling image upload and removal
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target.result)
    }
    reader.readAsDataURL(file)

    setFile(file)
  };
  const removeImage = () => {
    setImage(null);
    setFile(null);
  };

  // Common update method
  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      if (name.length < 1) {
        console.log("Name is required")
        return
      }
      const formData = new FormData()
      formData.append("username", sessionData.user.username)
      formData.append("name", name)

      // if file is not null and image is start with data:, then we have a new image
      if (file && image?.startsWith("data:")) {
        formData.append("file", file)
      }
      // if file null and image have value start with https://, then we do not change the image
      else if (!file && image?.startsWith("https://")) {
        formData.append("file", "DO_NOT_CHANGE")
      }
      // if file null and image null, then we delete the image
      else if (!file && !image) {
        formData.append("file", "DELETE_LOGO")
      } else {
        console.log("Unknown case")
      }

      const response = await fetch("/api/profile", {
        method: "PUT",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        await updateSessionData({user: data.user})
        toast.success("Success")
      }

      setIsUpdating(false)
    } catch (error) {
      toast.error("Error")
      console.log(error)
    }
  };

  // Effect for initializing form state
  useEffect(() => {
    if (sessionData) {
      let image = entityType === "USER" ? sessionData.user.profile.photo : sessionData.user.employer.logo
      setImage(image)
      setName(sessionData.user.name)
      setFile(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData]);

  return {
    image,
    file,
    name,
    isUpdating,
    setName,
    handleImageUpload,
    removeImage,
    handleUpdate,
  };
};

export const usePasswordForm = (session) => {
  const { sessionData } = session;
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      if (password.currentPassword.length < 1 || password.newPassword.length < 1) {
        toast.warning("Password is required")
        setIsUpdating(false)
        return
      }
      if (password.newPassword !== password.confirmPassword) {
        toast.warning("Password does not match")
        setIsUpdating(false)
        return
      }

      const formData = new FormData()
      formData.append("username", sessionData.user.username)
      formData.append("currentPassword", password.currentPassword)
      formData.append("newPassword", password.newPassword)

      const response = await fetch("/api/password", {
        method: "PUT",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Success")
      } else {
        toast.error(data.error || "Error")
      }

      setIsUpdating(false)
    } catch (error) {
      toast.error(error.message || "Error")
      console.log(error)
    }
  };

  return {
    password,
    setPassword,
    isUpdating,
    handleUpdate,
  };
}
