import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { collection, getFirestore, addDoc, getDocs, where, query } from "firebase/firestore";

export class PushNotificationService {
  private messaging: any;
  private firestore: any;
  private isPermissionGranted: boolean = false;

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyArTWjHtnAW17b9__JAlzGl4Y_rAg4v-ck',
      authDomain: 'frontmovil-producto4-d3941.firebaseapp.com',
      projectId: 'frontmovil-producto4-d3941',
      storageBucket: 'frontmovil-producto4-d3941.appspot.com',
      messagingSenderId: '349167493430',
      appId: '1:349167493430:web:5b058e264d4ad522d41397',
      measurementId: 'G-RCF84KNFGF',
    };
    const app = initializeApp(firebaseConfig);
    this.messaging = getMessaging(app);
    this.firestore = getFirestore(app); // Initialize Firestore
    this.requestPermission();
    this.getRegistrationToken();
  }

  async requestPermission(): Promise<void> {
    console.log('Solicitando permiso...');
    if (!('Notification' in window)) {
      throw new Error('La API de notificaciones no está soportada en este navegador');
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Permiso concedido..');
      } else {
        throw new Error('Los permisos de notificación fueron denegados');
      }
    } catch (error) {
      throw new Error('Error al obtener el token de Firebase: ' + error);
    }
  }

  async getRegistrationToken(): Promise<void> {
    console.log('Pidiendo token');
    getToken(this.messaging, {
      vapidKey: '',
    })
      .then(async (currentToken: string | null) => {
        if (currentToken) {
          console.log('Token de registro:', currentToken);
          const existsInFirestore = await this.checkTokenInFirestore(currentToken);
          if (existsInFirestore) {
            console.log('El token ya está registrado en Firestore.');
          } else {
            console.log('El token no está registrado en Firestore. Registrándolo...');
            const docData = {
              token: currentToken
            }
            await addDoc(collection(this.firestore, "tokens"), docData);
          }
        } else {
          console.log('No hay disponible un token de registro. Solicitar permiso para generar uno.');
        }
      })
      .catch((err: any) => {
        console.error('Ocurrió un error al obtener el token de registro:', err);
      });
  }

  async checkTokenInFirestore(token: string): Promise<boolean> {
    try {
      const tokensCollectionRef = collection(this.firestore, 'tokens');
      const querySnapshot = await getDocs(query(tokensCollectionRef, where('token', '==', token)));
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error al verificar el token en Firestore:', error);
      return false;
    }
  }
}