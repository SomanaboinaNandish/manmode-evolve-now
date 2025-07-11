
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Trash2,
  Calendar 
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  date: string;
}

export const GoalsManager = () => {
  const { user, updateUser, addXP, updateStreak } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({ title: '', category: 'Fitness' });
  const categories = ['Fitness', 'Mental', 'Health', 'Discipline', 'Work', 'Social'];

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('manmode_goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      // Set initial goals if none exist
      const initialGoals = [
        { id: '1', title: 'Morning Workout', category: 'Fitness', completed: false, date: new Date().toISOString().split('T')[0] },
        { id: '2', title: 'Read 30 minutes', category: 'Mental', completed: false, date: new Date().toISOString().split('T')[0] },
        { id: '3', title: 'Drink 8 glasses of water', category: 'Health', completed: false, date: new Date().toISOString().split('T')[0] },
        { id: '4', title: 'No social media before 6 PM', category: 'Discipline', completed: false, date: new Date().toISOString().split('T')[0] }
      ];
      setGoals(initialGoals);
      localStorage.setItem('manmode_goals', JSON.stringify(initialGoals));
    }
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem('manmode_goals', JSON.stringify(goals));
    }
  }, [goals]);

  const addGoal = () => {
    if (newGoal.title.trim()) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        category: newGoal.category,
        completed: false,
        date: new Date().toISOString().split('T')[0]
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', category: 'Fitness' });
    }
  };

  const toggleGoal = (id: string) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === id) {
        const newCompleted = !goal.completed;
        
        // Update user XP and goal count when completing a goal
        if (newCompleted && user) {
          addXP(25); // Award 25 XP for completing a goal
          updateStreak(); // Update streak when completing a goal
          updateUser({
            goalsCompleted: (user.goalsCompleted || 0) + 1
          });
        } else if (!newCompleted && user) {
          // Remove XP and goal count when unchecking
          addXP(-25); // Remove 25 XP
          updateUser({
            goalsCompleted: Math.max(0, (user.goalsCompleted || 0) - 1)
          });
        }
        
        return { ...goal, completed: newCompleted };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
  };

  const deleteGoal = (id: string) => {
    const goalToDelete = goals.find(goal => goal.id === id);
    
    // If deleting a completed goal, remove XP and goal count
    if (goalToDelete?.completed && user) {
      addXP(-25);
      updateUser({
        goalsCompleted: Math.max(0, (user.goalsCompleted || 0) - 1)
      });
    }
    
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const todayGoals = goals.filter(goal => goal.date === new Date().toISOString().split('T')[0]);
  const completedGoals = todayGoals.filter(goal => goal.completed).length;
  const progressPercentage = todayGoals.length > 0 ? (completedGoals / todayGoals.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
        <CardHeader>
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
                {completedGoals}/{todayGoals.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">
              {progressPercentage.toFixed(0)}% completed • +{completedGoals * 25} XP earned today
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add New Goal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter your goal..."
                value={newGoal.title}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                className="flex-1"
              />
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button onClick={addGoal}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
            {todayGoals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      goal.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-orange-500'
                    }`}
                  >
                    {goal.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </button>
                  <span className={goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                    {goal.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={goal.completed ? "default" : "outline"}>
                    {goal.category}
                  </Badge>
                  {goal.completed && (
                    <Badge className="bg-green-100 text-green-700">
                      +25 XP
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {todayGoals.length === 0 && (
              <p className="text-center text-gray-500 py-8">No goals for today. Add one above!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
