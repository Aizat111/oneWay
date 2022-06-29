import { collection, getDoc, where } from 'firebase/firestore';
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
import { addDoc, collectionData, doc, docData, Firestore, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PublishService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}
  getCities(city?:string):Observable<any> {
    console.log(city);
   if(city!=''){
    const userDocRef = collection(this.firestore, 'cities');
    const q =  query(userDocRef, where("name", ">=", city), where("name", "<=", city+ '\uf8ff'));
    return collectionData(q, { idField: 'id' });
   }else{
    const userDocRef = collection(this.firestore, 'cities');
    return collectionData(userDocRef, { idField: 'id' });
   }
  
  }
  getPosts():Observable<any> {
    const user = this.auth.currentUser;
    const userDocRef = collection(this.firestore, 'posts');
    const q =  query(userDocRef, where("user_id", "==", user.uid));
    return collectionData(q, { idField: 'id' });
  }
  async post(body) {
    try {
      const user = this.auth.currentUser;
      try {
        const userDocRef = collection(this.firestore, `posts`);
        await addDoc(userDocRef, body);
        return true;
      } catch (e) {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  getSearchResults(body?:any):Observable<any> {
    console.log(body);
   if(body!=''){
    const userDocRef = collection(this.firestore, 'posts');
    const q =  query(userDocRef, where("from", "==", body.from), where("to", "==", body.to));
    return collectionData(q, { idField: 'id' });
   }else{
    const userDocRef = collection(this.firestore, 'posts');
    return collectionData(userDocRef, { idField: 'id' });
   }
  
  }
}
