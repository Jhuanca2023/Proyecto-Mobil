import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Search, Filter } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { challenges } from '@/data/challenges';
import { Challenge } from '@/types/challenge';
import ChallengeCard from '@/components/challenges/ChallengeCard';

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  
  const filters = [
    { id: 'todos', name: 'Todos' },
    { id: 'popular', name: 'Populares' },
    { id: 'nuevo', name: 'Nuevos' },
    { id: 'arte', name: 'Arte' },
    { id: 'bienestar', name: 'Bienestar' },
    { id: 'fitness', name: 'Fitness' },
  ];
  
  const handleChallengePress = (challenge: Challenge) => {
    console.log('Challenge pressed:', challenge.id);
    // Navigate to challenge details
  };
  
  const handleParticipate = (challenge: Challenge) => {
    console.log('Participate in challenge:', challenge.id);
    // Navigate to challenge participation screen
  };
  
  const renderFilterItem = ({ item }: { item: { id: string; name: string } }) => (
    <Text
      style={[
        styles.filterItem,
        activeFilter === item.id && styles.activeFilterItem,
      ]}
      onPress={() => setActiveFilter(item.id)}
    >
      {item.name}
    </Text>
  );
  
  const renderChallenge = ({ item }: { item: Challenge }) => (
    <ChallengeCard 
      challenge={item}
      onPress={handleChallengePress}
      onParticipate={handleParticipate}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Desafío 360</Text>
        <View style={styles.headerButtons}>
          <View style={styles.iconButton}>
            <Search size={24} color={Colors.gray[700]} />
          </View>
          <View style={styles.iconButton}>
            <Filter size={24} color={Colors.gray[700]} />
          </View>
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        <FlatList
          data={filters}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>
      
      <FlatList
        data={challenges}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.challengesList}
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.gray[100],
    marginLeft: 8,
  },
  filtersContainer: {
    backgroundColor: Colors.white,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  filtersList: {
    paddingHorizontal: 16,
  },
  filterItem: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[600],
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  activeFilterItem: {
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  challengesList: {
    padding: 16,
    paddingBottom: 32,
  },
});