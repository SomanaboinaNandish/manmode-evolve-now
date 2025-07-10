
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Dumbbell, 
  CheckCircle2, 
  Play,
  Trophy,
  Clock
} from "lucide-react";

interface WorkoutDay {
  day: string;
  type: string;
  exercises: string[];
  duration: string;
  completed: boolean;
}

export const WorkoutSchedule = () => {
  const [currentWeek, setCurrentWeek] = useState<WorkoutDay[]>([
    {
      day: 'Monday',
      type: 'Push (Chest, Shoulders, Triceps)',
      exercises: ['Bench Press', 'Shoulder Press', 'Dips', 'Tricep Extensions'],
      duration: '60 min',
      completed: true
    },
    {
      day: 'Tuesday',
      type: 'Pull (Back, Biceps)',
      exercises: ['Pull-ups', 'Rows', 'Deadlifts', 'Bicep Curls'],
      duration: '60 min',
      completed: false
    },
    {
      day: 'Wednesday',
      type: 'Legs (Quads, Hamstrings, Glutes)',
      exercises: ['Squats', 'Leg Press', 'Lunges', 'Calf Raises'],
      duration: '75 min',
      completed: false
    },
    {
      day: 'Thursday',
      type: 'Push (Chest, Shoulders, Triceps)',
      exercises: ['Incline Press', 'Lateral Raises', 'Close-Grip Press', 'Skull Crushers'],
      duration: '60 min',
      completed: false
    },
    {
      day: 'Friday',
      type: 'Pull (Back, Biceps)',
      exercises: ['Lat Pulldowns', 'Cable Rows', 'Face Pulls', 'Hammer Curls'],
      duration: '60 min',
      completed: false
    },
    {
      day: 'Saturday',
      type: 'Legs & Core',
      exercises: ['Romanian Deadlifts', 'Bulgarian Squats', 'Planks', 'Russian Twists'],
      duration: '75 min',
      completed: false
    },
    {
      day: 'Sunday',
      type: 'Rest Day',
      exercises: ['Active Recovery', 'Light Stretching', 'Walk'],
      duration: '30 min',
      completed: false
    }
  ]);

  const completeWorkout = (dayIndex: number) => {
    setCurrentWeek(prev => prev.map((day, index) => 
      index === dayIndex ? { ...day, completed: true } : day
    ));
  };

  const completedWorkouts = currentWeek.filter(day => day.completed && day.type !== 'Rest Day').length;
  const totalWorkouts = currentWeek.filter(day => day.type !== 'Rest Day').length;
  
  return (
    <div className="space-y-6">
      {/* Weekly Progress */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Calendar className="h-5 w-5" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Workouts Completed</span>
              <span className="text-2xl font-bold text-blue-600">
                {completedWorkouts}/{totalWorkouts}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedWorkouts / totalWorkouts) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Week of {new Date().toLocaleDateString()}</span>
              <span>{((completedWorkouts / totalWorkouts) * 100).toFixed(0)}% complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-gray-700" />
            This Week's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentWeek.map((workout, index) => (
              <div 
                key={workout.day}
                className={`p-4 rounded-lg border ${
                  workout.completed 
                    ? 'bg-green-50 border-green-200' 
                    : workout.type === 'Rest Day'
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      workout.completed 
                        ? 'bg-green-500 text-white'
                        : workout.type === 'Rest Day'
                        ? 'bg-gray-300 text-gray-600'
                        : 'bg-orange-500 text-white'
                    }`}>
                      {workout.completed ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Dumbbell className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{workout.day}</h3>
                      <p className="text-sm text-gray-600">{workout.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {workout.duration}
                    </Badge>
                    {!workout.completed && workout.type !== 'Rest Day' && (
                      <Button
                        onClick={() => completeWorkout(index)}
                        size="sm"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    )}
                    {workout.completed && (
                      <Badge className="bg-green-100 text-green-700">
                        <Trophy className="h-3 w-3 mr-1" />
                        Done
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="ml-13">
                  <div className="flex flex-wrap gap-2">
                    {workout.exercises.map((exercise, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {exercise}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
