import { Goal } from "./DashboardLayout";

interface WelcomeSectionProps {
  selectedGoal: Goal | undefined;
}

export const WelcomeSection = ({ selectedGoal }: WelcomeSectionProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to Taste Tandem</h1>
      <p className="text-lg text-muted-foreground">
        {selectedGoal
          ? `Discover ${selectedGoal.title.toLowerCase()} solutions tailored for your restaurant.`
          : "Select your business goal from the sidebar to discover curated influencer services that will help you achieve your objectives."}
      </p>
    </div>
  );
};