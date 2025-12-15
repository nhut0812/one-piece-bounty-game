// Battle System - Boss Personal Battle

const BATTLE_KEY = 'onePieceBattle';
const MAX_DAILY_ATTACKS = 5;

// Danh sách Boss theo level
const BOSS_LIST = [
  { level: 1, name: 'Alvida', hp: 1000, reward: 100, emoji: '👩‍🦰' },
  { level: 2, name: 'Buggy', hp: 2000, reward: 200, emoji: '🤡' },
  { level: 3, name: 'Don Krieg', hp: 4000, reward: 400, emoji: '⚙️' },
  { level: 4, name: 'Arlong', hp: 8000, reward: 800, emoji: '🦈' },
  { level: 5, name: 'Crocodile', hp: 16000, reward: 1600, emoji: '🐊' },
  { level: 6, name: 'Enel', hp: 32000, reward: 3200, emoji: '⚡' },
  { level: 7, name: 'Rob Lucci', hp: 64000, reward: 6400, emoji: '🐆' },
  { level: 8, name: 'Gecko Moria', hp: 128000, reward: 12800, emoji: '🦇' },
  { level: 9, name: 'Doflamingo', hp: 256000, reward: 25600, emoji: '🦩' },
  { level: 10, name: 'Katakuri', hp: 512000, reward: 51200, emoji: '🍩' },
  { level: 11, name: 'Kaido', hp: 1024000, reward: 102400, emoji: '🐉' },
  { level: 12, name: 'Big Mom', hp: 2048000, reward: 204800, emoji: '🎂' },
  { level: 13, name: 'Akainu', hp: 4096000, reward: 409600, emoji: '🌋' },
  { level: 14, name: 'Blackbeard', hp: 8192000, reward: 819200, emoji: '💀' },
  { level: 15, name: 'Imu-sama', hp: 16384000, reward: 1638400, emoji: '👁️' }
];

// Lấy dữ liệu battle từ localStorage
function getBattleData() {
  const data = localStorage.getItem(BATTLE_KEY);
  if (!data) {
    return {
      currentBossIndex: 0,
      currentBossHP: BOSS_LIST[0].hp,
      maxBossHP: BOSS_LIST[0].hp,
      dailyAttacks: 0,
      lastAttackDate: null,
      battleLog: [],
      totalBossesDefeated: 0
    };
  }
  return JSON.parse(data);
}

// Lưu dữ liệu battle
function saveBattleData(data) {
  localStorage.setItem(BATTLE_KEY, JSON.stringify(data));
  
  // Sync lên Firebase
  syncBattleToFirebase(data);
}

// Sync battle data lên Firebase
async function syncBattleToFirebase(data) {
  if (typeof database !== 'undefined' && database) {
    const user = getCurrentUser();
    if (user) {
      const pirates = JSON.parse(localStorage.getItem('onePiecePirates') || '[]');
      const userPirate = pirates.find(p => p.name === user.pirateId);
      if (userPirate) {
        try {
          const path = 'battleData/' + userPirate.name;
          console.log('[BATTLE SYNC] Đang sync lên Firebase path:', path);
          console.log('[BATTLE SYNC] Data sync:', {
            boss: BOSS_LIST[data.currentBossIndex]?.level,
            hp: data.currentBossHP,
            attacks: data.dailyAttacks
          });
          
          await database.ref(path).set(data);
          console.log('[BATTLE SYNC] ✅ Đã sync battle data lên Firebase');
        } catch (error) {
          console.error('[BATTLE SYNC] ❌ Lỗi sync battle data:', error);
        }
      }
    }
  }
}

// Load battle data từ Firebase
async function loadBattleDataFromFirebase() {
  console.log('[BATTLE SYNC] loadBattleDataFromFirebase() được gọi');
  
  // Kiểm tra database
  if (typeof database === 'undefined' || !database) {
    console.log('[BATTLE SYNC] Firebase chưa khởi tạo, dùng localStorage');
    return getBattleData();
  }
  
  const user = getCurrentUser();
  if (!user) {
    console.log('[BATTLE SYNC] Không có user, dùng localStorage');
    return getBattleData();
  }
  
  const pirates = JSON.parse(localStorage.getItem('onePiecePirates') || '[]');
  const userPirate = pirates.find(p => p.name === user.pirateId);
  
  if (!userPirate) {
    console.log('[BATTLE SYNC] Không tìm thấy pirate, dùng localStorage');
    return getBattleData();
  }
  
  const path = 'battleData/' + userPirate.name;
  console.log('[BATTLE SYNC] Đang load từ Firebase path:', path);
  
  try {
    // Thêm timeout 3s để tránh treo
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 3000)
    );
    
    const dataPromise = database.ref(path).once('value');
    
    const snapshot = await Promise.race([dataPromise, timeoutPromise]);
    const data = snapshot.val();
    
    console.log('[BATTLE SYNC] Dữ liệu Firebase:', data);
    
    if (data) {
      // Đảm bảo dữ liệu có đầy đủ fields (dữ liệu cũ có thể thiếu battleLog)
      const fullData = {
        ...data,
        battleLog: data.battleLog || [],
        totalBossesDefeated: data.totalBossesDefeated || 0
      };
      
      console.log('[BATTLE SYNC] ✅ Load thành công - Boss cấp', BOSS_LIST[fullData.currentBossIndex]?.level);
      localStorage.setItem(BATTLE_KEY, JSON.stringify(fullData));
      return fullData;
    } else {
      console.log('[BATTLE SYNC] ⚠️ Chưa có data trên Firebase, dùng localStorage');
      return getBattleData();
    }
  } catch (error) {
    console.error('[BATTLE SYNC] ❌ Lỗi load từ Firebase:', error.message);
    console.log('[BATTLE SYNC] Fallback về localStorage');
    return getBattleData();
  }
}

// Reset lượt đánh hàng ngày
function resetDailyAttacksIfNeeded(battleData) {
  const today = new Date().toISOString().split('T')[0];
  if (battleData.lastAttackDate !== today) {
    battleData.dailyAttacks = 0;
    battleData.lastAttackDate = today;
    battleData.battleLog = [];
    
    // Sync ngay khi reset
    saveBattleData(battleData);
  }
  return battleData;
}

// Render Battle UI
async function renderBattle() {
  console.log('[BATTLE] Bắt đầu render...');
  
  const container = document.getElementById('battleContainer');
  if (!container) {
    console.error('[BATTLE] Không tìm thấy battleContainer!');
    return;
  }
  
  const user = getCurrentUser();
  if (!user) {
    console.log('[BATTLE] User chưa đăng nhập');
    container.innerHTML = '<p style="text-align: center; color: #e74c3c;">Vui lòng đăng nhập để chiến đấu!</p>';
    return;
  }
  
  const pirates = JSON.parse(localStorage.getItem('onePiecePirates') || '[]');
  const userPirate = pirates.find(p => p.name === user.pirateId);
  
  if (!userPirate) {
    console.log('[BATTLE] Không tìm thấy pirate:', user.pirateId);
    container.innerHTML = '<p style="text-align: center; color: #e74c3c;">Bạn chưa có hải tặc liên kết!</p>';
    return;
  }
  
  console.log('[BATTLE] Đang load battle data...');
  
  try {
    // QUAN TRỌNG: Luôn load từ Firebase trước
    let battleData = await loadBattleDataFromFirebase();
    
    console.log('[BATTLE] Battle data loaded:', battleData);
    
    // Reset lượt nếu cần
    battleData = resetDailyAttacksIfNeeded(battleData);
    
    const currentBoss = BOSS_LIST[battleData.currentBossIndex];
    console.log('[BATTLE] Current boss:', currentBoss);
    
    const remainingAttacks = MAX_DAILY_ATTACKS - battleData.dailyAttacks;
    const playerDamage = userPirate.bounty;
    const hpPercentage = (battleData.currentBossHP / battleData.maxBossHP) * 100;
    
    container.innerHTML = `
    <div class="battle-container">
      <div class="battle-header">
        <h2 class="battle-title">⚔️ CHIẾN TRƯỜNG BOSS ⚔️</h2>
        <div class="battle-attempts">
          🎯 Lượt đánh hôm nay: <strong>${battleData.dailyAttacks}/${MAX_DAILY_ATTACKS}</strong>
          ${remainingAttacks > 0 ? `(Còn ${remainingAttacks} lượt)` : '(Hết lượt)'}
        </div>
      </div>
      
      <div class="boss-arena">
        <div class="boss-info">
          <div class="boss-level">💀 BOSS CẤP ${currentBoss.level} 💀</div>
          <div class="boss-name">${currentBoss.name}</div>
          <div class="boss-image">${currentBoss.emoji}</div>
          
          <div class="boss-hp-container">
            <div class="boss-hp-label">
              <span>❤️ HP</span>
              <span>${battleData.currentBossHP.toLocaleString()} / ${battleData.maxBossHP.toLocaleString()}</span>
            </div>
            <div class="boss-hp-bar">
              <div class="boss-hp-fill" style="width: ${hpPercentage}%">
                ${hpPercentage.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
        
        <div class="player-stats">
          <h4>🏴‍☠️ Thông Số Của Bạn</h4>
          <div class="stat-row">
            <span class="stat-label">Tên:</span>
            <span class="stat-value">${userPirate.name}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Bounty:</span>
            <span class="stat-value">${userPirate.bounty.toLocaleString()}฿</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">⚔️ Sát Thương/Đòn:</span>
            <span class="stat-value">${playerDamage.toLocaleString()} HP</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">🏆 Boss Đã Hạ:</span>
            <span class="stat-value">${battleData.totalBossesDefeated}</span>
          </div>
        </div>
        
        <div class="battle-actions">
          <button 
            class="btn-attack" 
            id="attackBtn" 
            onclick="attackBoss()"
            ${remainingAttacks <= 0 ? 'disabled' : ''}
          >
            ${remainingAttacks > 0 ? '⚡ TẤN CÔNG ⚡' : '🚫 HẾT LƯỢT'}
          </button>
        </div>
      </div>
      
      <div class="battle-log" id="battleLog">
        <h4>📜 Nhật Ký Chiến Đấu</h4>
        <div id="logEntries">
          ${!battleData.battleLog || battleData.battleLog.length === 0 ? 
            '<p style="color: #95a5a6; text-align: center;">Chưa có hoạt động...</p>' : 
            battleData.battleLog.map(log => `<div class="log-entry ${log.type}">${log.message}</div>`).join('')
          }
        </div>
      </div>
    </div>
  `;
  
  console.log('[BATTLE] ✅ Render hoàn tất');
  
  } catch (error) {
    console.error('[BATTLE] ❌ Lỗi render:', error);
    container.innerHTML = `<p style="text-align: center; color: #e74c3c;">Lỗi tải dữ liệu: ${error.message}</p>`;
  }
}

// Tấn công Boss
async function attackBoss() {
  const user = getCurrentUser();
  if (!user) {
    showToast('error', '❌ Vui lòng đăng nhập!');
    return;
  }
  
  const pirates = JSON.parse(localStorage.getItem('onePiecePirates') || '[]');
  const userPirate = pirates.find(p => p.name === user.pirateId);
  
  if (!userPirate) {
    showToast('error', '❌ Bạn chưa có hải tặc liên kết!');
    return;
  }
  
  // QUAN TRỌNG: Load từ Firebase trước khi tấn công
  let battleData = await loadBattleDataFromFirebase();
  battleData = resetDailyAttacksIfNeeded(battleData);
  
  // Kiểm tra lượt đánh
  if (battleData.dailyAttacks >= MAX_DAILY_ATTACKS) {
    showToast('error', '❌ Bạn đã hết lượt đánh hôm nay!');
    return;
  }
  
  const damage = userPirate.bounty;
  const currentBoss = BOSS_LIST[battleData.currentBossIndex];
  
  // Trừ HP boss
  battleData.currentBossHP -= damage;
  battleData.dailyAttacks++;
  
  // Thêm log
  const logEntry = {
    type: 'damage',
    message: `⚔️ Bạn tấn công ${currentBoss.name} gây ${damage.toLocaleString()} sát thương! (HP còn: ${Math.max(0, battleData.currentBossHP).toLocaleString()})`
  };
  battleData.battleLog.unshift(logEntry);
  
  // Kiểm tra boss chết
  if (battleData.currentBossHP <= 0) {
    // Boss bị hạ gục!
    battleData.totalBossesDefeated++;
    
    // Thêm điểm thưởng
    userPirate.bounty += currentBoss.reward;
    localStorage.setItem('onePiecePirates', JSON.stringify(pirates));
    
    // Sync điểm lên Firebase
    if (typeof database !== 'undefined' && database) {
      database.ref('sharedData/pirates').set(pirates);
    }
    
    battleData.battleLog.unshift({
      type: 'defeat',
      message: `🎉 Bạn đã hạ gục ${currentBoss.name}! Nhận ${currentBoss.reward.toLocaleString()}฿`
    });
    
    // Chuyển sang boss tiếp theo
    if (battleData.currentBossIndex < BOSS_LIST.length - 1) {
      battleData.currentBossIndex++;
      const nextBoss = BOSS_LIST[battleData.currentBossIndex];
      battleData.currentBossHP = nextBoss.hp;
      battleData.maxBossHP = nextBoss.hp;
      
      battleData.battleLog.unshift({
        type: 'reward',
        message: `💀 Boss mới xuất hiện: ${nextBoss.name} (Cấp ${nextBoss.level}) với ${nextBoss.hp.toLocaleString()} HP!`
      });
    } else {
      // Hết boss
      battleData.battleLog.unshift({
        type: 'reward',
        message: `🏆 CHÚC MỪNG! Bạn đã hạ gục tất cả các Boss! Hệ thống sẽ reset...`
      });
      
      // Reset về boss đầu
      battleData.currentBossIndex = 0;
      battleData.currentBossHP = BOSS_LIST[0].hp;
      battleData.maxBossHP = BOSS_LIST[0].hp;
    }
    
    // Hiển thị thông báo chiến thắng
    showVictoryMessage(currentBoss);
  }
  
  // Giới hạn log
  if (battleData.battleLog.length > 10) {
    battleData.battleLog = battleData.battleLog.slice(0, 10);
  }
  
  saveBattleData(battleData);
  renderBattle();
  
  // Toast thông báo
  if (battleData.currentBossHP > 0) {
    showToast('success', `⚔️ Gây ${damage.toLocaleString()} sát thương! (${MAX_DAILY_ATTACKS - battleData.dailyAttacks} lượt còn lại)`);
  }
}

// Hiển thị thông báo chiến thắng
function showVictoryMessage(boss) {
  const victoryDiv = document.createElement('div');
  victoryDiv.className = 'victory-modal';
  victoryDiv.innerHTML = `
    <h2>🎉 CHIẾN THẮNG! 🎉</h2>
    <p>Bạn đã hạ gục <strong>${boss.name}</strong>!</p>
    <p>Phần thưởng: <strong style="color: #f39c12;">+${boss.reward.toLocaleString()}฿</strong></p>
  `;
  
  document.body.appendChild(victoryDiv);
  
  setTimeout(() => {
    victoryDiv.remove();
  }, 3000);
}

// Khởi tạo khi load trang
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('battle.html')) {
    renderBattle();
  }
});

// Đồng bộ thủ công
async function forceSyncBattle() {
  const user = getCurrentUser();
  if (!user) {
    showToast('error', '❌ Bạn chưa đăng nhập!');
    return;
  }
  
  showToast('info', '☁️ Đang đồng bộ...');
  
  try {
    // Load từ Firebase
    const firebaseData = await loadBattleDataFromFirebase();
    
    // Render lại
    await renderBattle();
    
    showToast('success', '✅ Đã đồng bộ dữ liệu!');
  } catch (error) {
    console.error('Lỗi đồng bộ:', error);
    showToast('error', '❌ Lỗi đồng bộ!');
  }
}
