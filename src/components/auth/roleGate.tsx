"use client";
import { useCurrentRole } from "@/hooks/user-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import { FormError } from "@/components/formError";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return (
      <FormError message="You don't have permission to view this content" />
    );
  }
  return <>{children}</>;
};

export default RoleGate;
