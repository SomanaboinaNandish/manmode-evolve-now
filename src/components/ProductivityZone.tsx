import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Brain, 
  Target, 
  Clock, 
  BookOpen,
  TrendingUp,
  Trophy,
  Zap,
  Star,
  Flame,
  CheckCircle,
  Timer,
  Coffee
} from "lucide-react";

export const ProductivityZone = () => {
  const { user, updateUser } = useAuth();
  const [focusMode, setFocusMode] = useState<'none' | 'deep' | 'quick' | 'reading'>('none');
  const [readingSession, setReadingSession] = useState({
    isActive: false,
    timeSpent: 0,
    target: 30,
    currentBook: "The Power of Now"
  });

  const stats = [
    { label: "Focus Sessions Today", value: user?.focusSessionsToday?.toString() || "0", color: "text-blue-600", icon: Target },
    { label: "Total Focus Time", value: `${Math.floor((user?.totalFocusTime || 0) / 60)}h ${(user?.totalFocusTime || 0) % 60}m`, color: "text-green-600", icon: Clock },
    { label: "Current Streak", value: `${user?.streak || 0} days`, color: "text-orange-600", icon: Flame }
  ];

  const achievements = [
    { title: "Focus Master", description: "Complete 10 focus sessions", progress: (user?.focusSessionsToday || 0) * 10, target: 100, earned: (user?.focusSessionsToday || 0) >= 10 },
    { title: "Reading Enthusiast", description: "Read for 2 hours total", progress: (user?.totalReadingTime || 0), target: 120, earned: (user?.totalReadingTime || 0) >= 120 },
    { title: "Consistency King", description: "Maintain 7-day streak", progress: (user?.streak || 0) * 14.28, target: 100, earned: (user?.streak || 0) >= 7 }
  ];

  const startFocusSession = (type: 'deep' | 'quick') => {
    setFocusMode(type);
  };

  const startReadingSession = () => {
    setFocusMode('reading');
    setReadingSession(prev => ({ ...prev, isActive: true }));
  };

  const completeReadingSession = () => {
    const timeSpent = readingSession.timeSpent + 30;
    if (user) {
      updateUser({
        totalReadingTime: user.totalReadingTime + 30,
        xp: user.xp + 20
      });
    }
    setReadingSession(prev => ({ ...prev, isActive: false, timeSpent: 0 }));
    setFocusMode('none');
  };

  if (focusMode === 'reading') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setFocusMode('none')}>
            ← Back to Focus Zone
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Reading Session</h1>
        </div>
        
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Currently Reading</h2>
            <p className="text-lg text-gray-700 mb-4">{readingSession.currentBook}</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Target: {readingSession.target} minutes</p>
                <Progress value={(readingSession.timeSpent / readingSession.target) * 100} className="h-3" />
              </div>
              <Button onClick={completeReadingSession} className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Session (+20 XP)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (focusMode !== 'none') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setFocusMode('none')}>
            ← Back to Focus Zone
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {focusMode === 'deep' ? 'Deep Work Session (90 min)' : 'Quick Focus (15 min)'}
          </h1>
        </div>
        
        <PomodoroTimer 
          initialMode="work"
          initialDuration={focusMode === 'deep' ? 90 * 60 : 15 * 60}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-6 py-12 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-2xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            FOCUS ZONE
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master your mind, maximize your potential
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Zap className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-semibold">UNLEASH YOUR PRODUCTIVITY</span>
            <Zap className="h-6 w-6 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Focus Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 hover:shadow-xl transition-all duration-300 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-700">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Brain className="h-6 w-6" />
              </div>
              Deep Work Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">90 minutes of uninterrupted deep work</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Timer className="h-4 w-4" />
                <span>90 minutes • +75 XP</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Trophy className="h-4 w-4" />
                <span>High Impact Focus</span>
              </div>
              <Button 
                className="w-full group-hover:scale-105 transition-transform" 
                onClick={() => startFocusSession('deep')}
              >
                <Zap className="h-4 w-4 mr-2" />
                Start Deep Work
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 hover:shadow-xl transition-all duration-300 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-700">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Target className="h-6 w-6" />
              </div>
              Quick Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">15 minutes of focused work</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Timer className="h-4 w-4" />
                <span>15 minutes • +25 XP</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Star className="h-4 w-4" />
                <span>Quick Productivity Boost</span>
              </div>
              <Button 
                className="w-full group-hover:scale-105 transition-transform" 
                onClick={() => startFocusSession('quick')}
              >
                <Target className="h-4 w-4 mr-2" />
                Start Quick Focus
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200 group">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">Reading Session</h3>
            <p className="text-sm text-gray-600 mb-4">Dedicated time for learning and growth</p>
            <div className="flex items-center justify-center gap-2 text-sm text-purple-600 mb-4">
              <Coffee className="h-4 w-4" />
              <span>+20 XP per session</span>
            </div>
            <Button onClick={startReadingSession} className="w-full">
              Start Reading
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200 group">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">Progress Review</h3>
            <p className="text-sm text-gray-600 mb-4">Analyze your productivity patterns</p>
            <div className="flex items-center justify-center gap-2 text-sm text-orange-600 mb-4">
              <Trophy className="h-4 w-4" />
              <span>Weekly insights</span>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setFocusMode('none')}>
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Trophy className="h-5 w-5" />
            Focus Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Earned
                    </Badge>
                  )}
                </div>
                <Progress value={Math.min(achievement.progress, achievement.target)} className="h-2" />
                <p className="text-xs text-gray-500">
                  {Math.min(achievement.progress, achievement.target)}/{achievement.target}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
