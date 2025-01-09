import { redirect } from "next/navigation";
import { CreateUserIfNull } from "./actions";

const page = async () => {
  const { success } = await CreateUserIfNull();
  if(!success) {
    redirect("/");
  } 
  redirect("/dashboard");
};

export default page;