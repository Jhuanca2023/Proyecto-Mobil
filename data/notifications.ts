export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'challenge' | 'achievement';
  message: string;
  timestamp: string;
  read: boolean;
  userId: string;
  userName: string;
  userAvatar: string;
  challengeId?: string;
  challengeTitle?: string;
  evidenceId?: string;
  badgeId?: string;
  badgeName?: string;
}

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    message: 'le ha dado me gusta a tu desafío de idioma nuevo',
    timestamp: '2025-01-20T15:30:00Z',
    read: false,
    userId: '1',
    userName: 'María Gómez',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    challengeId: '1',
    challengeTitle: 'Un minuto de idioma nuevo',
    evidenceId: 'e1',
  },
  {
    id: '2',
    type: 'comment',
    message: 'ha comentado en tu desafío de doodle',
    timestamp: '2025-01-20T13:45:00Z',
    read: false,
    userId: '2',
    userName: 'Carlos Vega',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    challengeId: '2',
    challengeTitle: 'Doodle creativo',
    evidenceId: 'e2',
  },
  {
    id: '3',
    type: 'follow',
    message: 'ha comenzado a seguirte',
    timestamp: '2025-01-19T09:15:00Z',
    read: true,
    userId: '3',
    userName: 'Laura Pérez',
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    type: 'challenge',
    message: 'ha creado un nuevo desafío: 5 min de mindfulness',
    timestamp: '2025-01-18T17:20:00Z',
    read: true,
    userId: '4',
    userName: 'Santiago Ruiz',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    challengeId: '4',
    challengeTitle: '5 min de mindfulness',
  },
  {
    id: '5',
    type: 'achievement',
    message: 'Has conseguido la insignia Semana Perfecta',
    timestamp: '2025-01-15T08:10:00Z',
    read: true,
    userId: '101',
    userName: 'Alex Moreno',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    badgeId: 'b2',
    badgeName: 'Semana Perfecta',
  },
];