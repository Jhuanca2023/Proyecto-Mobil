import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Button from '@/components/common/Button';

interface InterestCategory {
  id: string;
  name: string;
  selected: boolean;
  image: string;
}

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<InterestCategory[]>([
    {
      id: 'arte',
      name: 'Arte y Creatividad',
      selected: false,
      image: 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'fitness',
      name: 'Fitness y Deporte',
      selected: false,
      image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'idiomas',
      name: 'Idiomas y Comunicación',
      selected: false,
      image: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'mindfulness',
      name: 'Mindfulness y Bienestar',
      selected: false,
      image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'naturaleza',
      name: 'Naturaleza y Ecología',
      selected: false,
      image: 'https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'tecnologia',
      name: 'Tecnología',
      selected: false,
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
  ]);
  
  const toggleInterest = (id: string) => {
    setInterests(interests.map(interest => 
      interest.id === id 
        ? { ...interest, selected: !interest.selected } 
        : interest
    ));
  };
  
  const getSelectedInterests = () => {
    return interests.filter(interest => interest.selected).length;
  };
  
  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding and navigate to main app
      router.replace('/(tabs)');
    }
  };
  
  const renderWelcomeStep = () => (
    <View style={styles.stepContainer}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
        style={styles.welcomeImage}
      />
      
      <Text style={styles.welcomeTitle}>¡Bienvenido a Desafío 360!</Text>
      
      <Text style={styles.welcomeText}>
        Prepárate para superar retos diarios, desarrollar nuevas habilidades y conectar con personas que comparten tus intereses.
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Empezar"
          onPress={handleContinue}
          variant="primary"
          size="large"
          style={styles.button}
        />
      </View>
    </View>
  );
  
  const renderInterestsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Selecciona tus intereses</Text>
      <Text style={styles.stepDescription}>
        Personaliza tu experiencia seleccionando las categorías que más te interesen.
      </Text>
      
      <ScrollView style={styles.interestsContainer}>
        <View style={styles.interestsGrid}>
          {interests.map(interest => (
            <View key={interest.id} style={styles.interestItem}>
              <Button
                title={interest.name}
                onPress={() => toggleInterest(interest.id)}
                variant={interest.selected ? 'primary' : 'outline'}
                style={styles.interestButton}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Text style={styles.selectionText}>
          {getSelectedInterests()} de 6 categorías seleccionadas
        </Text>
        <Button
          title="Continuar"
          onPress={handleContinue}
          variant="primary"
          size="large"
          style={styles.button}
          disabled={getSelectedInterests() === 0}
        />
      </View>
    </View>
  );
  
  const renderFinalStep = () => (
    <View style={styles.stepContainer}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
        style={styles.finalImage}
      />
      
      <Text style={styles.finalTitle}>¡Todo listo!</Text>
      
      <Text style={styles.finalText}>
        Tu perfil está configurado. Comienza a explorar desafíos, conecta con amigos y acumula puntos completando retos diarios.
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Comenzar a explorar"
          onPress={handleContinue}
          variant="primary"
          size="large"
          style={styles.button}
        />
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.progressContainer}>
        {[1, 2, 3].map(i => (
          <View 
            key={i}
            style={[
              styles.progressDot,
              i <= step && styles.progressDotActive
            ]}
          />
        ))}
      </View>
      
      {step === 1 && renderWelcomeStep()}
      {step === 2 && renderInterestsStep()}
      {step === 3 && renderFinalStep()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray[300],
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
    width: 20,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  welcomeImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[700],
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  stepTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.gray[900],
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[700],
    marginBottom: 24,
  },
  interestsContainer: {
    flex: 1,
    marginBottom: 16,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  interestItem: {
    width: '50%',
    padding: 8,
  },
  interestButton: {
    width: '100%',
  },
  selectionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 16,
    textAlign: 'center',
  },
  finalImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 24,
  },
  finalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  finalText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[700],
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingVertical: 16,
  },
  button: {
    width: '100%',
  },
});