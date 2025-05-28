import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Video, Image as ImageIcon, FileText, Mic, Users, Award } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Challenge, ChallengeType } from '@/types/challenge';
import Button from '@/components/common/Button';

interface ChallengeCardProps {
  challenge: Challenge;
  onPress: (challenge: Challenge) => void;
  onParticipate: (challenge: Challenge) => void;
}

export default function ChallengeCard({ challenge, onPress, onParticipate }: ChallengeCardProps) {
  const renderContentTypeIcons = () => {
    return (
      <View style={styles.contentTypeContainer}>
        {challenge.contentType.map((type, index) => (
          <View key={index} style={styles.contentTypeIcon}>
            {renderContentTypeIcon(type)}
          </View>
        ))}
      </View>
    );
  };

  const renderContentTypeIcon = (type: ChallengeType) => {
    const iconProps = { size: 16, color: Colors.gray[600], strokeWidth: 2 };

    switch (type) {
      case 'video':
        return <Video {...iconProps} />;
      case 'image':
        return <ImageIcon {...iconProps} />;
      case 'text':
        return <FileText {...iconProps} />;
      case 'audio':
        return <Mic {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(challenge)}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <Image source={{ uri: challenge.creatorAvatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.creatorName}>{challenge.creatorName}</Text>
          <Text style={styles.date}>
            {new Date(challenge.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{challenge.title}</Text>
          <View style={styles.pointsContainer}>
            <Award size={14} color={Colors.primary} strokeWidth={2} />
            <Text style={styles.points}>{challenge.points} pts</Text>
          </View>
        </View>
        
        <Text style={styles.description}>{challenge.description}</Text>
        
        <View style={styles.metaInfo}>
          {renderContentTypeIcons()}
          
          <View style={styles.participants}>
            <Users size={14} color={Colors.gray[600]} strokeWidth={2} />
            <Text style={styles.participantsText}>
              {challenge.participants} participantes
            </Text>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          {challenge.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          title="Participar"
          onPress={() => onParticipate(challenge)} 
          variant="primary"
          size="small"
          style={styles.participateButton}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  creatorName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[800],
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.gray[900],
    flex: 1,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  points: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[700],
    marginBottom: 16,
    lineHeight: 20,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  contentTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentTypeIcon: {
    marginRight: 8,
    backgroundColor: Colors.gray[100],
    borderRadius: 4,
    padding: 4,
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[600],
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.secondary + '20',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.secondary,
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  participateButton: {
    width: '100%',
  },
});