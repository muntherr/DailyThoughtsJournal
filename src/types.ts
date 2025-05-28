export interface JournalEntry {
  id: string;
  uid: string;
  title: string;
  body: string;
  createdAt: Date;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}
