
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell, 
  Target, 
  Clock, 
  Trophy,
  ArrowRight,
  Play,
  Calendar,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export const FitnessZone = () => {
  const [todayWorkout, setTodayWorkout] = useState({
    title: "Push Day - Chest & Triceps",
    exercises: [
      { id: 1, name: "Bench Press", sets: "4x8-10", completed: false },
      { id: 2, name: "Incline Dumbbell Press", sets: "3x10-12", completed: false },
      { id: 3, name: "Dips", sets: "3x12-15", completed: false },
      { id: 4, name: "Tricep Extensions", sets: "3x12-15", completed: false }
    ]
  });

  const workoutPlans = [
    {
      id: 1,
      title: "Beginner Full Body",
      duration: "45 min",
      level: "Beginner",
      exercises: 8,
      color: "bg-green-100 text-green-700"
    },
    {
      id: 2,
      title: "Push Pull Legs",
      duration: "60 min",
      level: "Intermediate", 
      exercises: 12,
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: 3,
      title: "Advanced Split",
      duration: "75 min",
      level: "Advanced",
      exercises: 15,
      color: "bg-red-100 text-red-700"
    }
  ];

  const startExercise = (exerciseId: number) => {
    alert(`Starting ${todayWorkout.exercises.find(e => e.id === exerciseId)?.name}! Let's go!`);
  };

  const completeExercise = (exerciseId: number) => {
    setTodayWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(exercise =>
        exercise.id === exerciseId ? { ...exercise, completed: true } : exercise
      )
    }));
  };

  const completeWorkout = () => {
    setTodayWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(exercise => ({ ...exercise, completed: true }))
    }));
    alert("Workout completed! Great job! 💪");
  };

  const viewPlan = (planId: number) => {
    const plan = workoutPlans.find(p => p.id === planId);
    alert(`Viewing ${plan?.title} workout plan!`);
  };

  const openSchedule = () => {
    alert("Opening weekly workout schedule!");
  };

  const openProgressTracking = () => {
    alert("Opening progress tracking!");
  };

  const completedExercises = todayWorkout.exercises.filter(e => e.completed).length;
  const totalExercises = todayWorkout.exercises.length;

  const stats = [
    { label: "Workouts This Week", value: "4/6", color: "text-blue-600" },
    { label: "Total Workouts", value: "47", color: "text-green-600" },
    { label: "Current Streak", value: "12 days", color: "text-orange-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Fitness Zone</h1>
        <p className="text-gray-600">Build strength, discipline, and character</p>
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

      {/* Today's Workout */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Dumbbell className="h-5 w-5" />
            Today's Workout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{todayWorkout.title}</h3>
              <Badge variant="outline">
                {completedExercises}/{totalExercises} completed
              </Badge>
            </div>
            
            <div className="space-y-3">
              {todayWorkout.exercises.map((exercise) => (
                <div key={exercise.id} className="flex items-center justify-between p-3 rounded-lg border bg-white">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      exercise.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                      {exercise.completed && <CheckCircle2 className="h-4 w-4 text-white" />}
                    </div>
                    <div>
                      <span className={`font-medium ${exercise.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {exercise.name}
                      </span>
                      <p className="text-sm text-gray-600">{exercise.sets}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!exercise.completed && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => startExercise(exercise.id)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => completeExercise(exercise.id)}
                        >
                          Done
                        </Button>
                      </>
                    )}
                    {exercise.completed && (
                      <Badge className="bg-green-100 text-green-700">
                        <Trophy className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full" 
              onClick={completeWorkout}
              disabled={completedExercises === totalExercises}
            >
              <Trophy className="h-4 w-4 mr-2" />
              {completedExercises === totalExercises ? 'Workout Completed!' : 'Complete All Exercises'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workout Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Workout Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workoutPlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={plan.color}>{plan.level}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {plan.duration}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{plan.title}</h3>
                    <p className="text-sm text-gray-600">{plan.exercises} exercises</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => viewPlan(plan.id)}
                  >
                    View Plan
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={openSchedule}>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Weekly Schedule</h3>
            <p className="text-sm text-gray-600">Plan your workout week</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={openProgressTracking}>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Progress Tracking</h3>
            <p className="text-sm text-gray-600">Track your gains</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
