"use client"
import useUserStore from "@/store/useUserStore";
import Header from "@/components/Header";
import {updateUserPhoto} from "@/lib/actions";

const ProfilePage = () => {
  const { userDetails } = useUserStore();

  const handleFileUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("userId", userDetails?.id);
      formData.append("userType", userDetails?.userType);
      formData.append("username", userDetails?.username);

      const res = await updateUserPhoto(formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <h1 className={"mt-20"}>Profile Page</h1>
      <input type="file" onChange={handleFileUpload}/>
    </div>
  )
}

export default ProfilePage;