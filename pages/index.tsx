import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { getFirebaseToken, onForegroundMessage } from '../lib/firebase';

export default function Home() {
  const [showNotificationBanner, setShowNotificationBanner] = useState(Notification.permission === 'default');

  useEffect(() => {
    onForegroundMessage()
      .then((payload) => {
        console.log('Received foreground message: ', payload);
        const { notification: { title, body } } = payload;
        toast(<ToastifyNotification title={title} body={body} />);
      })
      .catch(err => console.log('An error occured while retrieving foreground message. ', err));
  }, []);

  const handleGetFirebaseToken = () => {
    console.log("in")
    getFirebaseToken()
      .then((firebaseToken) => {
        console.log('Firebase token: ', firebaseToken);
        if (firebaseToken) {
          console.log("firebaseToken..........",firebaseToken)
          setShowNotificationBanner(false);
        }
      })
      .catch((err) => console.error('An error occured while retrieving firebase token. ', err))
  }

  const ToastifyNotification = ({ title, body }) => (
    <div className="push-notification">
      <h2 className="push-notification-title">{title}</h2>
      <p className="push-notification-text">{body}</p>
    </div>
  );
  return (
    <div className="app">
    {showNotificationBanner && <div className="notification-banner">
      <span>The app needs permission to</span>
      <a
        href="#"
        className="notification-banner-link"
        onClick={handleGetFirebaseToken}
      >
        enable push notifications.
      </a>
    </div>}


    <button
      className="btn-primary"
      // onClick={() => toast(<ToastifyNotification title="New Message" body="Hi there!" />)}
      onClick={handleGetFirebaseToken}
    >
      Show toast notification
    </button>

    <ToastContainer hideProgressBar />
  </div>
  )
}
