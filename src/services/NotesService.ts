// NotesService.ts - Kişisel Not Yönetimi
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_STORAGE_KEY = "pharmadict_notes";

export interface TermNote {
  termId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

class NotesService {
  private notes: Map<string, TermNote> = new Map();
  private initialized: boolean = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const stored = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.entries(parsed).forEach(([termId, note]: [string, any]) => {
          this.notes.set(termId, {
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt),
          });
        });
        console.log(`📝 ${this.notes.size} not yüklendi`);
      }
      this.initialized = true;
    } catch (error) {
      console.error("❌ Notlar yüklenirken hata:", error);
      this.initialized = true;
    }
  }

  private async saveToStorage(): Promise<void> {
    try {
      const obj: { [key: string]: TermNote } = {};
      this.notes.forEach((note, termId) => {
        obj[termId] = note;
      });
      await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(obj));
    } catch (error) {
      console.error("❌ Notlar kaydedilirken hata:", error);
    }
  }

  async getNote(termId: string): Promise<TermNote | null> {
    await this.initialize();
    return this.notes.get(termId) || null;
  }

  async saveNote(termId: string, content: string): Promise<TermNote> {
    await this.initialize();

    const existingNote = this.notes.get(termId);
    const now = new Date();

    const note: TermNote = {
      termId,
      content,
      createdAt: existingNote?.createdAt || now,
      updatedAt: now,
    };

    if (content.trim() === "") {
      // Boş not ise sil
      this.notes.delete(termId);
    } else {
      this.notes.set(termId, note);
    }

    await this.saveToStorage();
    return note;
  }

  async deleteNote(termId: string): Promise<void> {
    await this.initialize();
    this.notes.delete(termId);
    await this.saveToStorage();
  }

  async getAllNotes(): Promise<TermNote[]> {
    await this.initialize();
    return Array.from(this.notes.values());
  }

  async getTermIdsWithNotes(): Promise<string[]> {
    await this.initialize();
    return Array.from(this.notes.keys());
  }

  async hasNote(termId: string): Promise<boolean> {
    await this.initialize();
    const note = this.notes.get(termId);
    return note !== undefined && note.content.trim() !== "";
  }
}

export const notesService = new NotesService();
