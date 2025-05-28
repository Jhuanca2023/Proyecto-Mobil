import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Trophy, Award, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { currentUser } from '@/data/users';
import { userStats } from '@/data/users';
import StatCard from '@/components/profile/StatCard';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={Colors.gray[600]} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text style={styles.username}>@{currentUser.username}</Text>
          </View>
          
          <Text style={styles.bio}>{currentUser.bio}</Text>
          
          <View style={styles.statsRow}>
            <StatCard 
              value={currentUser.followers} 
              label="Seguidores" 
            />
            <StatCard 
              value={currentUser.following} 
              label="Siguiendo" 
            />
            <StatCard 
              value={currentUser.completedChallenges} 
              label="Desafíos" 
              highlight
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Trophy size={20} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.sectionTitle}>Estadísticas</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Ver todo</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.totalPoints}</Text>
              <Text style={styles.statLabel}>Puntos totales</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.streak}</Text>
              <Text style={styles.statLabel}>Racha actual</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.longestStreak}</Text>
              <Text style={styles.statLabel}>Racha máxima</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>#{userStats.rank}</Text>
              <Text style={styles.statLabel}>Ranking global</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Award size={20} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.sectionTitle}>Insignias</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Ver todo</Text>
          </View>
          
          <View style={styles.badgesContainer}>
            {userStats.badges.map((badge, index) => (
              <View key={index} style={styles.badgeItem}>
                <Badge 
                  name={badge.name}
                  icon={badge.icon as any}
                  unlocked={!!badge.unlockedAt}
                />
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <ChevronRight size={20} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.sectionTitle}>Acciones</Text>
            </View>
          </View>
          
          <View style={styles.actionsContainer}>
            <Button
              title="Mis Desafíos Completados"
              variant="outline"
              onPress={() => {}}
              style={styles.actionButton}
            />
            
            <Button
              title="Desafíos Creados"
              variant="outline"
              onPress={() => {}}
              style={styles.actionButton}
            />
            
            <Button
              title="Invitar Amigos"
              variant="primary"
              onPress={() => {}}
              style={styles.actionButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.primary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.gray[100],
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: Colors.white,
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.gray[900],
  },
  username: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[700],
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
    maxWidth: '90%',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  section: {
    backgroundColor: Colors.white,
    padding: 16,
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.gray[800],
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  statItem: {
    width: '50%',
    padding: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.gray[800],
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  badgeItem: {
    width: '20%',
    padding: 4,
    alignItems: 'center',
  },
  actionsContainer: {
    marginBottom: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
});