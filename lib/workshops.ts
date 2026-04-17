import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import { Workshop, WorkshopStatus } from '../types';
import { WORKSHOPS } from '../constants';

const COLLECTION = 'workshops';

function workshopsRef() {
  return collection(db, COLLECTION);
}

function workshopDocRef(id: string) {
  return doc(db, COLLECTION, id);
}

function docToWorkshop(docSnap: { id: string; data: () => Record<string, unknown> }): Workshop {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    slug: data.slug as string,
    title: data.title as string,
    date: data.date as string,
    status: data.status as WorkshopStatus,
    shortDescription: data.shortDescription as string,
    fullDescription: data.fullDescription as string,
    imageUrl: data.imageUrl as string,
    categories: (data.categories ?? []) as Workshop['categories'],
    location: data.location as string,
    pricing: (data.pricing ?? []) as Workshop['pricing'],
    features: (data.features ?? []) as string[],
    schedules: (data.schedules ?? []) as Workshop['schedules'],
    registrationLink: data.registrationLink as string,
  };
}

export async function getWorkshops(): Promise<Workshop[]> {
  const snapshot = await getDocs(workshopsRef());
  return snapshot.docs.map(docToWorkshop);
}

export async function getWorkshopsByStatus(status: WorkshopStatus): Promise<Workshop[]> {
  const snapshot = await getDocs(
    query(workshopsRef(), where('status', '==', status))
  );
  return snapshot.docs.map(docToWorkshop);
}

export async function getWorkshopBySlug(slug: string): Promise<Workshop | null> {
  const snapshot = await getDocs(
    query(workshopsRef(), where('slug', '==', slug))
  );
  if (snapshot.empty) return null;
  return docToWorkshop(snapshot.docs[0]);
}

export async function getWorkshopById(id: string): Promise<Workshop | null> {
  const docSnap = await getDoc(workshopDocRef(id));
  if (!docSnap.exists()) return null;
  return docToWorkshop(docSnap as unknown as { id: string; data: () => Record<string, unknown> });
}

export async function createWorkshop(data: Omit<Workshop, 'id'>): Promise<string> {
  const docRef = await addDoc(workshopsRef(), data);
  return docRef.id;
}

export async function updateWorkshop(id: string, data: Partial<Omit<Workshop, 'id'>>): Promise<void> {
  await updateDoc(workshopDocRef(id), data as Record<string, unknown>);
}

export async function deleteWorkshop(id: string): Promise<void> {
  await deleteDoc(workshopDocRef(id));
}

export async function archiveWorkshop(id: string): Promise<void> {
  await updateDoc(workshopDocRef(id), { status: WorkshopStatus.PAST });
}

export async function restoreWorkshop(id: string): Promise<void> {
  await updateDoc(workshopDocRef(id), { status: WorkshopStatus.UPCOMING });
}

export async function seedWorkshops(): Promise<void> {
  const batch = writeBatch(db);
  for (const workshop of WORKSHOPS) {
    const { id, ...data } = workshop;
    const ref = doc(db, COLLECTION, id);
    batch.set(ref, data);
  }
  await batch.commit();
}
