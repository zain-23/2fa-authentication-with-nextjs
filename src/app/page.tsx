import { LoginButton } from "@/components/auth/loginButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-400 to-red-800">
      <div className={cn("text-center space-y-6 text-white")}>
        <h1 className={cn("text-6xl font-semibold drop-shadow-md")}>🔐 Auth</h1>
        <p className="text-lg">A Simple Authentication service</p>
        <div>
          <LoginButton>
            <Button>Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
