import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, UserPlus, Award, Flag } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Notification } from '@/data/notifications';

interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

export default function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const renderIcon = () => {
    const iconProps = { size: 18, color: Colors.white, strokeWidth: 2 };
    let bgColor = Colors.primary;
    let icon;

    switch (notification.type) {
      case 'like':
        icon = <Heart {...iconProps} />;
        bgColor = Colors.error;
        break;
      case 'comment':
        icon = <MessageCircle {...iconProps} />;
        bgColor = Colors.secondary;
        break;
      case 'follow':
        icon = <UserPlus {...iconProps} />;
        bgColor = Colors.primary;
        break;
      case 'achievement':
        icon = <Award {...iconProps} />;
        bgColor = Colors.accent;
        break;
      case 'challenge':
        icon = <Flag {...iconProps} />;
        bgColor = Colors.success;
        break;
      default:
        icon = <Flag {...iconProps} />;
    }

    return (
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        {icon}
      </View>
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)}h`;
    } else {
      return `${Math.floor(diffMins / 1440)}d`;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, !notification.read && styles.unread]}
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {renderIcon()}
        
        <View style={styles.avatarContainer}>
          <Image source={{ uri: notification.userAvatar }} style={styles.avatar} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.message}>
            <Text style={styles.userName}>{notification.userName}</Text> {notification.message}
          </Text>
          
          {notification.challengeTitle && (
            <Text style={styles.challengeTitle}>
              {notification.challengeTitle}
            </Text>
          )}
          
          {notification.badgeName && (
            <Text style={styles.badgeName}>
              {notification.badgeName}
            </Text>
          )}
          
          <Text style={styles.time}>{formatTime(notification.timestamp)}</Text>
        </View>
      </View>
      
      {!notification.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  unread: {
    backgroundColor: Colors.primary + '10',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[700],
    flexShrink: 1,
  },
  userName: {
    fontFamily: 'Inter-Medium',
    color: Colors.gray[900],
  },
  challengeTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
    marginTop: 2,
  },
  badgeName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.accent,
    marginTop: 2,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
    marginTop: 4,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 16,
    right: 16,
  },
});