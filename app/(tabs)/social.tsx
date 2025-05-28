import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, UserPlus, CircleCheck as CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { friends } from '@/data/users';
import { User } from '@/types/user';

export default function SocialScreen() {
  const [activeTab, setActiveTab] = useState<'amigos' | 'descubrir'>('amigos');
  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>({});
  
  const toggleFollow = (userId: string) => {
    setFollowStatus(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };
  
  const renderUserItem = ({ item }: { item: User }) => {
    const isFollowing = followStatus[item.id] || false;
    
    return (
      <View style={styles.userCard}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userStats}>
            {item.completedChallenges} desafíos • {item.points} puntos
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.followButton,
            isFollowing && styles.followingButton
          ]}
          onPress={() => toggleFollow(item.id)}
        >
          {isFollowing ? (
            <CheckCircle size={18} color={Colors.white} strokeWidth={2} />
          ) : (
            <UserPlus size={18} color={Colors.white} strokeWidth={2} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Social</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.gray[400]} style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Buscar amigos...</Text>
        </View>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'amigos' && styles.activeTab]}
          onPress={() => setActiveTab('amigos')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'amigos' && styles.activeTabText
            ]}
          >
            Mis Amigos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'descubrir' && styles.activeTab]}
          onPress={() => setActiveTab('descubrir')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'descubrir' && styles.activeTabText
            ]}
          >
            Descubrir
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'amigos' && (
        <>
          <View style={styles.rankingHeader}>
            <Text style={styles.rankingTitle}>Ranking de Amigos</Text>
          </View>
          
          <FlatList
            data={friends}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        </>
      )}
      
      {activeTab === 'descubrir' && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Próximamente podrás descubrir nuevos amigos basados en tus intereses y desafíos
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[500],
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[600],
  },
  activeTabText: {
    color: Colors.primary,
  },
  rankingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  rankingTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.gray[800],
  },
  listContent: {
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 4,
  },
  userStats: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[600],
  },
  followButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingButton: {
    backgroundColor: Colors.success,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
  },
});