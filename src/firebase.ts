// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD0Z-Kr5KvGfNW2laUfakjbqnrzUGscs58",
    authDomain: "md4-server.firebaseapp.com",
    projectId: "md4-server",
    storageBucket: "md4-server.appspot.com",
    messagingSenderId: "1096460380616",
    appId: "1:1096460380616:web:084e5edf9ab14b45d1b8fd",
    measurementId: "G-D64NL8DYNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export async function uploadFileToStorage(file: any, folderName: any, bufferData: any) {
    //nếu file null thì không làm gì
    if(!file) {
        return false
    }
    let fileRef;
    let metadata;
    if (!bufferData) {
        //tên file trên firebase
        fileRef = ref(storage, `${folderName}/` + file.name)
    } else {
        fileRef = ref(storage, `${folderName}/` + (file as any).fileName)
        metadata = {
            contentType: (file as any).minetype,
        }
    }
    let url;
    if(bufferData) {
        //upload file lên fire storage
        url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
            //khi up thành công thì tìm url
            return await getDownloadURL(res.ref)
                .then(url => {
                    console.log("url", url)
                    return url
                })
                .catch(er => false)
        })
    } else {
        url = await uploadBytes(fileRef, file).then(async res => {
            //khi up thành công thì tìm url
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    }
    return url
}
