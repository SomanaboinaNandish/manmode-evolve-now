
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Trophy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const XPDisplay = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const currentXP = user.xp;
  const nextLevelXP = user.nextLevelXP;
  const currentLevel = user.level;
  
  // Dynamic level title based on actual level
  const getLevelTitle = (level: number) => {
    if (level >= 20) return "Legendary Master";
    if (level >= 15) return "Elite Champion";
    if (level >= 10) return "Disciplined Warrior";
    if (level >= 5) return "Rising Fighter";
    return "Beginner Warrior";
  };
  
  const levelTitle = getLevelTitle(currentLevel);
  const xpProgress = (currentXP / nextLevelXP) * 100;
  const xpNeeded = nextLevelXP - currentXP;

  // Calculate today's XP gain (this would be more sophisticated in a real app)
  const todayXP = 150; // This could be calculated from today's activities

  const getLevelBadgeColor = (level: number) => {
    if (level >= 15) return "bg-yellow-100 text-yellow-700 border-yellow-300";
    if (level >= 10) return "bg-purple-100 text-purple-700 border-purple-300";
    if (level >= 5) return "bg-blue-100 text-blue-700 border-blue-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Star className="h-5 w-5" />
          Level & XP
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              Level {currentLevel}
            </div>
            <Badge variant="outline" className={getLevelBadgeColor(currentLevel)}>
              <Trophy className="h-3 w-3 mr-1" />
              {levelTitle}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">XP Progress</span>
              <span className="font-medium text-purple-600">
                {currentXP} / {nextLevelXP}
              </span>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <div className="text-center">
              <span className="text-xs text-gray-500">
                {xpNeeded} XP to next level
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-orange-500">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">+{todayXP} XP today</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
