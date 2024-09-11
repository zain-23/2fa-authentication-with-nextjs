"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentSession } from "@/hooks/use-current-user";

const Setting = () => {
  const session = useCurrentSession();

  const onClick = () => {
    logout();
  };
  return (
    <>
      <div>{JSON.stringify(session)}</div>

      <Button onClick={onClick} type="submit">
        Logout
      </Button>
    </>
  );
};

export default Setting;
