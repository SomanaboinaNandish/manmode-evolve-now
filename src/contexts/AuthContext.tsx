
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  streak: number;
  joinDate: string;
  nextLevelXP: number;
  workoutsCompleted: number;
  totalReadingTime: number;
  focusSessionsTotal: number;
  focusSessionsToday: number;
  totalFocusTime: number;
  goalsCompleted: number;
  weeklyProgress: number[];
  weeklyXP: number[];
  mentalArticlesRead: number;
  socialArticlesRead: number;
  emotionalArticlesRead: number;
  goalArticlesRead: number;
  lastActiveDate: string; // New field to track streak
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addXP: (amount: number) => void;
  updateStreak: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('manmode_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Check if user should lose streak (if last active was not today or yesterday)
      const today = new Date().toDateString();
      const lastActive = userData.lastActiveDate ? new Date(userData.lastActiveDate).toDateString() : today;
      const daysDiff = Math.floor((new Date(today).getTime() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff > 1) {
        userData.streak = 0; // Reset streak if more than 1 day passed
      }
      
      setUser(userData);
    }
  }, []);

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 200) + 1; // Level up every 200 XP
  };

  const calculateNextLevelXP = (level: number) => {
    return level * 200; // Next level requires 200 XP more
  };

  const addXP = (amount: number) => {
    if (user) {
      const newXP = user.xp + amount;
      const newLevel = calculateLevel(newXP);
      const nextLevelXP = calculateNextLevelXP(newLevel);
      
      const updatedUser = {
        ...user,
        xp: newXP,
        level: newLevel,
        nextLevelXP: nextLevelXP,
        lastActiveDate: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('manmode_user', JSON.stringify(updatedUser));
    }
  };

  const updateStreak = () => {
    if (user) {
      const today = new Date().toDateString();
      const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate).toDateString() : null;
      
      // If last active was yesterday, increment streak
      // If last active was today, don't change streak
      // If last active was more than 1 day ago, reset to 1
      
      let newStreak = user.streak;
      
      if (!lastActive) {
        newStreak = 1; // First day
      } else {
        const daysDiff = Math.floor((new Date(today).getTime() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          newStreak = user.streak + 1; // Increment streak
        } else if (daysDiff === 0) {
          newStreak = Math.max(user.streak, 1); // Same day, ensure at least 1
        } else {
          newStreak = 1; // Reset streak but start with 1 for today
        }
      }
      
      const updatedUser = {
        ...user,
        streak: newStreak,
        lastActiveDate: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('manmode_user', JSON.stringify(updatedUser));
    }
  };

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: '1',
      name: 'Alpha Warrior',
      email,
      level: 12,
      xp: 2850,
      streak: 15,
      joinDate: 'Jan 2024',
      nextLevelXP: 3000,
      workoutsCompleted: 47,
      totalReadingTime: 720,
      focusSessionsTotal: 89,
      focusSessionsToday: 3,
      totalFocusTime: 2640,
      goalsCompleted: 234,
      weeklyProgress: [85, 92, 78, 88, 95, 82, 90],
      weeklyXP: [120, 140, 98, 135, 152, 108, 145],
      mentalArticlesRead: 12,
      socialArticlesRead: 8,
      emotionalArticlesRead: 15,
      goalArticlesRead: 10,
      lastActiveDate: new Date().toISOString()
    };
    
    setUser(userData);
    localStorage.setItem('manmode_user', JSON.stringify(userData));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: '1',
      name,
      email,
      level: 1,
      xp: 0,
      streak: 0,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      nextLevelXP: 200,
      workoutsCompleted: 0,
      totalReadingTime: 0,
      focusSessionsTotal: 0,
      focusSessionsToday: 0,
      totalFocusTime: 0,
      goalsCompleted: 0,
      weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
      weeklyXP: [0, 0, 0, 0, 0, 0, 0],
      mentalArticlesRead: 0,
      socialArticlesRead: 0,
      emotionalArticlesRead: 0,
      goalArticlesRead: 0,
      lastActiveDate: new Date().toISOString()
    };
    
    setUser(userData);
    localStorage.setItem('manmode_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('manmode_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates, lastActiveDate: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('manmode_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, addXP, updateStreak }}>
      {children}
    </AuthContext.Provider>
  );
};
