import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ArrowUp, Users, Menu } from "lucide-react";

const goals = [
  {
    title: "Increase Foot Traffic",
    icon: ArrowUp,
    description: "Drive more customers to your restaurant",
  },
  {
    title: "Attract Younger Demographics",
    icon: Users,
    description: "Connect with Gen Z and Millennial audiences",
  },
  {
    title: "Showcase New Menu",
    icon: Menu,
    description: "Highlight your latest dishes and specialties",
  },
  {
    title: "Boost Social Media",
    icon: ArrowUp,
    description: "Grow your online presence and engagement",
  },
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
                        className="w-full justify-start"
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