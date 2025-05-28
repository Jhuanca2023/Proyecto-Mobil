export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  points: number;
  completedChallenges: number;
  followers: number;
  following: number;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserStats {
  totalPoints: number;
  completedChallenges: number;
  streak: number;
  longestStreak: number;
  badges: Badge[];
  rank: number;
}