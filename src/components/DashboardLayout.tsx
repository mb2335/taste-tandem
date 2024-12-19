import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ArrowUp, Users, Menu, TrendingUp } from "lucide-react";

export type Goal = {
  title: string;
  icon: any;
  description: string;
  services: string[];
};

const goals: Goal[] = [
  {
    title: "Increase Foot Traffic",
    icon: ArrowUp,
    description: "Drive more customers to your restaurant",
    services: ["Food Photography", "Video Content", "Event Coverage"],
  },
  {
    title: "Attract Younger Demographics",
    icon: Users,
    description: "Connect with Gen Z and Millennial audiences",
    services: ["TikTok", "Instagram", "Social Media"],
  },
  {
    title: "Showcase New Menu",
    icon: Menu,
    description: "Highlight your latest dishes and specialties",
    services: ["Food Photography", "Video Content"],
  },
  {
    title: "Boost Social Media",
    icon: TrendingUp,
    description: "Grow your online presence and engagement",
    services: ["Social Media", "Instagram", "TikTok"],
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  onGoalSelect?: (goal: Goal) => void;
  selectedGoal?: Goal;
}

export const DashboardLayout = ({ children, onGoalSelect, selectedGoal }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Your Goals</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {goals.map((goal) => (
                    <SidebarMenuItem key={goal.title}>
                      <SidebarMenuButton
                        tooltip={goal.description}
                        className={`w-full justify-start ${selectedGoal?.title === goal.title ? 'bg-accent' : ''}`}
                        onClick={() => onGoalSelect?.(goal)}
                      >
                        <goal.icon className="h-4 w-4" />
                        <span>{goal.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
};