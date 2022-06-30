import { collection, deleteDoc, getDoc, where } from 'firebase/firestore';
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
  userData:any;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    
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
  getPost(id:any):Observable<any> {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `posts/${id}`);
    return docData(userDocRef, { idField: 'id' });
  }
  async post(body) {
    const user = this.auth.currentUser;

    try {
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
  async updatePost(id:string,body:any) {
    try {
      try {
        const userDocRef = doc(this.firestore, `posts/${id}`);
        await updateDoc(userDocRef, body);
        return true;
      } catch (e) {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  deletePost(id:string){
    const userDocRef = doc(this.firestore, `posts/${id}`);
    return deleteDoc(userDocRef);
  }


  getSearchResults(body?:any):Observable<any> {
    console.log(body);
   if(body!=''){
    const userDocRef = collection(this.firestore, 'posts');
    const q =  query(userDocRef, where("from", "==", body.from), where("to", "==", body.to), where("date", "==", body.date));
    return collectionData(q, { idField: 'id' });
   }else{
    const userDocRef = collection(this.firestore, 'posts');
    return collectionData(userDocRef, { idField: 'id' });
   }
  
  }

  getUserProfile(user:any) {
    
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef, { idField: 'id' });
  }
  async addUser(body) {
    try {
      const user = this.auth.currentUser;
      try {
        const userDocRef = doc(this.firestore, `post_psgnrs`);
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
