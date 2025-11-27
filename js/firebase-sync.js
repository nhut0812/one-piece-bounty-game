// Firebase Sync cho One Piece Bounty Game
// Tự động đồng bộ dữ liệu giữa các trình duyệt/thiết bị

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
let database = null;
let syncEnabled = false;
let isSyncing = false;

// Khởi tạo Firebase
function initFirebase() {
  try {
    if (typeof firebase === 'undefined') {
      console.log('⚠️ Firebase SDK chưa load. Sync sẽ bật khi sẵn sàng.');
      return false;
    }
    
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    console.log('✅ Firebase initialized');
    return true;
  } catch (error) {
    console.error('❌ Firebase init error:', error);
    return false;
  }
}

// Lấy User ID duy nhất (device-specific)
function getUserId() {
  let userId = localStorage.getItem('onePieceUserId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('onePieceUserId', userId);
  }
  return userId;
}

// Sync dữ liệu lên Firebase
async function syncToFirebase() {
  if (!database || !syncEnabled || isSyncing) return;
  
  isSyncing = true;
  try {
    const userId = getUserId();
    const data = {
      pirates: pirates,
      rankImages: rankImages,
      lastUpdate: Date.now(),
      lastUserId: userId
    };
    
    await database.ref('sharedData').set(data);
    console.log('☁️ Synced to Firebase');
    showSyncNotification('✅ Đã đồng bộ lên cloud');
  } catch (error) {
    console.error('❌ Sync error:', error);
    showSyncNotification('⚠️ Lỗi đồng bộ');
  } finally {
    isSyncing = false;
  }
}

// Load dữ liệu từ Firebase
async function loadFromFirebase() {
  if (!database || !syncEnabled) return false;
  
  try {
    const userId = getUserId();
    const snapshot = await database.ref('sharedData').once('value');
    const data = snapshot.val();
    
    if (data && data.pirates) {
      // So sánh timestamp
      const localLastUpdate = localStorage.getItem('lastLocalUpdate') || 0;
      const cloudLastUpdate = data.lastUpdate || 0;
      
      if (cloudLastUpdate > localLastUpdate) {
        pirates = data.pirates;
        rankImages = data.rankImages || {};
        saveToLocalStorage();
        renderPirates();
        console.log('☁️ Loaded from Firebase');
        showSyncNotification('📥 Đã tải dữ liệu từ cloud');
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('❌ Load error:', error);
    return false;
  }
}

// Lắng nghe thay đổi realtime từ Firebase
function listenToFirebase() {
  if (!database || !syncEnabled) return;
  
  const userId = getUserId();
  database.ref('sharedData').on('value', (snapshot) => {
    if (isSyncing) return; // Skip nếu đang sync
    
    const data = snapshot.val();
    if (data && data.pirates) {
      // Chỉ update nếu là từ device khác
      if (data.lastUserId === userId) return;
      
      const localLastUpdate = localStorage.getItem('lastLocalUpdate') || 0;
      const cloudLastUpdate = data.lastUpdate || 0;
      
      if (cloudLastUpdate > localLastUpdate) {
        pirates = data.pirates;
        rankImages = data.rankImages || {};
        localStorage.setItem('lastLocalUpdate', cloudLastUpdate);
        localStorage.setItem('onePiecePirates', JSON.stringify(pirates));
        localStorage.setItem('onePieceRankImages', JSON.stringify(rankImages));
        renderPirates();
        console.log('🔄 Realtime update from Firebase');
        showSyncNotification('🔄 Dữ liệu đã cập nhật');
      }
    }
  });
}

// Bật/tắt Firebase Sync
function toggleFirebaseSync() {
  syncEnabled = !syncEnabled;
  localStorage.setItem('firebaseSyncEnabled', syncEnabled);
  
  if (syncEnabled) {
    if (!database && !initFirebase()) {
      syncEnabled = false;
      alert('❌ Không thể kết nối Firebase. Vui lòng refresh trang.');
      return;
    }
    
    loadFromFirebase().then((loaded) => {
      if (!loaded) {
        // Nếu cloud chưa có dữ liệu, upload dữ liệu local lên
        console.log('📤 Cloud chưa có dữ liệu, upload local lên...');
        syncToFirebase();
      }
      listenToFirebase();
    });
    
    showSyncNotification('✅ Đã bật đồng bộ cloud');
  } else {
    // Tắt listener khi disable sync
    if (database) {
      database.ref('sharedData').off();
    }
    showSyncNotification('❌ Đã tắt đồng bộ cloud');
  }
  
  updateSyncButton();
}

// Cập nhật UI nút sync
function updateSyncButton() {
  const btn = document.getElementById('syncToggleBtn');
  if (btn) {
    if (syncEnabled) {
      btn.innerHTML = '☁️ ĐỒNG BỘ: BẬT';
      btn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
    } else {
      btn.innerHTML = '☁️ ĐỒNG BỘ: TẮT';
      btn.style.background = 'linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%)';
    }
  }
}

// Hiển thị thông báo sync
function showSyncNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    z-index: 10000;
    font-weight: 700;
    font-size: 14px;
    animation: slideInRight 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Override saveToLocalStorage để tự động sync
const originalSave = saveToLocalStorage;
saveToLocalStorage = function() {
  originalSave();
  localStorage.setItem('lastLocalUpdate', Date.now());
  if (syncEnabled && database) {
    syncToFirebase();
  }
};

// Khởi tạo khi load trang
window.addEventListener('load', () => {
  // Đợi Firebase SDK load xong
  setTimeout(() => {
    if (initFirebase()) {
      syncEnabled = localStorage.getItem('firebaseSyncEnabled') === 'true';
      if (syncEnabled) {
        loadFromFirebase().then(() => {
          listenToFirebase();
        });
      }
      updateSyncButton();
    }
  }, 1000);
});
