import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
import { JournalEntry } from "../types";

const COLLECTION_NAME = "entries";

/**
 * Creates a new journal entry in Firestore
 */
export const addEntry = async (
  entryData: Omit<JournalEntry, "id">
): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...entryData,
    createdAt: Timestamp.fromDate(entryData.createdAt),
  });
  return docRef.id;
};

/**
 * Retrieves all journal entries for a specific user
 */
export const getEntries = async (uid: string): Promise<JournalEntry[]> => {
  const q = query(collection(db, COLLECTION_NAME), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      uid: data.uid,
      title: data.title,
      body: data.body,
      createdAt: data.createdAt.toDate(),
    };
  });
};

/**
 * Updates an existing journal entry
 */
export const updateEntry = async (
  entryId: string,
  updates: Partial<Pick<JournalEntry, "title" | "body">>
): Promise<void> => {
  const entryRef = doc(db, COLLECTION_NAME, entryId);
  await updateDoc(entryRef, updates);
};

/**
 * Deletes a journal entry
 */
export const deleteEntry = async (entryId: string): Promise<void> => {
  const entryRef = doc(db, COLLECTION_NAME, entryId);
  await deleteDoc(entryRef);
};
