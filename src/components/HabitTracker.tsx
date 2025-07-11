import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  Droplets, 
  Book, 
  Dumbbell,
  Sun,
  Phone,
  Target,
  Plus,
  X
} from "lucide-react";

interface Habit {
  id: number;
  name: string;
  icon: any;
  streak: number;
  completedToday: boolean;
  category: string;
  target: number;
  completed: number;
}

export const HabitTracker = () => {
  const { addXP, updateStreak } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Early Morning Workout",
      icon: Dumbbell,
      streak: 12,
      completedToday: false,
      category: "Fitness",
      target: 1,
      completed: 0
    },
    {
      id: 2,
      name: "Drink 8 Glasses of Water",
      icon: Droplets,
      streak: 8,
      completedToday: false,
      category: "Health",
      target: 8,
      completed: 5
    },
    {
      id: 3,
      name: "Read for 30 Minutes",
      icon: Book,
      streak: 5,
      completedToday: false,
      category: "Mental",
      target: 30,
      completed: 0
    },
    {
      id: 4,
      name: "Wake Up at 6 AM",
      icon: Sun,
      streak: 15,
      completedToday: false,
      category: "Discipline",
      target: 1,
      completed: 0
    },
    {
      id: 5,
      name: "No Phone First Hour",
      icon: Phone,
      streak: 3,
      completedToday: false,
      category: "Discipline",
      target: 1,
      completed: 0
    }
  ]);

  const toggleHabit = (habitId: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = !habit.completedToday;
        
        if (newCompleted) {
          addXP(15); // Award 15 XP for completing a habit
          updateStreak(); // Update streak when completing a habit
        } else {
          addXP(-15); // Remove XP when unchecking
        }
        
        return { 
          ...habit, 
          completedToday: newCompleted,
          streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          completed: newCompleted ? habit.target : 0
        };
      }
      return habit;
    }));
  };

  const addNewHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now(),
        name: newHabitName,
        icon: Target,
        streak: 0,
        completedToday: false,
        category: "Personal",
        target: 1,
        completed: 0
      };
      setHabits([...habits, newHabit]);
      setNewHabitName("");
      setShowAddForm(false);
    }
  };

  const completedHabits = habits.filter(h => h.completedToday).length;
  const completionRate = (completedHabits / habits.length) * 100;

  const getCategoryColor = (category: string) => {
    const colors = {
      "Fitness": "bg-red-100 text-red-700",
      "Health": "bg-blue-100 text-blue-700",
      "Mental": "bg-purple-100 text-purple-700",
      "Discipline": "bg-orange-100 text-orange-700",
      "Personal": "bg-green-100 text-green-700"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
        <p className="text-gray-600">Build consistency, build character</p>
      </div>

      {/* Progress Overview */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Target className="h-5 w-5" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Habits Completed</span>
              <span className="text-3xl font-bold text-orange-600">
                {completedHabits}/{habits.length}
              </span>
            </div>
            <Progress value={completionRate} className="h-4" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{completionRate.toFixed(0)}% completed</span>
              <span className="text-orange-600 font-medium">
                {completedHabits === habits.length ? "Perfect Day! 🔥" : "Keep going!"}
              </span>
            </div>
            <div className="text-center text-sm text-gray-600">
              +{completedHabits * 15} XP earned from habits today
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Habit List */}
      <div className="grid gap-4">
        {habits.map((habit) => {
          const Icon = habit.icon;
          const progressPercentage = (habit.completed / habit.target) * 100;
          
          return (
            <Card 
              key={habit.id} 
              className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                habit.completedToday ? 'bg-green-50 border-green-200' : 'bg-white'
              }`}
              onClick={() => toggleHabit(habit.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${habit.completedToday ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Icon className={`h-6 w-6 ${habit.completedToday ? 'text-green-600' : 'text-gray-600'}`} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className={`font-semibold ${habit.completedToday ? 'text-green-900' : 'text-gray-900'}`}>
                          {habit.name}
                        </h3>
                        <Badge variant="outline" className={getCategoryColor(habit.category)}>
                          {habit.category}
                        </Badge>
                        {habit.completedToday && (
                          <Badge className="bg-green-100 text-green-700">
                            +15 XP
                          </Badge>
                        )}
                      </div>
                      
                      {habit.target > 1 && (
                        <div className="space-y-1">
                          <Progress value={progressPercentage} className="h-2 w-48" />
                          <span className="text-xs text-gray-600">
                            {habit.completed}/{habit.target} completed
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-gray-600">
                          {habit.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {habit.completedToday ? (
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    ) : (
                      <Circle className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add New Habit */}
      {showAddForm ? (
        <Card className="border-dashed border-2 border-orange-300 bg-orange-50">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Add New Habit</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter habit name..."
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNewHabit()}
                  className="flex-1"
                />
                <Button onClick={addNewHabit}>
                  Add Habit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button 
          variant="outline" 
          className="w-full py-6 border-dashed border-2 hover:border-orange-300 hover:bg-orange-50"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Habit
        </Button>
      )}
    </div>
  );
};
