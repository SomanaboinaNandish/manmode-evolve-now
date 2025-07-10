
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw,
  Timer,
  Coffee,
  Target
} from "lucide-react";

export const PomodoroTimer = () => {
  const [currentTime, setCurrentTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break' | 'longBreak'>('work');
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const modes = {
    work: { duration: 25 * 60, label: 'Focus Time', icon: Target },
    break: { duration: 5 * 60, label: 'Short Break', icon: Coffee },
    longBreak: { duration: 15 * 60, label: 'Long Break', icon: Coffee }
  };

  useEffect(() => {
    if (isRunning && currentTime > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, currentTime]);

  const handleSessionComplete = () => {
    if (mode === 'work') {
      setSessions(prev => prev + 1);
      // Auto switch to break
      const nextMode = sessions % 4 === 3 ? 'longBreak' : 'break';
      setMode(nextMode);
      setCurrentTime(modes[nextMode].duration);
    } else {
      // Switch back to work
      setMode('work');
      setCurrentTime(modes.work.duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentTime(modes[mode].duration);
  };

  const switchMode = (newMode: 'work' | 'break' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    setCurrentTime(modes[newMode].duration);
  };

  const CurrentIcon = modes[mode].icon;

  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700">
          <Clock className="h-5 w-5" />
          Pomodoro Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-6">
          {/* Current Mode */}
          <div className="flex items-center justify-center gap-2">
            <CurrentIcon className="h-6 w-6 text-orange-600" />
            <span className="text-lg font-semibold text-orange-700">
              {modes[mode].label}
            </span>
          </div>

          {/* Timer Display */}
          <div className="text-6xl font-mono font-bold text-gray-900">
            {formatTime(currentTime)}
          </div>

          {/* Progress Circle */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (currentTime / modes[mode].duration)}`}
                className="text-orange-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setIsRunning(!isRunning)}
              className="px-8"
              disabled={currentTime === 0}
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </>
              )}
            </Button>
            <Button 
              variant="outline"
              onClick={resetTimer}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Mode Switcher */}
          <div className="flex justify-center gap-2">
            <Button
              variant={mode === 'work' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchMode('work')}
            >
              25m Focus
            </Button>
            <Button
              variant={mode === 'break' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchMode('break')}
            >
              5m Break
            </Button>
            <Button
              variant={mode === 'longBreak' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchMode('longBreak')}
            >
              15m Long Break
            </Button>
          </div>

          {/* Session Counter */}
          <div className="text-center">
            <Badge variant="secondary">
              <Timer className="h-3 w-3 mr-1" />
              Sessions completed: {sessions}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
