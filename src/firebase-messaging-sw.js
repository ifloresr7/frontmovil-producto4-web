importScripts("https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js");

firebase.initializeApp(
    {
        /*apiKey: "AIzaSyAFtfVXeL9Oz0t1R4QTh0kUHXtPRQql04s",
        authDomain: "fuckyncode.firebaseapp.com",
        databaseURL: "https://fuckyncode.firebaseio.com",
        projectId: "fuckyncode",
        storageBucket: "fuckyncode.appspot.com",
        messagingSenderId: "31417481552",
        appId: "1:31417481552:web:94ec2797a0fb494aba1455"*/
        apiKey: "AIzaSyArTWjHtnAW17b9__JAlzGl4Y_rAg4v-ck",
        authDomain: "frontmovil-producto4-d3941.firebaseapp.com",
        projectId: "frontmovil-producto4-d3941",
        storageBucket: "frontmovil-producto4-d3941.appspot.com",
        messagingSenderId: "349167493430",
        appId: "1:349167493430:web:5b058e264d4ad522d41397",
        measurementId: "G-RCF84KNFGF"            
      }
)
const messaging= firebase.messaging();

// Manejar eventos de push
self.addEventListener('push', (event) => {
  // Manejar la notificación push
});