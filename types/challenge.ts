export type ChallengeType = 'video' | 'image' | 'text' | 'audio';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  contentType: ChallengeType[];
  points: number;
  createdAt: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  participants: number;
  tags: string[];
  isCompleted?: boolean;
}

export interface ChallengeEvidence {
  id: string;
  challengeId: string;
  userId: string;
  contentType: ChallengeType;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export interface ChallengeComment {
  id: string;
  evidenceId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}