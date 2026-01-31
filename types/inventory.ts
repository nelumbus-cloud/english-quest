export interface Word {
  id: string;
  text: string;
  definition: string;
  level: number; // 0-5 mastery
  context?: string;
  addedAt: number;
}

export interface UserProfile {
  level: number;
  xp: number;
  streak: number;
}
