
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { 
  Brain, 
  Target, 
  Clock, 
  BookOpen,
  TrendingUp,
  Trophy,
  Zap
} from "lucide-react";

export const ProductivityZone = () => {
  const [focusMode, setFocusMode] = useState<'none' | 'deep' | 'quick'>('none');

  const stats = [
    { label: "Focus Sessions Today", value: "3", color: "text-blue-600" },
    { label: "Total Focus Time", value: "2h 45m", color: "text-green-600" },
    { label: "Streak", value: "7 days", color: "text-orange-600" }
  ];

  const startFocusSession = (type: 'deep' | 'quick') => {
    setFocusMode(type);
  };

  if (focusMode !== 'none') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setFocusMode('none')}>
            ← Back to Focus
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {focusMode === 'deep' ? 'Deep Work Session (90 min)' : 'Quick Focus (15 min)'}
          </h1>
        </div>
        
        <PomodoroTimer 
          initialMode={focusMode === 'deep' ? 'work' : 'work'}
          initialDuration={focusMode === 'deep' ? 90 * 60 : 15 * 60}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Focus Zone</h1>
        <p className="text-gray-600">Maximize your productivity and mental clarity</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Focus Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Brain className="h-5 w-5" />
              Deep Work Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">90 minutes of uninterrupted deep work</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>90 minutes</span>
              </div>
              <Button 
                className="w-full" 
                onClick={() => startFocusSession('deep')}
              >
                <Zap className="h-4 w-4 mr-2" />
                Start Deep Work
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Target className="h-5 w-5" />
              Quick Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">15 minutes of focused work</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>15 minutes</span>
              </div>
              <Button 
                className="w-full" 
                onClick={() => startFocusSession('quick')}
              >
                <Target className="h-4 w-4 mr-2" />
                Start Quick Focus
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional productivity features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Reading Session</h3>
            <p className="text-sm text-gray-600">Dedicated time for learning</p>
            <Button variant="outline" className="mt-3">
              Start Reading
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Progress Review</h3>
            <p className="text-sm text-gray-600">Analyze your productivity</p>
            <Button variant="outline" className="mt-3">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
