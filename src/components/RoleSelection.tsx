import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const RoleSelection = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = async (role: "restaurant" | "influencer") => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ role })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast.success("Role selected successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to select role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Choose Your Role</CardTitle>
          <CardDescription className="text-center">
            Select how you want to use Taste Tandem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              variant="outline"
              className="h-40 flex flex-col items-center justify-center gap-4 hover:bg-gray-100"
              onClick={() => handleRoleSelection("restaurant")}
              disabled={loading}
            >
              <Utensils className="h-12 w-12" />
              <div>
                <h3 className="font-semibold">I'm a Restaurant</h3>
                <p className="text-sm text-gray-500">Looking for influencers</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-40 flex flex-col items-center justify-center gap-4 hover:bg-gray-100"
              onClick={() => handleRoleSelection("influencer")}
              disabled={loading}
            >
              <Camera className="h-12 w-12" />
              <div>
                <h3 className="font-semibold">I'm an Influencer</h3>
                <p className="text-sm text-gray-500">Looking for opportunities</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};