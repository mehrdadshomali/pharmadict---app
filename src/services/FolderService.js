// FolderService.js - Folder Management Service for Bookmarks
import AsyncStorage from '@react-native-async-storage/async-storage';

class FolderService {
  constructor() {
    this.storageKey = 'pharmadict_folders';
  }

  /**
   * Get all folders
   * @returns {Promise<Array>} Array of folders
   */
  async getAllFolders() {
    try {
      const foldersData = await AsyncStorage.getItem(this.storageKey);
      if (!foldersData) return [];
      return JSON.parse(foldersData);
    } catch (error) {
      console.error('Error getting folders:', error);
      return [];
    }
  }

  /**
   * Create a new folder
   * @param {string} folderName - Folder name
   * @param {string} color - Folder color (optional)
   * @returns {Promise<Object>} Created folder
   */
  async createFolder(folderName, color = '#3B82F6') {
    try {
      const folders = await this.getAllFolders();
      const newFolder = {
        id: `folder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: folderName,
        color: color,
        termIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      folders.push(newFolder);
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(folders));
      return newFolder;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  /**
   * Update folder
   * @param {string} folderId - Folder ID
   * @param {Object} updates - Updates object
   * @returns {Promise<Object>} Updated folder
   */
  async updateFolder(folderId, updates) {
    try {
      const folders = await this.getAllFolders();
      const folderIndex = folders.findIndex(f => f.id === folderId);
      if (folderIndex === -1) throw new Error('Folder not found');
      
      folders[folderIndex] = {
        ...folders[folderIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(folders));
      return folders[folderIndex];
    } catch (error) {
      console.error('Error updating folder:', error);
      throw error;
    }
  }

  /**
   * Delete folder
   * @param {string} folderId - Folder ID
   * @returns {Promise<void>}
   */
  async deleteFolder(folderId) {
    try {
      const folders = await this.getAllFolders();
      const filteredFolders = folders.filter(f => f.id !== folderId);
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(filteredFolders));
    } catch (error) {
      console.error('Error deleting folder:', error);
      throw error;
    }
  }

  /**
   * Add term to folder
   * @param {string} folderId - Folder ID
   * @param {string} termId - Term ID
   * @returns {Promise<void>}
   */
  async addTermToFolder(folderId, termId) {
    try {
      const folders = await this.getAllFolders();
      const folderIndex = folders.findIndex(f => f.id === folderId);
      if (folderIndex === -1) throw new Error('Folder not found');
      
      if (!folders[folderIndex].termIds.includes(termId)) {
        folders[folderIndex].termIds.push(termId);
        folders[folderIndex].updatedAt = new Date().toISOString();
        await AsyncStorage.setItem(this.storageKey, JSON.stringify(folders));
      }
    } catch (error) {
      console.error('Error adding term to folder:', error);
      throw error;
    }
  }

  /**
   * Remove term from folder
   * @param {string} folderId - Folder ID
   * @param {string} termId - Term ID
   * @returns {Promise<void>}
   */
  async removeTermFromFolder(folderId, termId) {
    try {
      const folders = await this.getAllFolders();
      const folderIndex = folders.findIndex(f => f.id === folderId);
      if (folderIndex === -1) throw new Error('Folder not found');
      
      folders[folderIndex].termIds = folders[folderIndex].termIds.filter(id => id !== termId);
      folders[folderIndex].updatedAt = new Date().toISOString();
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(folders));
    } catch (error) {
      console.error('Error removing term from folder:', error);
      throw error;
    }
  }

  /**
   * Get terms in a folder
   * @param {string} folderId - Folder ID
   * @returns {Promise<Array>} Array of term IDs
   */
  async getFolderTerms(folderId) {
    try {
      const folders = await this.getAllFolders();
      const folder = folders.find(f => f.id === folderId);
      return folder ? folder.termIds : [];
    } catch (error) {
      console.error('Error getting folder terms:', error);
      return [];
    }
  }
}

// Export singleton instance
export default new FolderService();

