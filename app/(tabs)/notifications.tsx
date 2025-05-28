import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { notifications, Notification } from '@/data/notifications';
import NotificationItem from '@/components/notifications/NotificationItem';

export default function NotificationsScreen() {
  const handleNotificationPress = (notification: Notification) => {
    console.log('Notification pressed:', notification.id);
    // Handle notification press
  };
  
  const renderNotification = ({ item }: { item: Notification }) => (
    <NotificationItem 
      notification={item}
      onPress={handleNotificationPress}
    />
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificaciones</Text>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No tienes notificaciones por el momento
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.primary,
  },
  listContent: {
    flexGrow: 1,
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