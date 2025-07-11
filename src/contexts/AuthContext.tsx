
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
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
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
      setUser(JSON.parse(savedUser));
    }
  }, []);

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
      goalArticlesRead: 10
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
      nextLevelXP: 100,
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
      goalArticlesRead: 0
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
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('manmode_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
