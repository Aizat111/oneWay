import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, docData, Firestore, updateDoc, addDoc, query, orderBy, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';


export interface User {
  uid: string;
  email: string;
}
 
export interface Message {
  createdAt: any;
  id: string;
  from: any;
  msg: string;
  fromName: string;
  myMsg: boolean;
  to:any
  toNmae:string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;
 
  constructor(private auth: Auth,
    private firestore: Firestore) {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;      
    });
  }


addChatMessage(sendID,getID,msg) {
  
  const userDocRef = collection(this.firestore,`messages/${sendID}/${getID}`);
  return addDoc(userDocRef, msg);
}
 
getChatMessages(sendID:string,getID:string) {
  const userDocRef = collection(this.firestore,`messages/${sendID}/${getID}`);
  const q =  query(userDocRef,orderBy("createdAt", "asc"));
  return collectionData(q);
  // let users = [];
  // return this.getUsers().pipe(
  //   switchMap(res => {
  //     users = res;
  //     const msjDocRef = collection(this.firestore,'messages');
  //     return collectionData(msjDocRef) as Observable<Message[]>;
  //   }),
  //   map(messages => {
  //     // Get the real name for each user
  //     for (let m of messages) {          
  //       m.fromName = this.getUserForMsg(m.from, users);
  //       m.myMsg = this.currentUser.uid === m.from;
  //     }        
  //     return messages
  //   })
  // )
}
 
 getUsers():Observable<any> {
  // const userDocRef = collection(this.firestore,'users');
  const user = this.auth.currentUser;
  const userDocRef = collection(this.firestore,`users`);

  return collectionData(userDocRef,{ idField: 'id' });
}
 
private getUserForMsg(msgFromId, users: User[]): string {    
  for (let usr of users) {
    if (usr.uid == msgFromId) {
      return usr.email;
    }
  }
  return 'Deleted';
}
}
function switchMap(arg0: (res: any) => Observable<Message[]>): any {
  throw new Error('Function not implemented.');
}

function map(arg0: (messages: any) => any): any {
  throw new Error('Function not implemented.');
}

