// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMow1S51XanUxwyLbwt714Wgqjue7-2Mk",
  authDomain: "one-piece-bounty-game.firebaseapp.com",
  databaseURL: "https://one-piece-bounty-game-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "one-piece-bounty-game",
  storageBucket: "one-piece-bounty-game.firebasestorage.app",
  messagingSenderId: "410745987244",
  appId: "1:410745987244:web:b1053716c882ebae77bf09"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

console.log('✅ Firebase initialized successfully');
