// TermService.js - Data Service for Pharmacy Terms
import pharmacyData from '../data/pharmacyData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

class TermService {
  constructor() {
    this.data = pharmacyData;
  }

  /**
   * Get all terms
   * @returns {Array} All terms
   */
  getAllTerms() {
    return this.data;
  }

  /**
   * Get terms by category
   * @param {string} category - Category name (drug, plant, vitamin, etc.)
   * @returns {Array} Filtered terms
   */
  getTermsByCategory(category) {
    if (!category) return [];
    
    // Normalize category name
    const normalizedCategory = category.toLowerCase();
    
    return this.data.filter(term => {
      const termCategory = term.category?.toLowerCase() || '';
      return termCategory === normalizedCategory;
    });
  }

  /**
   * Get term by ID
   * @param {string} id - Term ID
   * @returns {Object|null} Term object or null
   */
  getTermById(id) {
    if (!id) return null;
    return this.data.find(term => term.id === id) || null;
  }

  /**
   * Search terms in title and definition
   * @param {string} query - Search query
   * @returns {Array} Search results
   */
  searchTerms(query) {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchLower = query.toLowerCase().trim();
    
    return this.data.filter(term => {
      // Search in latinName
      const latinMatch = term.latinName?.toLowerCase().includes(searchLower);
      
      // Search in turkishName
      const turkishMatch = term.turkishName?.toLowerCase().includes(searchLower);
      
      // Search in definition
      const definitionMatch = term.definition?.toLowerCase().includes(searchLower);
      
      // Search in components
      const componentsMatch = term.components?.some(comp => 
        comp.toLowerCase().includes(searchLower)
      );
      
      // Search in synonyms
      const synonymsMatch = term.synonyms?.some(syn => 
        syn.toLowerCase().includes(searchLower)
      );

      return latinMatch || turkishMatch || definitionMatch || componentsMatch || synonymsMatch;
    });
  }

  /**
   * Get related terms based on category or components
   * @param {string} termId - Current term ID
   * @param {number} limit - Maximum number of related terms
   * @returns {Array} Related terms
   */
  getRelatedTerms(termId, limit = 5) {
    const currentTerm = this.getTermById(termId);
    if (!currentTerm) return [];

    const related = this.data
      .filter(term => {
        // Exclude current term
        if (term.id === termId) return false;
        
        // Same category
        if (term.category === currentTerm.category) return true;
        
        // Shared components
        if (currentTerm.components && term.components) {
          const sharedComponents = currentTerm.components.filter(comp =>
            term.components.includes(comp)
          );
          if (sharedComponents.length > 0) return true;
        }
        
        return false;
      })
      .slice(0, limit);

    return related;
  }

  /**
   * Save user note for a term
   * @param {string} termId - Term ID
   * @param {string} note - User note text
   * @returns {Promise<void>}
   */
  async saveUserNote(termId, note) {
    try {
      const notesData = await AsyncStorage.getItem('user_notes');
      const notes = notesData ? JSON.parse(notesData) : {};
      notes[termId] = note;
      await AsyncStorage.setItem('user_notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving user note:', error);
      throw error;
    }
  }

  /**
   * Get user note for a term
   * @param {string} termId - Term ID
   * @returns {Promise<string|null>} User note or null if not found
   */
  async getUserNote(termId) {
    try {
      const notesData = await AsyncStorage.getItem('user_notes');
      if (!notesData) return null;
      const notes = JSON.parse(notesData);
      return notes[termId] || null;
    } catch (error) {
      console.error('Error getting user note:', error);
      return null;
    }
  }

  /**
   * Increment visit count for a term
   * @param {string} termId - Term ID
   * @returns {Promise<void>}
   */
  async incrementVisitCount(termId) {
    try {
      const visitsData = await AsyncStorage.getItem('term_visits');
      const visits = visitsData ? JSON.parse(visitsData) : {};
      visits[termId] = (visits[termId] || 0) + 1;
      await AsyncStorage.setItem('term_visits', JSON.stringify(visits));
    } catch (error) {
      console.error('Error incrementing visit count:', error);
    }
  }

  /**
   * Get visit count for a term
   * @param {string} termId - Term ID
   * @returns {Promise<number>} Visit count
   */
  async getVisitCount(termId) {
    try {
      const visitsData = await AsyncStorage.getItem('term_visits');
      if (!visitsData) return 0;
      const visits = JSON.parse(visitsData);
      return visits[termId] || 0;
    } catch (error) {
      console.error('Error getting visit count:', error);
      return 0;
    }
  }

  /**
   * Get most visited terms
   * @param {number} limit - Maximum number of terms to return
   * @returns {Promise<Array>} Array of terms with visit counts, sorted by visits
   */
  async getMostVisitedTerms(limit = 5) {
    try {
      const visitsData = await AsyncStorage.getItem('term_visits');
      if (!visitsData) return [];
      
      const visits = JSON.parse(visitsData);
      
      // Get all terms with their visit counts
      const termsWithVisits = this.data
        .map(term => ({
          ...term,
          visitCount: visits[term.id] || 0,
        }))
        .filter(term => term.visitCount > 0) // Only include visited terms
        .sort((a, b) => b.visitCount - a.visitCount) // Sort by visit count descending
        .slice(0, limit);
      
      return termsWithVisits;
    } catch (error) {
      console.error('Error getting most visited terms:', error);
      return [];
    }
  }
}

// Export singleton instance
export default new TermService();

