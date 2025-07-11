import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Dumbbell, 
  Target, 
  Clock, 
  Trophy,
  ArrowRight,
  Play,
  TrendingUp,
  CheckCircle2,
  Calendar,
  X,
  AlertCircle
} from "lucide-react";

export const FitnessZone = () => {
  const { user, updateUser } = useAuth();
  const [currentView, setCurrentView] = useState<'main' | 'schedule' | 'plan' | 'progress'>('main');
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [activePlan, setActivePlan] = useState<number | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<{ show: boolean; exerciseId: number | null }>({ show: false, exerciseId: null });
  
  const [todayWorkout, setTodayWorkout] = useState({
    title: "Push Day - Chest & Triceps",
    exercises: [
      { id: 1, name: "Bench Press", sets: "4x8-10", completed: false, image: "💪" },
      { id: 2, name: "Incline Dumbbell Press", sets: "3x10-12", completed: false, image: "🏋️" },
      { id: 3, name: "Dips", sets: "3x12-15", completed: false, image: "💪" },
      { id: 4, name: "Tricep Extensions", sets: "3x12-15", completed: false, image: "🔥" }
    ]
  });

  const workoutPlans = [
    {
      id: 1,
      title: "Beginner Full Body",
      duration: "45 min",
      level: "Beginner",
      exercises: [
        "Push-ups", "Squats", "Pull-ups", "Planks", "Lunges", "Burpees", "Mountain Climbers", "Jumping Jacks"
      ],
      color: "bg-green-100 text-green-700",
      schedule: ["Monday", "Wednesday", "Friday"]
    },
    {
      id: 2,
      title: "Push Pull Legs",
      duration: "60 min",
      level: "Intermediate", 
      exercises: [
        "Bench Press", "Overhead Press", "Tricep Dips", "Pull-ups", "Rows", "Bicep Curls", 
        "Squats", "Deadlifts", "Leg Press", "Calf Raises", "Lunges", "Leg Curls"
      ],
      color: "bg-blue-100 text-blue-700",
      schedule: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"]
    },
    {
      id: 3,
      title: "Advanced Split",
      duration: "75 min",
      level: "Advanced",
      exercises: [
        "Heavy Squats", "Deadlifts", "Bench Press", "Military Press", "Pull-ups", "Dips",
        "Barbell Rows", "Incline Press", "Bulgarian Squats", "Romanian Deadlifts", "Face Pulls", 
        "Weighted Planks", "Farmer's Walks", "Battle Ropes", "Box Jumps"
      ],
      color: "bg-red-100 text-red-700",
      schedule: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }
  ];

  const [weeklySchedule, setWeeklySchedule] = useState([
    { day: 'Monday', type: 'Push (Chest, Shoulders, Triceps)', completed: true },
    { day: 'Tuesday', type: 'Pull (Back, Biceps)', completed: false },
    { day: 'Wednesday', type: 'Legs (Quads, Hamstrings, Glutes)', completed: false },
    { day: 'Thursday', type: 'Push (Chest, Shoulders, Triceps)', completed: false },
    { day: 'Friday', type: 'Pull (Back, Biceps)', completed: false },
    { day: 'Saturday', type: 'Legs & Core', completed: false },
    { day: 'Sunday', type: 'Rest Day', completed: false }
  ]);

  const [progressData, setProgressData] = useState({
    weight: { current: 175, goal: 180 },
    strength: {
      bench: 185,
      squat: 225,
      deadlift: 275
    },
    workouts: {
      thisWeek: 4,
      total: 47,
      streak: 12
    }
  });

  const startExercise = (exerciseId: number) => {
    const exercise = todayWorkout.exercises.find(e => e.id === exerciseId);
    alert(`Starting ${exercise?.name}! Timer started for ${exercise?.sets}. Let's go! 💪`);
  };

  const confirmCompleteExercise = (exerciseId: number) => {
    setShowConfirmDialog({ show: true, exerciseId });
  };

  const completeExercise = (exerciseId: number) => {
    setTodayWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(exercise =>
        exercise.id === exerciseId ? { ...exercise, completed: true } : exercise
      )
    }));
    setShowConfirmDialog({ show: false, exerciseId: null });
  };

  const completeWorkout = () => {
    const incompleteExercises = todayWorkout.exercises.filter(e => !e.completed);
    if (incompleteExercises.length > 0) {
      alert(`Complete all exercises first! ${incompleteExercises.length} exercises remaining.`);
      return;
    }
    
    setTodayWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(exercise => ({ ...exercise, completed: true }))
    }));
    
    // Award XP and update progress
    if (user) {
      updateUser({
        xp: user.xp + 50,
        workoutsCompleted: user.workoutsCompleted + 1
      });
    }
    
    setProgressData(prev => ({
      ...prev,
      workouts: {
        ...prev.workouts,
        thisWeek: prev.workouts.thisWeek + 1,
        total: prev.workouts.total + 1,
        streak: prev.workouts.streak + 1
      }
    }));
    
    alert("Workout completed! Great job! 💪 +50 XP earned!");
  };

  const startPlan = (planId: number) => {
    const plan = workoutPlans.find(p => p.id === planId);
    if (plan) {
      setActivePlan(planId);
      // Create new workout based on plan
      const planExercises = plan.exercises.map((exercise, index) => ({
        id: index + 1,
        name: exercise,
        sets: "3x10-12",
        completed: false,
        image: "💪"
      }));
      
      setTodayWorkout({
        title: `${plan.title} Workout`,
        exercises: planExercises
      });
      
      setCurrentView('main');
      alert(`${plan.title} plan activated! Your workout has been updated.`);
    }
  };

  if (currentView === 'schedule') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setCurrentView('main')}>
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Weekly Schedule</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Plan Your Workout Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklySchedule.map((day, index) => (
                <div key={day.day} className={`p-4 rounded-lg border ${
                  day.completed ? 'bg-green-50 border-green-200' : 
                  day.type === 'Rest Day' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{day.day}</h3>
                      <p className="text-sm text-gray-600">{day.type}</p>
                    </div>
                    {day.type !== 'Rest Day' && (
                      <Button 
                        size="sm" 
                        onClick={() => {
                          setWeeklySchedule(prev => prev.map((d, i) => 
                            i === index ? { ...d, completed: !d.completed } : d
                          ));
                        }}
                      >
                        {day.completed ? 'Completed' : 'Mark Done'}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentView === 'plan' && selectedPlan) {
    const plan = workoutPlans.find(p => p.id === selectedPlan);
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setCurrentView('main')}>
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{plan?.title}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className={plan?.color}>{plan?.level}</Badge>
              <span>{plan?.duration}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Workout Schedule:</h3>
                <div className="flex gap-2 flex-wrap">
                  {plan?.schedule.map(day => (
                    <Badge key={day} variant="outline">{day}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Exercises ({plan?.exercises.length}):</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {plan?.exercises.map((exercise, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">💪</div>
                      <p className="text-sm font-medium">{exercise}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={() => startPlan(plan?.id || 0)}
              >
                Start This Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentView === 'progress') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setCurrentView('main')}>
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weight Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{progressData.weight.current} lbs</div>
                  <p className="text-sm text-gray-600">Current Weight</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Goal: {progressData.weight.goal} lbs</span>
                    <span>+{progressData.weight.goal - progressData.weight.current} lbs to go</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{width: `${(progressData.weight.current / progressData.weight.goal) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Strength Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Bench Press</span>
                  <span className="font-bold">{progressData.strength.bench} lbs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Squat</span>
                  <span className="font-bold">{progressData.strength.squat} lbs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Deadlift</span>
                  <span className="font-bold">{progressData.strength.deadlift} lbs</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workout Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>This Week</span>
                  <span className="font-bold text-blue-600">{progressData.workouts.thisWeek} workouts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Workouts</span>
                  <span className="font-bold text-green-600">{progressData.workouts.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Current Streak</span>
                  <span className="font-bold text-orange-600">{progressData.workouts.streak} days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const completedExercises = todayWorkout.exercises.filter(e => e.completed).length;
  const totalExercises = todayWorkout.exercises.length;

  const stats = [
    { label: "Workouts This Week", value: `${progressData.workouts.thisWeek}/6`, color: "text-blue-600" },
    { label: "Total Workouts", value: progressData.workouts.total.toString(), color: "text-green-600" },
    { label: "Current Streak", value: `${progressData.workouts.streak} days`, color: "text-orange-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Confirmation Dialog */}
      {showConfirmDialog.show && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-orange-500" />
              <h3 className="text-lg font-semibold">Confirm Exercise Completion</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you've completed this exercise? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowConfirmDialog({ show: false, exerciseId: null })}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={() => completeExercise(showConfirmDialog.exerciseId!)}
                className="flex-1"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Yes, Complete
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Fitness Zone</h1>
        <p className="text-gray-600">Build strength, discipline, and character</p>
        {activePlan && (
          <Badge className="bg-blue-100 text-blue-700">
            Active Plan: {workoutPlans.find(p => p.id === activePlan)?.title}
          </Badge>
        )}
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
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{exercise.image}</span>
                      <div>
                        <span className={`font-medium ${exercise.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {exercise.name}
                        </span>
                        <p className="text-sm text-gray-600">{exercise.sets}</p>
                      </div>
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
                          onClick={() => confirmCompleteExercise(exercise.id)}
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
              disabled={completedExercises !== totalExercises}
            >
              <Trophy className="h-4 w-4 mr-2" />
              {completedExercises === totalExercises ? 'Complete Workout (+50 XP)' : `Complete All Exercises (${totalExercises - completedExercises} remaining)`}
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
                    <p className="text-sm text-gray-600">{plan.exercises.length} exercises</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        setCurrentView('plan');
                      }}
                    >
                      View Plan
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => startPlan(plan.id)}
                    >
                      Start Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentView('schedule')}>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Weekly Schedule</h3>
            <p className="text-sm text-gray-600">Plan your workout week</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentView('progress')}>
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
