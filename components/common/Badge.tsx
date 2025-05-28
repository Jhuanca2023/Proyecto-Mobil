import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award, Flame, Users, Palette, Medal } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type BadgeIconName = 'award' | 'flame' | 'users' | 'palette' | 'medal';

interface BadgeProps {
  name: string;
  icon: BadgeIconName;
  unlocked?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Badge({ name, icon, unlocked = true, size = 'medium' }: BadgeProps) {
  const sizeValue = size === 'small' ? 24 : size === 'medium' ? 32 : 48;
  
  const renderIcon = () => {
    const iconColor = unlocked ? Colors.primary : Colors.gray[400];
    const iconProps = { size: sizeValue, color: iconColor, strokeWidth: 2 };
    
    switch (icon) {
      case 'award':
        return <Award {...iconProps} />;
      case 'flame':
        return <Flame {...iconProps} />;
      case 'users':
        return <Users {...iconProps} />;
      case 'palette':
        return <Palette {...iconProps} />;
      case 'medal':
        return <Medal {...iconProps} />;
      default:
        return <Award {...iconProps} />;
    }
  };

  return (
    <View style={[
      styles.container, 
      !unlocked && styles.locked,
      size === 'small' ? styles.containerSmall : size === 'large' ? styles.containerLarge : {}
    ]}>
      {renderIcon()}
      {size !== 'small' && (
        <Text style={[
          styles.name, 
          !unlocked && styles.lockedText,
          size === 'large' && styles.nameLarge
        ]}>
          {name}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.gray[50],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    width: 80,
    height: 80,
  },
  containerSmall: {
    width: 40,
    height: 40,
    padding: 4,
  },
  containerLarge: {
    width: 100,
    height: 100,
    padding: 12,
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    color: Colors.gray[800],
  },
  nameLarge: {
    fontSize: 14,
    marginTop: 8,
  },
  locked: {
    opacity: 0.6,
    backgroundColor: Colors.gray[100],
  },
  lockedText: {
    color: Colors.gray[500],
  },
});