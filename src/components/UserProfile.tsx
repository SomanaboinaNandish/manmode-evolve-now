
import { useState } from "react";
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
  Award,
  Flame,
  Star,
  TrendingUp,
  Clock,
  Crown,
  Zap,
  Brain,
  Dumbbell,
  BookOpen,
  CheckCircle,
  Gift,
  Sparkles
} from "lucide-react";

export const UserProfile = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'stats'>('overview');

  if (!user) return null;

  const dynamicAchievements = [
    { 
      id: 1, 
      title: "Early Bird", 
      description: "Wake up early for 7 days straight", 
      earned: user.streak >= 7, 
      icon: "🌅", 
      points: 50,
      category: "Discipline",
      rarity: "Common"
    },
    { 
      id: 2, 
      title: "Fitness Beast", 
      description: "Complete 30 workouts", 
      earned: (user.workoutsCompleted || 0) >= 30, 
      icon: "💪", 
      points: 100,
      category: "Fitness",
      rarity: "Rare"
    },
    { 
      id: 3, 
      title: "Knowledge Seeker", 
      description: "Read for 10 hours total", 
      earned: (user.totalReadingTime || 0) >= 600, 
      icon: "📚", 
      points: 75,
      category: "Mental",
      rarity: "Uncommon"
    },
    { 
      id: 4, 
      title: "Consistency King", 
      description: "Maintain 30-day streak", 
      earned: user.streak >= 30, 
      icon: "👑", 
      points: 200,
      category: "Discipline",
      rarity: "Legendary"
    },
    { 
      id: 5, 
      title: "Focus Master", 
      description: "Complete 100 focus sessions", 
      earned: (user.focusSessionsTotal || 0) >= 100, 
      icon: "⚡", 
      points: 150,
      category: "Mental",
      rarity: "Epic"
    },
    { 
      id: 6, 
      title: "Goal Crusher", 
      description: "Complete 50 daily goals", 
      earned: (user.goalsCompleted || 0) >= 50, 
      icon: "🎯", 
      points: 120,
      category: "Productivity",
      rarity: "Rare"
    }
  ];

  const weeklyProgress = [
    { day: "Mon", completion: user.weeklyProgress?.[0] || Math.floor(Math.random() * 40) + 60, xp: user.weeklyXP?.[0] || Math.floor(Math.random() * 50) + 100 },
    { day: "Tue", completion: user.weeklyProgress?.[1] || Math.floor(Math.random() * 40) + 60, xp: user.weeklyXP?.[1] || Math.floor(Math.random() * 50) + 100 },
    { day: "Wed", completion: user.weeklyProgress?.[2] || Math.floor(Math.random() * 40) + 60, xp: user.weeklyXP?.[2] || Math.floor(Math.random() * 50) + 100 },
    { day: "Thu", completion: user.weeklyProgress?.[3] || Math.floor(Math.random() * 40) + 60, xp: user.weeklyXP?.[3] || Math.floor(Math.random() * 50) + 100 },
    { day: "Fri", completion: user.weeklyProgress?.[4] || Math.floor(Math.random() * 40) + 60, xp: user.weeklyXP?.[4] || Math.floor(Math.random() * 50) + 100 },
    { day: "Sat", completion: user.weeklyProgress?.[5] || Math.floor(Math.random() * 40) + 60, xp: user.weeklyXP?.[5] || Math.floor(Math.random() * 50) + 100 },
    { day: "Sun", completion: user.weeklyProgress?.[6] || Math.floor(Math.random() * 40) + 60, xp: user.weeklyXP?.[6] || Math.floor(Math.random() * 50) + 100 }
  ];

  const categories = [
    { 
      name: "Fitness", 
      level: Math.floor((user.workoutsCompleted || 0) / 5) + 1, 
      progress: ((user.workoutsCompleted || 0) % 5) * 20, 
      color: "bg-red-500", 
      xp: (user.workoutsCompleted || 0) * 50,
      icon: Dumbbell
    },
    { 
      name: "Mental", 
      level: Math.floor((user.totalReadingTime || 0) / 60) + 1, 
      progress: ((user.totalReadingTime || 0) % 60) * 1.67, 
      color: "bg-blue-500", 
      xp: (user.totalReadingTime || 0) * 2,
      icon: Brain
    },
    { 
      name: "Discipline", 
      level: Math.floor(user.streak / 7) + 1, 
      progress: (user.streak % 7) * 14.28, 
      color: "bg-orange-500", 
      xp: user.streak * 10,
      icon: Target
    },
    { 
      name: "Knowledge", 
      level: Math.floor((user.totalReadingTime || 0) / 120) + 1, 
      progress: ((user.totalReadingTime || 0) % 120) * 0.83, 
      color: "bg-green-500", 
      xp: (user.totalReadingTime || 0) * 3,
      icon: BookOpen
    }
  ];

  const xpProgress = (user.xp / user.nextLevelXP) * 100;
  const earnedAchievements = dynamicAchievements.filter(a => a.earned);
  const totalAchievementXP = earnedAchievements.reduce((sum, a) => sum + a.points, 0);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-700';
      case 'Uncommon': return 'bg-green-100 text-green-700';
      case 'Rare': return 'bg-blue-100 text-blue-700';
      case 'Epic': return 'bg-purple-100 text-purple-700';
      case 'Legendary': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Profile Header */}
      <Card className="border-none bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                <Crown className="h-4 w-4 text-yellow-800" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-lg text-gray-600 mb-3">Level {user.level} Warrior • {user.xp} XP</p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-orange-100 text-orange-700 px-3 py-1">
                  <Flame className="h-4 w-4 mr-2" />
                  {user.streak} Day Streak
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Member since {user.joinDate}
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-700 px-3 py-1">
                  <Trophy className="h-4 w-4 mr-2" />
                  {earnedAchievements.length} Achievements
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 px-3 py-1">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Rank: Elite
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'stats', label: 'Statistics', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? "default" : "ghost"}
              onClick={() => setSelectedTab(tab.id as any)}
              className="flex-1"
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Enhanced XP Progress */}
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Level Progress</span>
                  <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                    {user.xp}/{user.nextLevelXP} XP
                  </span>
                </div>
                <Progress value={xpProgress} className="h-4" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Level {user.level}</span>
                  <span>{user.nextLevelXP - user.xp} XP to next level</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-orange-500 bg-orange-50 p-3 rounded-lg">
                  <Gift className="h-5 w-5" />
                  <span className="font-medium">+{totalAchievementXP} bonus XP from achievements</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Flame, value: user.streak, label: "Day Streak", color: "text-orange-500" },
              { icon: Target, value: user.goalsCompleted || 0, label: "Goals Done", color: "text-blue-500" },
              { icon: Trophy, value: earnedAchievements.length, label: "Achievements", color: "text-yellow-500" },
              { icon: Star, value: user.level, label: "Current Level", color: "text-purple-500" }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-gray-50 rounded-full w-fit mx-auto mb-3">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Category Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-700" />
                Category Mastery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Icon className="h-5 w-5 text-gray-700" />
                          </div>
                          <span className="font-medium text-lg">{category.name}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">Level {category.level}</Badge>
                          <Badge variant="secondary">{category.xp} XP</Badge>
                        </div>
                      </div>
                      <Progress value={category.progress} className="h-3" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'achievements' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-gray-700" />
                Achievement Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dynamicAchievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg' 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-3xl p-3 rounded-full ${achievement.earned ? 'bg-green-100' : 'bg-gray-200'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-bold text-lg ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                            {achievement.title}
                          </h3>
                          <Badge className={getRarityColor(achievement.rarity)} variant="secondary">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {achievement.category}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-orange-600">+{achievement.points} XP</span>
                            {achievement.earned && (
                              <Badge className="bg-green-100 text-green-700">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Earned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'stats' && (
        <div className="space-y-6">
          {/* Weekly Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-700" />
                Weekly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-3">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">{day.day}</div>
                    <div className="h-20 bg-gray-100 rounded-lg flex items-end overflow-hidden">
                      <div 
                        className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-lg transition-all duration-500"
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

          {/* Detailed Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Workouts</span>
                    <span className="font-bold">{user.workoutsCompleted || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Reading Time</span>
                    <span className="font-bold">{Math.floor((user.totalReadingTime || 0) / 60)}h {(user.totalReadingTime || 0) % 60}m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Focus Sessions</span>
                    <span className="font-bold">{user.focusSessionsTotal || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Goals Completed</span>
                    <span className="font-bold">{user.goalsCompleted || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">XP Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>From Workouts</span>
                    <span className="font-bold text-red-600">+{(user.workoutsCompleted || 0) * 50}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>From Reading</span>
                    <span className="font-bold text-blue-600">+{(user.totalReadingTime || 0) * 2}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>From Focus</span>
                    <span className="font-bold text-purple-600">+{(user.focusSessionsTotal || 0) * 25}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>From Achievements</span>
                    <span className="font-bold text-yellow-600">+{totalAchievementXP}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
