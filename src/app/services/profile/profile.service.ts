import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { addDoc, doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Photo } from '@capacitor/camera';
import { collection } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}
  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef, { idField: 'id' });
  }
  async uploadImage(cameraFile: Photo,body) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      const imageUrl = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await updateDoc(userDocRef,
        {imageUrl}
     );
      return true;
    } catch (e) {
      return null;
    }
  }
  async aboutMe(body) {
    try {
      const user = this.auth.currentUser;
      try {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        await updateDoc(userDocRef, body);
        return true;
      } catch (e) {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
}
