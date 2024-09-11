"use client";
import UserInfo from "@/components/userInfo";
import { useCurrentSession } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentSession();
  return <UserInfo label="Client Component" user={user} />;
};

export default ClientPage;
