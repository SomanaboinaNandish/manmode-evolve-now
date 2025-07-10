
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Calendar, 
  Trophy, 
  Flame, 
  Brain, 
  Dumbbell, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Zap,
  Star,
  User
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { HabitTracker } from "@/components/HabitTracker";
import { KnowledgeZone } from "@/components/KnowledgeZone";
import { XPDisplay } from "@/components/XPDisplay";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const todaysGoals = [
    { id: 1, title: "Morning Workout", completed: true, category: "Fitness" },
    { id: 2, title: "Read 30 minutes", completed: false, category: "Mental" },
    { id: 3, title: "Drink 8 glasses of water", completed: false, category: "Health" },
    { id: 4, title: "No social media before 6 PM", completed: true, category: "Discipline" }
  ];

  const completedGoals = todaysGoals.filter(goal => goal.completed).length;
  const progressPercentage = (completedGoals / todaysGoals.length) * 100;

  const renderMainContent = () => {
    switch (currentView) {
      case "habits":
        return <HabitTracker />;
      case "knowledge":
        return <KnowledgeZone />;
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
                  Transform into your best self. Build discipline, strength, and character.
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
              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Target className="h-5 w-5" />
                    Today's Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Goals Completed</span>
                      <span className="text-2xl font-bold text-orange-600">
                        {completedGoals}/{todaysGoals.length}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <p className="text-xs text-gray-600">
                      {progressPercentage.toFixed(0)}% completed
                    </p>
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
                    <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                    <p className="text-sm text-gray-600">Days of consistency</p>
                    <Badge variant="secondary" className="mt-2">
                      On Fire! 🔥
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-700" />
                  Today's Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysGoals.map((goal) => (
                    <div key={goal.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 
                          className={`h-5 w-5 ${goal.completed ? 'text-green-500' : 'text-gray-400'}`}
                        />
                        <span className={goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                          {goal.title}
                        </span>
                      </div>
                      <Badge variant={goal.completed ? "default" : "outline"}>
                        {goal.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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
