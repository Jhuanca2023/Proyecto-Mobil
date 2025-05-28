import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface StatCardProps {
  value: number | string;
  label: string;
  highlight?: boolean;
}

export default function StatCard({ value, label, highlight = false }: StatCardProps) {
  return (
    <View style={[styles.container, highlight && styles.highlight]}>
      <Text style={[styles.value, highlight && styles.highlightText]}>
        {value}
      </Text>
      <Text style={[styles.label, highlight && styles.highlightText]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  highlight: {
    backgroundColor: Colors.primary,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.gray[800],
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
    textAlign: 'center',
  },
  highlightText: {
    color: Colors.white,
  },
});