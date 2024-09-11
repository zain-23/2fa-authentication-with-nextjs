"use client";
import { AdminAction } from "@/actions/admin-action";
import RoleGate from "@/components/auth/roleGate";
import { FormSuccess } from "@/components/formSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onApiRouteClick = async () => {
    try {
      const response = await fetch("/api/admin");
      if (response.status === 200) {
        toast.success("Allowed API Route");
      } else {
        throw new Error("forbidden");
      }
      return response;
    } catch (error) {
      toast.error("Forbidden API Route");
    }
  };

  const onServerActionClick = async () => {
    AdminAction().then((data) => {
      if (data.success) {
        toast.success(data.success);
        return;
      }
      if (data.error) {
        toast.error(data.error);
        return;
      }
    });
  };
  return (
    <Card className="max-w-2xl w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          🗝️ Admin
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Admin Only Api Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Admin Only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
