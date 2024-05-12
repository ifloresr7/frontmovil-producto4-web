/*import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

export class PushNotificationService {
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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Firebase Cloud Messaging and get a reference to the service
    const messaging = getMessaging(app);

  }
}*/
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

export class PushNotificationService {
  private messaging: any; // O puedes tipar esta variable con el tipo de Firebase Messaging correspondiente

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

    // Inicializa Firebase
    const app = initializeApp(firebaseConfig);

    // Inicializa Firebase Cloud Messaging y obtén una referencia al servicio
    this.messaging = getMessaging(app);

    // Solicita permiso de notificación al usuario
    this.requestPermission();

    // Obtiene el token de registro
    this.getRegistrationToken();
  }

  requestPermission = () => {
    console.log('Solicitando permiso...');
    /* Notification.requestPermission().then(
      (permission: NotificationPermission) => {
        if (permission === 'granted') {
          console.log('Permiso de notificación concedido.');
        } else {
          console.log('El usuario no ha concedido el permiso de notificación.');
        }
      }
    );*/

    /*  this.requestPermission = () => {
      return new Promise(async (resolve, reject) => {
        const permsis = await Notification.requestPermission();
        if (permsis === "granted") {
          const tokenFirebase = await this.messaging.getToken();
          resolve(tokenFirebase);

        } else {
          reject(new Error("No se otorgaron los permisos"))
        }
      })
    } 
  }*/
    return new Promise(async (resolve, reject) => {
      console.log('Solicitando permiso2...');
      if (!('Notification' in window)) {
        reject(
          new Error(
            'La API de notificaciones no está soportada en este navegador'
          )
        );
        return;
      }

      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          //const tokenFirebase = await this.messaging.getToken();
          //resolve(tokenFirebase);
          console.log('Permiso concedido..');
        } else {
          reject(new Error('Los permisos de notificación fueron denegados'));
        }
      } catch (error) {
        reject(new Error('Error al obtener el token de Firebase: ' + error));
      }
    });
  };

  getRegistrationToken(): void {
    console.log('Pidiendo token');
    getToken(this.messaging, {
      vapidKey: '',
    })
      .then((currentToken: string | null) => {
        if (currentToken) {
          console.log('Token de registro:', currentToken);
          // Enviar el token al servidor y actualizar la interfaz de usuario si es necesario
        } else {
          console.log(
            'No hay disponible un token de registro. Solicitar permiso para generar uno.'
          );
        }
      })
      .catch((err: any) => {
        console.error('Ocurrió un error al obtener el token de registro:', err);
      });
  }
}
