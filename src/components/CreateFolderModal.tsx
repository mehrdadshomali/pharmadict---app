// CreateFolderModal.tsx - Modal for Creating New Folder
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CreateFolderModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateFolder: (name: string, color: string) => Promise<void>;
}

const FOLDER_COLORS = [
  { name: 'Mavi', value: '#3B82F6' },
  { name: 'Yeşil', value: '#10B981' },
  { name: 'Turuncu', value: '#F59E0B' },
  { name: 'Mor', value: '#8B5CF6' },
  { name: 'Pembe', value: '#EC4899' },
  { name: 'Kırmızı', value: '#EF4444' },
];

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  visible,
  onClose,
  onCreateFolder,
}) => {
  const [folderName, setFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState(FOLDER_COLORS[0].value);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!folderName.trim()) {
      Alert.alert('Hata', 'Lütfen klasör adı girin');
      return;
    }

    setIsCreating(true);
    try {
      await onCreateFolder(folderName.trim(), selectedColor);
      setFolderName('');
      setSelectedColor(FOLDER_COLORS[0].value);
      onClose();
    } catch (error) {
      Alert.alert('Hata', 'Klasör oluşturulurken bir hata oluştu');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Yeni Klasör Oluştur</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Klasör Adı</Text>
            <TextInput
              style={styles.input}
              placeholder="Örn: İlaçlar, Bitkiler..."
              placeholderTextColor="#9CA3AF"
              value={folderName}
              onChangeText={setFolderName}
              maxLength={30}
            />
          </View>

          <View style={styles.colorSection}>
            <Text style={styles.label}>Renk</Text>
            <View style={styles.colorGrid}>
              {FOLDER_COLORS.map((color) => (
                <TouchableOpacity
                  key={color.value}
                  style={[
                    styles.colorOption,
                    {
                      backgroundColor: color.value,
                      borderWidth: selectedColor === color.value ? 3 : 0,
                      borderColor: '#FFFFFF',
                    },
                  ]}
                  onPress={() => setSelectedColor(color.value)}
                >
                  {selectedColor === color.value && (
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.cancelButton, styles.button]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.createButton, styles.button, { backgroundColor: selectedColor }]}
              onPress={handleCreate}
              disabled={isCreating}
            >
              <Text style={styles.createButtonText}>
                {isCreating ? 'Oluşturuluyor...' : 'Oluştur'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  colorSection: {
    marginBottom: 24,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  createButton: {
    // backgroundColor set dynamically
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default CreateFolderModal;

