import { redirect } from "next/navigation";
import { CreateUserIfNull } from "./actions";

const page = async () => {
  const { success } = await CreateUserIfNull();
  if(!success) {
    return <div>Something went wrong signing you in.</div>
  } 
  redirect("/");
};

export default page;