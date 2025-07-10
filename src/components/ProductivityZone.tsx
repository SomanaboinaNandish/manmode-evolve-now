
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { 
  CheckCircle2,
  Plus,
  Target,
  Zap,
  Timer,
  ListChecks,
  Trash2
} from "lucide-react";

export const ProductivityZone = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete morning workout", completed: true, priority: "high" },
    { id: 2, title: "Review project documentation", completed: false, priority: "medium" },
    { id: 3, title: "Call client about proposal", completed: false, priority: "high" },
    { id: 4, title: "Prepare for team meeting", completed: false, priority: "low" }
  ]);

  const [deepWorkSessions, setDeepWorkSessions] = useState(0);
  const [quickFocusSessions, setQuickFocusSessions] = useState(0);
  const [currentSession, setCurrentSession] = useState<'deep' | 'quick' | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority: "medium"
      }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const getPriorityColor = (priority: string) => {
    const colors = {
      "high": "bg-red-100 text-red-700",
      "medium": "bg-yellow-100 text-yellow-700",
      "low": "bg-green-100 text-green-700"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const startDeepWork = () => {
    setCurrentSession('deep');
    setSessionTime(90 * 60); // 90 minutes in seconds
    setIsSessionActive(true);
    setDeepWorkSessions(prev => prev + 1);
    
    // Start countdown
    const interval = setInterval(() => {
      setSessionTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSessionActive(false);
          setCurrentSession(null);
          alert("Deep Work session completed! Great job! 💪");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startQuickFocus = () => {
    setCurrentSession('quick');
    setSessionTime(15 * 60); // 15 minutes in seconds
    setIsSessionActive(true);
    setQuickFocusSessions(prev => prev + 1);
    
    // Start countdown
    const interval = setInterval(() => {
      setSessionTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSessionActive(false);
          setCurrentSession(null);
          alert("Quick Focus session completed! Well done! ⚡");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const stats = [
    { label: "Focus Sessions Today", value: deepWorkSessions + quickFocusSessions, icon: Timer, color: "text-blue-600" },
    { label: "Tasks Completed", value: `${completedTasks}/${totalTasks}`, icon: CheckCircle2, color: "text-green-600" },
    { label: "Deep Work Hours", value: `${(deepWorkSessions * 1.5).toFixed(1)}h`, icon: Zap, color: "text-purple-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Productivity Zone</h1>
        <p className="text-gray-600">Focus, achieve, and get things done</p>
      </div>

      {/* Current Session Display */}
      {isSessionActive && currentSession && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-orange-700 mb-2">
              {currentSession === 'deep' ? 'Deep Work Session' : 'Quick Focus Session'} Active
            </h3>
            <div className="text-4xl font-mono font-bold text-gray-900 mb-4">
              {formatTime(sessionTime)}
            </div>
            <Badge className="bg-orange-100 text-orange-700">
              Stay Focused! 🎯
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pomodoro Timer */}
      <PomodoroTimer />

      {/* Task Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-gray-700" />
            Today's Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add New Task */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                className="flex-1"
              />
              <Button onClick={addTask}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-orange-500'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </button>
                    <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Focus Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Deep Work Session</h3>
            <p className="text-sm text-gray-600 mb-4">90 minutes of focused work</p>
            <Button 
              className="w-full" 
              onClick={startDeepWork}
              disabled={isSessionActive}
            >
              {isSessionActive && currentSession === 'deep' ? 'Session Active' : 'Start Deep Work'}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Quick Focus</h3>
            <p className="text-sm text-gray-600 mb-4">15 minutes power session</p>
            <Button 
              className="w-full" 
              onClick={startQuickFocus}
              disabled={isSessionActive}
            >
              {isSessionActive && currentSession === 'quick' ? 'Session Active' : 'Start Quick Focus'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
