import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  label: string;
  user?: DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
  };
}

const UserInfo = ({ label, user }: UserInfoProps) => {
  return (
    <Card className="max-w-2xl w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate p-1 bg-slate-100 rounded-md">{user?.id}</p>
        </div>
        <div className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate p-1 bg-slate-100 rounded-md">{user?.name}</p>
        </div>
        <div className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate p-1 bg-slate-100 rounded-md">{user?.email}</p>
        </div>
        <div className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate p-1 bg-slate-100 rounded-md">{user?.role}</p>
        </div>
        <div className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Enabled</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
