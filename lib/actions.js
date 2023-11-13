'use server';
import {signIn} from "@/app/auth";
export const authenticate = async (formData) => {
  const { username, password } = formData;

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    return "Wrong Credentials!";
  }
};