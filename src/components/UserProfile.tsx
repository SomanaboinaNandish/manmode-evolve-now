
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Trophy, 
  Target, 
  Calendar,
  Settings,
  Award,
  Flame,
  Star,
  TrendingUp,
  Clock
} from "lucide-react";

export const UserProfile = () => {
  const userStats = {
    name: "Alpha Warrior",
    level: 12,
    xp: 2850,
    nextLevelXP: 3000,
    streak: 15,
    totalHabits: 8,
    completedGoals: 47,
    joinDate: "Jan 2024"
  };

  const achievements = [
    { id: 1, title: "Early Bird", description: "Wake up early for 7 days straight", earned: true, icon: "🌅" },
    { id: 2, title: "Fitness Beast", description: "Complete 30 workouts", earned: true, icon: "💪" },
    { id: 3, title: "Knowledge Seeker", description: "Read 50 articles", earned: true, icon: "📚" },
    { id: 4, title: "Consistency King", description: "Maintain 30-day streak", earned: false, icon: "👑" },
    { id: 5, title: "Productivity Master", description: "Complete 100 focus sessions", earned: false, icon: "⚡" },
    { id: 6, title: "Discipline Warrior", description: "Complete all daily goals for 14 days", earned: false, icon: "🛡️" }
  ];

  const weeklyProgress = [
    { day: "Mon", completion: 100 },
    { day: "Tue", completion: 85 },
    { day: "Wed", completion: 90 },
    { day: "Thu", completion: 100 },
    { day: "Fri", completion: 75 },
    { day: "Sat", completion: 95 },
    { day: "Sun", completion: 80 }
  ];

  const categories = [
    { name: "Fitness", level: 8, progress: 65, color: "bg-red-500" },
    { name: "Mental", level: 6, progress: 40, color: "bg-blue-500" },
    { name: "Discipline", level: 10, progress: 85, color: "bg-orange-500" },
    { name: "Health", level: 7, progress: 55, color: "bg-green-500" }
  ];

  const xpProgress = (userStats.xp / userStats.nextLevelXP) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mx-auto flex items-center justify-center">
          <User className="h-12 w-12 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{userStats.name}</h1>
          <p className="text-gray-600">Level {userStats.level} • Member since {userStats.joinDate}</p>
        </div>
      </div>

      {/* XP Progress */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Level Progress</span>
              <span className="text-sm text-gray-600">{userStats.xp}/{userStats.nextLevelXP} XP</span>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Level {userStats.level}</span>
              <span>{userStats.nextLevelXP - userStats.xp} XP to next level</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userStats.streak}</div>
            <p className="text-sm text-gray-600">Day Streak</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userStats.totalHabits}</div>
            <p className="text-sm text-gray-600">Active Habits</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userStats.completedGoals}</div>
            <p className="text-sm text-gray-600">Goals Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userStats.level}</div>
            <p className="text-sm text-gray-600">Current Level</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-700" />
            Category Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category.name}</span>
                  <Badge variant="outline">Level {category.level}</Badge>
                </div>
                <Progress value={category.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-700" />
            This Week's Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-600 mb-2">{day.day}</div>
                <div className="h-16 bg-gray-100 rounded flex items-end">
                  <div 
                    className="w-full bg-orange-500 rounded"
                    style={{ height: `${day.completion}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{day.completion}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-gray-700" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-lg border ${
                  achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                    <Badge className="bg-green-100 text-green-700">Earned</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardContent className="p-6">
          <Button variant="outline" className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
