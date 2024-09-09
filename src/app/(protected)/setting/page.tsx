import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const Setting = async () => {
  const session = await auth();

  const logout = async () => {
    "use server";
    await signOut();
  };
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <form action={logout}>
        <Button type="submit">Logout</Button>
      </form>
    </>
  );
};

export default Setting;
