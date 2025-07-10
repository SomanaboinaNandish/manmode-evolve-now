
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
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
  Clock,
  Crown,
  Zap
} from "lucide-react";

export const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const achievements = [
    { id: 1, title: "Early Bird", description: "Wake up early for 7 days straight", earned: true, icon: "🌅", points: 50 },
    { id: 2, title: "Fitness Beast", description: "Complete 30 workouts", earned: true, icon: "💪", points: 100 },
    { id: 3, title: "Knowledge Seeker", description: "Read 50 articles", earned: true, icon: "📚", points: 75 },
    { id: 4, title: "Consistency King", description: "Maintain 30-day streak", earned: user.streak >= 30, icon: "👑", points: 200 },
    { id: 5, title: "Focus Master", description: "Complete 100 focus sessions", earned: false, icon: "⚡", points: 150 },
    { id: 6, title: "Discipline Warrior", description: "Complete all daily goals for 14 days", earned: false, icon: "🛡️", points: 120 }
  ];

  const weeklyProgress = [
    { day: "Mon", completion: 100, xp: 150 },
    { day: "Tue", completion: 85, xp: 130 },
    { day: "Wed", completion: 90, xp: 140 },
    { day: "Thu", completion: 100, xp: 150 },
    { day: "Fri", completion: 75, xp: 110 },
    { day: "Sat", completion: 95, xp: 145 },
    { day: "Sun", completion: 80, xp: 120 }
  ];

  const categories = [
    { name: "Fitness", level: 8, progress: 65, color: "bg-red-500", xp: 850 },
    { name: "Mental", level: 6, progress: 40, color: "bg-blue-500", xp: 620 },
    { name: "Discipline", level: 10, progress: 85, color: "bg-orange-500", xp: 1050 },
    { name: "Health", level: 7, progress: 55, color: "bg-green-500", xp: 720 }
  ];

  const xpProgress = (user.xp / user.nextLevelXP) * 100;
  const earnedAchievements = achievements.filter(a => a.earned);
  const totalAchievementXP = earnedAchievements.reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">Level {user.level} • {user.xp} XP</p>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-orange-100 text-orange-700">
                  <Flame className="h-3 w-3 mr-1" />
                  {user.streak} Day Streak
                </Badge>
                <Badge variant="outline">
                  Member since {user.joinDate}
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-700">
                  <Crown className="h-3 w-3 mr-1" />
                  {earnedAchievements.length} Achievements
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* XP Progress */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Level Progress</span>
              <span className="text-sm text-gray-600">{user.xp}/{user.nextLevelXP} XP</span>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Level {user.level}</span>
              <span>{user.nextLevelXP - user.xp} XP to next level</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-orange-500">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">+{totalAchievementXP} XP from achievements</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{user.streak}</div>
            <p className="text-sm text-gray-600">Day Streak</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-sm text-gray-600">Active Habits</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">47</div>
            <p className="text-sm text-gray-600">Goals Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{user.level}</div>
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
                  <div className="flex gap-2">
                    <Badge variant="outline">Level {category.level}</Badge>
                    <Badge variant="secondary">{category.xp} XP</Badge>
                  </div>
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
                <div className="text-xs text-orange-600 font-medium">+{day.xp} XP</div>
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
            Achievements & Awards
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
                    <p className="text-xs text-orange-600 font-medium">+{achievement.points} XP</p>
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
    </div>
  );
};
