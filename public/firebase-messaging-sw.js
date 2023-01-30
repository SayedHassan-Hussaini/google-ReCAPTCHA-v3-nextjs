importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCiI5wXOUJf6eBn2XgSjZoHlfXiAGl15Cw",
  authDomain: "herat-echange-website.firebaseapp.com",
  projectId: "herat-echange-website",
  storageBucket: "herat-echange-website.appspot.com",
  messagingSenderId: "591452136979",
  appId: "1:591452136979:web:ffc39412b0116acd0181e6"
}

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
