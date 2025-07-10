
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "@/components/AuthForm";
import { Navigation } from "@/components/Navigation";
import { HabitTracker } from "@/components/HabitTracker";
import { KnowledgeZone } from "@/components/KnowledgeZone";
import { FitnessZone } from "@/components/FitnessZone";
import { ProductivityZone } from "@/components/ProductivityZone";
import { XPDisplay } from "@/components/XPDisplay";
import { GoalsManager } from "@/components/GoalsManager";
import { AccountSettings } from "@/components/AccountSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  Brain, 
  Dumbbell, 
  Clock, 
  ArrowRight
} from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState("dashboard");

  // Show auth form if user is not logged in
  if (!user) {
    return <AuthForm />;
  }

  const renderMainContent = () => {
    switch (currentView) {
      case "habits":
        return <HabitTracker />;
      case "knowledge":
        return <KnowledgeZone />;
      case "fitness":
        return <FitnessZone />;
      case "productivity":
        return <ProductivityZone />;
      case "profile":
        return <AccountSettings />;
      case "goals":
        return <GoalsManager />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
              <div className="relative z-10">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  MANMODE
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Welcome back, {user.name}! Ready to dominate today?
                </p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Flame className="h-8 w-8 text-orange-500" />
                  <span className="text-2xl font-semibold">BE BETTER THAN YESTERDAY</span>
                  <Flame className="h-8 w-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Daily Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card 
                className="border-orange-200 bg-gradient-to-br from-orange-50 to-white cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setCurrentView("goals")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    Today's Goals
                    <ArrowRight className="h-4 w-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
                    <p className="text-sm text-gray-600">Click to manage</p>
                  </div>
                </CardContent>
              </Card>

              <XPDisplay />

              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Flame className="h-5 w-5" />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{user.streak}</div>
                    <p className="text-sm text-gray-600">Days of consistency</p>
                    <Badge variant="secondary" className="mt-2">
                      On Fire! 🔥
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView("habits")}>
                <CardContent className="p-6 text-center">
                  <Dumbbell className="h-8 w-8 text-red-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Track Habits</h3>
                  <p className="text-sm text-gray-600">Build consistency daily</p>
                  <ArrowRight className="h-4 w-4 mx-auto mt-3 text-gray-400" />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView("knowledge")}>
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Knowledge Zone</h3>
                  <p className="text-sm text-gray-600">Learn and grow daily</p>
                  <ArrowRight className="h-4 w-4 mx-auto mt-3 text-gray-400" />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView("productivity")}>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Productivity</h3>
                  <p className="text-sm text-gray-600">Focus and achieve</p>
                  <ArrowRight className="h-4 w-4 mx-auto mt-3 text-gray-400" />
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Index;
