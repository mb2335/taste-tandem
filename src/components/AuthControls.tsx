import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AuthControlsProps {
  isAuthenticated: boolean;
}

export const AuthControls = ({ isAuthenticated }: AuthControlsProps) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!isAuthenticated) return null;

  return (
    <div className="absolute top-4 right-4">
      <Button variant="ghost" onClick={handleSignOut}>
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};