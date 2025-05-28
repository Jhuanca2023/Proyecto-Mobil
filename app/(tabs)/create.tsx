import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, Image as ImageIcon, FileText, Mic, ChevronDown, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/common/Button';

type ContentType = 'video' | 'image' | 'text' | 'audio';

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('50');
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const contentTypes: { type: ContentType; label: string; icon: React.ReactNode }[] = [
    { 
      type: 'video', 
      label: 'Vídeo', 
      icon: <Video size={18} color={Colors.gray[700]} strokeWidth={2} /> 
    },
    { 
      type: 'image', 
      label: 'Imagen', 
      icon: <ImageIcon size={18} color={Colors.gray[700]} strokeWidth={2} /> 
    },
    { 
      type: 'text', 
      label: 'Texto', 
      icon: <FileText size={18} color={Colors.gray[700]} strokeWidth={2} /> 
    },
    { 
      type: 'audio', 
      label: 'Audio', 
      icon: <Mic size={18} color={Colors.gray[700]} strokeWidth={2} /> 
    },
  ];

  const toggleContentType = (type: ContentType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim().toLowerCase())) {
      setTags([...tags, currentTag.trim().toLowerCase()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    console.log({
      title,
      description,
      points: parseInt(points),
      contentTypes: selectedTypes,
      tags,
    });
    // Submit challenge
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Desafío</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información básica</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Título del desafío</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Ej: Un minuto de idioma nuevo"
              placeholderTextColor={Colors.gray[400]}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe el desafío y cómo completarlo"
              placeholderTextColor={Colors.gray[400]}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Puntos (10-100)</Text>
            <TextInput
              style={[styles.input, styles.pointsInput]}
              value={points}
              onChangeText={setPoints}
              placeholder="50"
              placeholderTextColor={Colors.gray[400]}
              keyboardType="number-pad"
              maxLength={3}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de contenido</Text>
          <Text style={styles.sectionDescription}>
            Selecciona los tipos de contenido que pueden utilizarse para completar el desafío
          </Text>
          
          <View style={styles.contentTypesContainer}>
            {contentTypes.map(item => (
              <View
                key={item.type}
                style={[
                  styles.contentTypeItem,
                  selectedTypes.includes(item.type) && styles.contentTypeSelected,
                ]}
              >
                <Button
                  title={item.label}
                  variant={selectedTypes.includes(item.type) ? 'primary' : 'outline'}
                  size="small"
                  onPress={() => toggleContentType(item.type)}
                  icon={item.icon}
                  style={styles.contentTypeButton}
                />
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Etiquetas</Text>
          <Text style={styles.sectionDescription}>
            Añade etiquetas para ayudar a otros a encontrar tu desafío
          </Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.tagInputContainer}>
              <TextInput
                style={[styles.input, styles.tagInput]}
                value={currentTag}
                onChangeText={setCurrentTag}
                placeholder="Añadir etiqueta"
                placeholderTextColor={Colors.gray[400]}
                onSubmitEditing={handleAddTag}
              />
              <Button
                title="Añadir"
                variant="primary"
                size="small"
                onPress={handleAddTag}
                style={styles.addTagButton}
              />
            </View>
          </View>
          
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
                <X
                  size={14}
                  color={Colors.secondary}
                  strokeWidth={2}
                  onPress={() => handleRemoveTag(tag)}
                  style={styles.removeTagIcon}
                />
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Vista previa</Text>
          
          <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                style={styles.previewAvatar}
              />
              <View>
                <Text style={styles.previewName}>Tu nombre</Text>
                <Text style={styles.previewDate}>Ahora</Text>
              </View>
            </View>
            
            <View style={styles.previewContent}>
              <Text style={styles.previewTitle}>
                {title || 'Título del desafío'}
              </Text>
              <Text style={styles.previewDescription}>
                {description || 'Descripción del desafío'}
              </Text>
              
              {selectedTypes.length > 0 && (
                <View style={styles.previewTypes}>
                  {selectedTypes.map((type, index) => {
                    const typeData = contentTypes.find(t => t.type === type);
                    return (
                      <View key={index} style={styles.previewType}>
                        {typeData?.icon}
                      </View>
                    );
                  })}
                </View>
              )}
              
              {tags.length > 0 && (
                <View style={styles.previewTags}>
                  {tags.map((tag, index) => (
                    <View key={index} style={styles.previewTag}>
                      <Text style={styles.previewTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.submitContainer}>
          <Button
            title="Publicar Desafío"
            onPress={handleSubmit}
            variant="primary"
            size="large"
            disabled={!title || !description || selectedTypes.length === 0}
          />
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.gray[800],
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[700],
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.gray[50],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[800],
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pointsInput: {
    maxWidth: 100,
  },
  contentTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  contentTypeItem: {
    width: '50%',
    padding: 4,
  },
  contentTypeSelected: {
    // Selected styles are applied to the button
  },
  contentTypeButton: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagInput: {
    flex: 1,
    marginRight: 8,
  },
  addTagButton: {
    paddingHorizontal: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary + '20',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.secondary,
  },
  removeTagIcon: {
    marginLeft: 4,
  },
  previewSection: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  previewCard: {
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.gray[50],
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  previewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  previewName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[800],
  },
  previewDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
  },
  previewContent: {
    padding: 16,
  },
  previewTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.gray[900],
    marginBottom: 8,
  },
  previewDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[700],
    marginBottom: 16,
  },
  previewTypes: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  previewType: {
    backgroundColor: Colors.gray[100],
    borderRadius: 4,
    padding: 4,
    marginRight: 8,
  },
  previewTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  previewTag: {
    backgroundColor: Colors.secondary + '20',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  previewTagText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.secondary,
  },
  submitContainer: {
    marginBottom: 32,
  },
});