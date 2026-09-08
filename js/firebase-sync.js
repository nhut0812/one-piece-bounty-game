// Firebase Sync cho One Piece Bounty Game
// Tự động đồng bộ dữ liệu giữa các trình duyệt/thiết bị

// Firebase sẽ được khởi tạo bởi firebase-config.js
let syncEnabled = false;
let isSyncing = false;

// Khởi tạo Firebase
function initFirebase() {
  try {
    if (typeof firebase === 'undefined') {
      console.log('⚠️ Firebase SDK chưa load. Sync sẽ bật khi sẵn sàng.');
      return false;
    }
    
    // Firebase đã được khởi tạo bởi firebase-config.js
    if (!database) {
      console.error('❌ Database chưa được khởi tạo');
      return false;
    }
    
    console.log('✅ Firebase sync ready');
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
    
    // Load accounts từ localStorage
    let accounts = JSON.parse(localStorage.getItem('onePieceAccounts') || '[]');
    
    // Đảm bảo luôn có admin trong danh sách sync lên
    const hasAdmin = accounts.some(a => a.role === 'admin');
    if (!hasAdmin) {
      accounts = [
        { username: 'admin', email: 'admin@onepiece.com', password: 'admin123', role: 'admin', status: 'active', createdAt: '2025-01-01' },
        ...accounts
      ];
      // Cập nhật lại localStorage
      localStorage.setItem('onePieceAccounts', JSON.stringify(accounts));
    }
    
    // Lấy quests, submissions và questAttempts từ localStorage
    const quests = JSON.parse(localStorage.getItem('onePieceQuests') || '[]');
    const submissions = JSON.parse(localStorage.getItem('onePieceSubmissions') || '[]');
    const questAttempts = JSON.parse(localStorage.getItem('onePieceQuestAttempts') || '{}');
    const rewards = JSON.parse(localStorage.getItem('onePieceRewards') || '[]');
    const exchanges = JSON.parse(localStorage.getItem('onePieceExchanges') || '[]');
    
    const data = {
      pirates: pirates,
      crews: crews,
      accounts: accounts,
      rankImages: rankImages,
      crewImages: crewImages,
      quests: quests,
      submissions: submissions,
      questAttempts: questAttempts,
      rewards: rewards,
      exchanges: exchanges,
      lastUpdate: Date.now(),
      lastUserId: userId,
    };
    
    await database.ref('sharedData').update(data);
    console.log('☁️ Synced to Firebase:', pirates.length, 'pirates,', accounts.length, 'accounts,', quests.length, 'quests,', rewards.length, 'rewards,', exchanges.length, 'exchanges');
    showSyncNotification(`✅ Đã đồng bộ ${pirates.length} hải tặc, ${accounts.length} tài khoản, ${quests.length} nhiệm vụ, ${rewards.length} phần thưởng, ${exchanges.length} giao dịch lên cloud`);
  } catch (error) {
    console.error('❌ Sync error:', error);
    showSyncNotification('⚠️ Lỗi đồng bộ');
  } finally {
    isSyncing = false;
  }
}

// Load dữ liệu từ Firebase
async function loadFromFirebase(forceLoad = false) {
  if (!database || !syncEnabled) return false;
  
  try {
    const userId = getUserId();
    const snapshot = await database.ref('sharedData').once('value');
    const data = snapshot.val();
    
    if (data && data.pirates && data.pirates.length > 0) {
      const localLastUpdate = localStorage.getItem('lastLocalUpdate') || 0;
      const cloudLastUpdate = data.lastUpdate || 0;
          const hasNewerData = forceLoad || cloudLastUpdate > localLastUpdate;
      
      // Chỉ thay local bằng cloud khi cloud mới hơn, trừ khi được yêu cầu ép tải.
        if (hasNewerData) {
          pirates = data.pirates;
        rankImages = data.rankImages || {};
        crewImages = data.crewImages || {};
        if (data.crews) crews = data.crews;
        if (data.accounts) {
          // Đảm bảo luôn có admin account
          const hasAdmin = data.accounts.some(a => a.role === 'admin');
          let finalAccounts = data.accounts;
          
          if (!hasAdmin) {
            // Thêm admin mặc định nếu không có
            finalAccounts = [
              { username: 'admin', email: 'admin@onepiece.com', password: 'admin123', role: 'admin', status: 'active', createdAt: '2025-01-01' },
              ...data.accounts
            ];
          }
          
          localStorage.setItem('onePieceAccounts', JSON.stringify(finalAccounts));
        }
        localStorage.setItem('onePiecePirates', JSON.stringify(pirates));
        localStorage.setItem('onePieceRankImages', JSON.stringify(rankImages));
        localStorage.setItem('onePieceCrewImages', JSON.stringify(crewImages));
        if (data.crews) localStorage.setItem('onePieceCrews', JSON.stringify(crews));
        if (data.quests) localStorage.setItem('onePieceQuests', JSON.stringify(data.quests));
        if (data.submissions) localStorage.setItem('onePieceSubmissions', JSON.stringify(data.submissions));
        if (data.questAttempts) localStorage.setItem('onePieceQuestAttempts', JSON.stringify(data.questAttempts));
        if (data.rewards) localStorage.setItem('onePieceRewards', JSON.stringify(data.rewards));
        if (data.exchanges) localStorage.setItem('onePieceExchanges', JSON.stringify(data.exchanges));
        
        // Chỉ gọi renderPirates nếu hàm tồn tại (không có trong battle.html)
        if (typeof renderPirates === 'function') {
          renderPirates();
        }
        
        // Reload submissions in admin panel if available
        if (typeof submissions !== 'undefined' && data.submissions) {
          submissions = data.submissions;
          if (typeof renderSubmissions === 'function') {
            renderSubmissions();
          }
        }
        
        // Reload quests in admin panel if available
        if (typeof quests !== 'undefined' && data.quests) {
          quests = data.quests;
          if (typeof renderQuests === 'function') {
            renderQuests();
          }
        }
        
        // Reload rewards in admin panel if available
        if (typeof rewards !== 'undefined' && data.rewards) {
          rewards = data.rewards;
          if (typeof renderRewards === 'function') {
            renderRewards();
          }
        }
        
        // Reload exchanges in admin panel if available
        if (typeof exchanges !== 'undefined' && data.exchanges) {
          exchanges = data.exchanges;
          if (typeof renderExchanges === 'function') {
            renderExchanges();
          }
        }
        
        console.log('☁️ Loaded from Firebase:', pirates.length, 'pirates,', (data.accounts || []).length, 'accounts,', (data.quests || []).length, 'quests,', (data.submissions || []).length, 'submissions,', (data.rewards || []).length, 'rewards,', (data.exchanges || []).length, 'exchanges');
        showSyncNotification(`📥 Đã tải ${pirates.length} hải tặc, ${(data.quests || []).length} nhiệm vụ, ${(data.rewards || []).length} phần thưởng, ${(data.exchanges || []).length} giao dịch từ cloud`);
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
    if (!data || !data.pirates || data.lastUserId === userId) return;

    loadFromFirebase(false).then(loaded => {
      if (loaded) {
        console.log('🔄 Realtime update from Firebase');
        showSyncNotification('🔄 Dữ liệu đã cập nhật');
      }
    });
  });
}

// Bật/tắt Firebase Sync
function toggleFirebaseSync() {
  syncEnabled = !syncEnabled;
  localStorage.setItem('firebaseSyncEnabled', syncEnabled);
  
  if (syncEnabled) {
    // Thử khởi tạo Firebase nếu chưa có
    if (!database) {
      const initialized = initFirebase();
      if (!initialized) {
        // Chờ 1 giây rồi thử lại
        setTimeout(() => {
          if (!initFirebase()) {
            syncEnabled = false;
            localStorage.setItem('firebaseSyncEnabled', false);
            alert('❌ Không thể kết nối Firebase. Vui lòng kiểm tra kết nối internet và refresh trang.');
            updateSyncButton();
            return;
          }
          // Nếu init thành công sau retry
          proceedWithSync();
        }, 1000);
        return;
      }
    }
    
    proceedWithSync();
  } else {
    // Tắt listener khi disable sync
    if (database) {
      database.ref('sharedData').off();
    }
    showSyncNotification('❌ Đã tắt đồng bộ cloud');
    updateSyncButton();
  }
}

function proceedWithSync() {
  if (!database) {
    console.error('❌ Database không tồn tại trong proceedWithSync');
    syncEnabled = false;
    updateSyncButton();
    return;
  }
  
  console.log('✅ Bắt đầu đồng bộ...');
  
  // Chọn dữ liệu mới hơn trước khi bật sync để không ghi đè thay đổi local.
  loadFromFirebase().then((loaded) => {
    if (!loaded) {
      // Chỉ upload khi cloud thực sự trống
      console.log('📤 Cloud trống, upload dữ liệu local lên...');
      if (pirates.length > 0) {
        syncToFirebase();
      }
    } else {
      console.log('✅ Đã load dữ liệu từ cloud');
    }
    listenToFirebase();
  }).catch((error) => {
    console.error('❌ Lỗi khi load từ Firebase:', error);
    // Không tắt sync, chỉ thông báo lỗi
    showSyncNotification('⚠️ Lỗi khi tải dữ liệu từ cloud');
  });
  
  showSyncNotification('✅ Đã bật đồng bộ cloud');
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

// Hiển thị modal hỏi đồng bộ lần đầu
function showFirstTimeSyncPrompt() {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.id = 'syncPromptModal';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 500px; text-align: center;">
      <h2 style="color: #f39c12; margin-bottom: 20px;">☁️ Đồng Bộ Dữ Liệu</h2>
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
        🏴‍☠️ Bạn có muốn <strong>bật đồng bộ cloud</strong> để tải dữ liệu hải tặc từ hệ thống về không?
      </p>
      <p style="font-size: 14px; color: #95a5a6; margin-bottom: 30px;">
        💡 Dữ liệu sẽ được đồng bộ tự động giữa các thiết bị
      </p>
      <div style="display: flex; gap: 15px; justify-content: center;">
        <button onclick="enableSyncFromPrompt()" style="
          background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        ">
          ✅ Bật Đồng Bộ
        </button>
        <button onclick="closeSyncPrompt()" style="
          background: linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        ">
          ❌ Để sau
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Bật sync từ prompt
function enableSyncFromPrompt() {
  localStorage.setItem('syncPromptShown', 'true');
  closeSyncPrompt();
  toggleFirebaseSync();
}

// Đóng prompt
function closeSyncPrompt() {
  localStorage.setItem('syncPromptShown', 'true');
  const modal = document.getElementById('syncPromptModal');
  if (modal) modal.remove();
}

// Khởi tạo khi load trang
window.addEventListener('load', () => {
  // Khôi phục trạng thái sync từ localStorage trước
  const savedSyncState = localStorage.getItem('firebaseSyncEnabled');
  // Thiết bị mới tự bật sync để dữ liệu dùng chung giữa nhiều máy.
  syncEnabled = savedSyncState === null || savedSyncState === 'true';
  
  // Cập nhật button ngay lập tức
  updateSyncButton();
  
  // Đợi Firebase SDK load xong
  setTimeout(() => {
    const initialized = initFirebase();
    
    if (initialized && syncEnabled) {
      // Khi mở trang, nếu sync đang bật, chọn dữ liệu mới hơn.
      console.log('🔄 Sync đang bật, đang load dữ liệu từ cloud...');
      loadFromFirebase().then((loaded) => {
        if (loaded) {
          console.log('✅ Đã load dữ liệu từ cloud khi khởi động');
        }
        listenToFirebase();
      });
    } else if (initialized && !syncEnabled) {
      // Kiểm tra xem đã hiển thị prompt chưa
      const promptShown = localStorage.getItem('syncPromptShown');
      if (!promptShown) {
        // Hiển thị prompt lần đầu
        setTimeout(() => showFirstTimeSyncPrompt(), 500);
      }
    } else if (!initialized) {
      console.log('⚠️ Firebase chưa khởi tạo được, sync tạm thời tắt');
      syncEnabled = false;
      updateSyncButton();
    }
  }, 1000);
});
