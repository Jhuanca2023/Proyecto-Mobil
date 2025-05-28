import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium', 
  loading = false, 
  disabled = false, 
  style, 
  textStyle,
  icon
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style
  ];
  
  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? Colors.white : Colors.primary}
          size="small"
        />
      ) : (
        <>
          {icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  primaryText: {
    color: Colors.white,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  secondaryText: {
    color: Colors.white,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  outlineText: {
    color: Colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  textText: {
    color: Colors.primary,
  },
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  smallText: {
    fontSize: 14,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  mediumText: {
    fontSize: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  largeText: {
    fontSize: 18,
  },
  // States
  disabled: {
    backgroundColor: Colors.gray[300],
    borderColor: Colors.gray[300],
  },
  disabledText: {
    color: Colors.gray[500],
  },
});