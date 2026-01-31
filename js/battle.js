// Battle System - Boss Personal Battle

const BATTLE_KEY = 'onePieceBattle';
const MAX_DAILY_ATTACKS = 5;

// Danh sách Boss theo level - 100 cấp
const BOSS_LIST = [
  // Arc 1: East Blue (Level 1-10)
  { level: 1, name: 'Alvida', hp: 1000, reward: 100, emoji: '👩‍🦰' },
  { level: 2, name: 'Buggy', hp: 2000, reward: 200, emoji: '🤡' },
  { level: 3, name: 'Kuro', hp: 3500, reward: 350, emoji: '🐱' },
  { level: 4, name: 'Don Krieg', hp: 6000, reward: 600, emoji: '⚙️' },
  { level: 5, name: 'Arlong', hp: 10000, reward: 1000, emoji: '🦈' },
  { level: 6, name: 'Smoker', hp: 15000, reward: 1500, emoji: '💨' },
  { level: 7, name: 'Mr. 3', hp: 22000, reward: 2200, emoji: '🕯️' },
  { level: 8, name: 'Mr. 2 Bon Clay', hp: 32000, reward: 3200, emoji: '🦢' },
  { level: 9, name: 'Mr. 1', hp: 45000, reward: 4500, emoji: '🔪' },
  { level: 10, name: 'Crocodile', hp: 65000, reward: 6500, emoji: '🐊' },
  
  // Arc 2: Sky Island (Level 11-20)
  { level: 11, name: 'Bellamy', hp: 90000, reward: 9000, emoji: '🦵' },
  { level: 12, name: 'Satori', hp: 120000, reward: 12000, emoji: '🎈' },
  { level: 13, name: 'Shura', hp: 160000, reward: 16000, emoji: '🦅' },
  { level: 14, name: 'Ohm', hp: 210000, reward: 21000, emoji: '☁️' },
  { level: 15, name: 'Gedatsu', hp: 280000, reward: 28000, emoji: '💭' },
  { level: 16, name: 'Enel', hp: 370000, reward: 37000, emoji: '⚡' },
  { level: 17, name: 'Foxy', hp: 480000, reward: 48000, emoji: '🦊' },
  { level: 18, name: 'Aokiji', hp: 620000, reward: 62000, emoji: '🧊' },
  { level: 19, name: 'Blueno', hp: 800000, reward: 80000, emoji: '🚪' },
  { level: 20, name: 'Kalifa', hp: 1000000, reward: 100000, emoji: '🧼' },
  
  // Arc 3: Water 7 / Enies Lobby (Level 21-35)
  { level: 21, name: 'Fukurou', hp: 1300000, reward: 130000, emoji: '🦉' },
  { level: 22, name: 'Kumadori', hp: 1650000, reward: 165000, emoji: '🐻' },
  { level: 23, name: 'Jabra', hp: 2100000, reward: 210000, emoji: '🐺' },
  { level: 24, name: 'Kaku', hp: 2700000, reward: 270000, emoji: '🦒' },
  { level: 25, name: 'Rob Lucci', hp: 3500000, reward: 350000, emoji: '🐆' },
  { level: 26, name: 'Spandam', hp: 4500000, reward: 450000, emoji: '🐘' },
  { level: 27, name: 'Gecko Moria', hp: 5800000, reward: 580000, emoji: '🦇' },
  { level: 28, name: 'Perona', hp: 7400000, reward: 740000, emoji: '👻' },
  { level: 29, name: 'Absalom', hp: 9500000, reward: 950000, emoji: '🦁' },
  { level: 30, name: 'Ryuma', hp: 12000000, reward: 1200000, emoji: '⚔️' },
  { level: 31, name: 'Oars', hp: 15000000, reward: 1500000, emoji: '👹' },
  { level: 32, name: 'Kizaru', hp: 19000000, reward: 1900000, emoji: '✨' },
  { level: 33, name: 'Sentomaru', hp: 24000000, reward: 2400000, emoji: '🪓' },
  { level: 34, name: 'Pacifista', hp: 30000000, reward: 3000000, emoji: '🤖' },
  { level: 35, name: 'Bartholomew Kuma', hp: 38000000, reward: 3800000, emoji: '🐻‍❄️' },
  
  // Arc 4: Impel Down / Marineford (Level 36-50)
  { level: 36, name: 'Hannyabal', hp: 48000000, reward: 4800000, emoji: '😈' },
  { level: 37, name: 'Magellan', hp: 60000000, reward: 6000000, emoji: '☠️' },
  { level: 38, name: 'Shiryu', hp: 75000000, reward: 7500000, emoji: '🗡️' },
  { level: 39, name: 'Ivankov', hp: 93000000, reward: 9300000, emoji: '💃' },
  { level: 40, name: 'Jinbe', hp: 115000000, reward: 11500000, emoji: '🦈' },
  { level: 41, name: 'Crocodile (Return)', hp: 142000000, reward: 14200000, emoji: '🐊' },
  { level: 42, name: 'Doflamingo (Young)', hp: 175000000, reward: 17500000, emoji: '🦩' },
  { level: 43, name: 'Mihawk', hp: 215000000, reward: 21500000, emoji: '🗡️' },
  { level: 44, name: 'Jozu', hp: 265000000, reward: 26500000, emoji: '💎' },
  { level: 45, name: 'Marco', hp: 325000000, reward: 32500000, emoji: '🔥' },
  { level: 46, name: 'Akainu', hp: 400000000, reward: 40000000, emoji: '🌋' },
  { level: 47, name: 'Aokiji (Serious)', hp: 490000000, reward: 49000000, emoji: '🧊' },
  { level: 48, name: 'Kizaru (Serious)', hp: 600000000, reward: 60000000, emoji: '✨' },
  { level: 49, name: 'Sengoku', hp: 735000000, reward: 73500000, emoji: '🐏' },
  { level: 50, name: 'Whitebeard', hp: 900000000, reward: 90000000, emoji: '👴' },
  
  // Arc 5: Fishman Island / Punk Hazard (Level 51-65)
  { level: 51, name: 'Hody Jones', hp: 1100000000, reward: 110000000, emoji: '🦈' },
  { level: 52, name: 'Vander Decken', hp: 1350000000, reward: 135000000, emoji: '🎯' },
  { level: 53, name: 'Caesar Clown', hp: 1650000000, reward: 165000000, emoji: '🧪' },
  { level: 54, name: 'Monet', hp: 2000000000, reward: 200000000, emoji: '❄️' },
  { level: 55, name: 'Vergo', hp: 2450000000, reward: 245000000, emoji: '🦴' },
  { level: 56, name: 'Baby 5', hp: 3000000000, reward: 300000000, emoji: '🔫' },
  { level: 57, name: 'Buffalo', hp: 3650000000, reward: 365000000, emoji: '🌪️' },
  { level: 58, name: 'Pica', hp: 4450000000, reward: 445000000, emoji: '🗿' },
  { level: 59, name: 'Diamante', hp: 5400000000, reward: 540000000, emoji: '🎭' },
  { level: 60, name: 'Trebol', hp: 6550000000, reward: 655000000, emoji: '🍯' },
  { level: 61, name: 'Doflamingo', hp: 7950000000, reward: 795000000, emoji: '🦩' },
  { level: 62, name: 'Fujitora', hp: 9600000000, reward: 960000000, emoji: '🌠' },
  { level: 63, name: 'Sabo', hp: 11600000000, reward: 1160000000, emoji: '🔥' },
  { level: 64, name: 'Burgess', hp: 14000000000, reward: 1400000000, emoji: '💪' },
  { level: 65, name: 'Blackbeard (Pre-TS)', hp: 17000000000, reward: 1700000000, emoji: '💀' },
  
  // Arc 6: Whole Cake Island (Level 66-80)
  { level: 66, name: 'Baron Tamago', hp: 20500000000, reward: 2050000000, emoji: '🥚' },
  { level: 67, name: 'Pekoms', hp: 24800000000, reward: 2480000000, emoji: '🦁' },
  { level: 68, name: 'Oven', hp: 30000000000, reward: 3000000000, emoji: '🔥' },
  { level: 69, name: 'Daifuku', hp: 36200000000, reward: 3620000000, emoji: '🧞' },
  { level: 70, name: 'Perospero', hp: 43700000000, reward: 4370000000, emoji: '🍭' },
  { level: 71, name: 'Compote', hp: 52700000000, reward: 5270000000, emoji: '🫐' },
  { level: 72, name: 'Snack', hp: 63600000000, reward: 6360000000, emoji: '🍪' },
  { level: 73, name: 'Cracker', hp: 76800000000, reward: 7680000000, emoji: '🍘' },
  { level: 74, name: 'Smoothie', hp: 92700000000, reward: 9270000000, emoji: '🧃' },
  { level: 75, name: 'Katakuri', hp: 112000000000, reward: 11200000000, emoji: '🍩' },
  { level: 76, name: 'Big Mom', hp: 135000000000, reward: 13500000000, emoji: '🎂' },
  { level: 77, name: 'Queen', hp: 163000000000, reward: 16300000000, emoji: '🦕' },
  { level: 78, name: 'Jack', hp: 197000000000, reward: 19700000000, emoji: '🐘' },
  { level: 79, name: 'King', hp: 238000000000, reward: 23800000000, emoji: '🔥' },
  { level: 80, name: 'Kaido', hp: 287000000000, reward: 28700000000, emoji: '🐉' },
  
  // Arc 7: Wano / Final Saga (Level 81-100)
  { level: 81, name: 'Orochi', hp: 347000000000, reward: 34700000000, emoji: '🐍' },
  { level: 82, name: 'Kanjuro', hp: 419000000000, reward: 41900000000, emoji: '🖌️' },
  { level: 83, name: 'Hawkins', hp: 506000000000, reward: 50600000000, emoji: '🎴' },
  { level: 84, name: 'X Drake', hp: 611000000000, reward: 61100000000, emoji: '🦖' },
  { level: 85, name: 'Apoo', hp: 738000000000, reward: 73800000000, emoji: '🎵' },
  { level: 86, name: 'Who\'s Who', hp: 891000000000, reward: 89100000000, emoji: '🐯' },
  { level: 87, name: 'Sasaki', hp: 1075000000000, reward: 107500000000, emoji: '🦏' },
  { level: 88, name: 'Black Maria', hp: 1298000000000, reward: 129800000000, emoji: '🕷️' },
  { level: 89, name: 'Ulti', hp: 1567000000000, reward: 156700000000, emoji: '🦕' },
  { level: 90, name: 'Page One', hp: 1892000000000, reward: 189200000000, emoji: '🦖' },
  { level: 91, name: 'Kaido (Awakened)', hp: 2284000000000, reward: 228400000000, emoji: '🐉' },
  { level: 92, name: 'Big Mom (Awakened)', hp: 2757000000000, reward: 275700000000, emoji: '🎂' },
  { level: 93, name: 'Greenbull', hp: 3328000000000, reward: 332800000000, emoji: '🌳' },
  { level: 94, name: 'Kizaru (Admiral)', hp: 4017000000000, reward: 401700000000, emoji: '✨' },
  { level: 95, name: 'Akainu (Fleet Admiral)', hp: 4848000000000, reward: 484800000000, emoji: '🌋' },
  { level: 96, name: 'Shanks', hp: 5851000000000, reward: 585100000000, emoji: '💥' },
  { level: 97, name: 'Blackbeard (Yonko)', hp: 7063000000000, reward: 706300000000, emoji: '💀' },
  { level: 98, name: 'Dragon', hp: 8526000000000, reward: 852600000000, emoji: '🐲' },
  { level: 99, name: 'Rocks D. Xebec', hp: 10293000000000, reward: 1029300000000, emoji: '☠️' },
  { level: 100, name: 'Imu-sama', hp: 12425000000000, reward: 1242500000000, emoji: '👁️' }
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

// Get equipped weapon buff
function getEquippedWeaponBuff() {
  const currentUser = JSON.parse(localStorage.getItem('onePieceCurrentUser'));
  if (!currentUser || !currentUser.pirateId) {
    return { atk: 0, def: 0, hp: 0, crit: 0 };
  }

  const userWeapons = JSON.parse(localStorage.getItem('onePieceUserWeapons') || '{}');
  const myWeapons = userWeapons[currentUser.pirateId] || [];
  const equippedWeapon = myWeapons.find(w => w.equipped);

  if (!equippedWeapon) {
    return { atk: 0, def: 0, hp: 0, crit: 0 };
  }

  return {
    atk: equippedWeapon.atk || 0,
    def: equippedWeapon.def || 0,
    hp: equippedWeapon.hp || 0,
    crit: equippedWeapon.crit || 0
  };
}

// Display weapon buff
function getWeaponBuffDisplay() {
  const buff = getEquippedWeaponBuff();
  if (buff.atk === 0) return '';
  
  return ` <span style="color: #2ecc71;">+${buff.atk}% ATK</span>`;
}

// Display equipped weapon info
function getEquippedWeaponDisplay() {
  const currentUser = JSON.parse(localStorage.getItem('onePieceCurrentUser'));
  if (!currentUser || !currentUser.pirateId) return '';

  const userWeapons = JSON.parse(localStorage.getItem('onePieceUserWeapons') || '{}');
  const myWeapons = userWeapons[currentUser.pirateId] || [];
  const equippedWeapon = myWeapons.find(w => w.equipped);

  if (!equippedWeapon) {
    return `<div class="stat-row" style="color: #95a5a6; font-style: italic;">
      <span class="stat-label">⚔️ Vũ Khí:</span>
      <span class="stat-value">Chưa trang bị</span>
    </div>`;
  }

  const rarityColors = {
    'common': '#95a5a6',
    'uncommon': '#2ecc71',
    'rare': '#3498db',
    'epic': '#9b59b6',
    'legendary': '#f1c40f',
    'mythic': '#e74c3c'
  };

  return `<div class="stat-row">
    <span class="stat-label">⚔️ Vũ Khí:</span>
    <span class="stat-value" style="color: ${rarityColors[equippedWeapon.rarity]};">${equippedWeapon.icon} ${equippedWeapon.name}</span>
  </div>
  <div class="stat-row" style="font-size: 0.85em; color: #95a5a6;">
    <span class="stat-label">📊 Stats:</span>
    <span class="stat-value">
      ${equippedWeapon.atk > 0 ? `💪${equippedWeapon.atk} ` : ''}
      ${equippedWeapon.def > 0 ? `🛡️${equippedWeapon.def} ` : ''}
      ${equippedWeapon.hp > 0 ? `❤️${equippedWeapon.hp} ` : ''}
      ${equippedWeapon.crit > 0 ? `⚡${equippedWeapon.crit}% ` : ''}
    </span>
  </div>`;
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
async function renderBattle(existingBattleData = null) {
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
    // QUAN TRỌNG: Nếu có data truyền vào thì dùng luôn, không thì load từ Firebase
    let battleData = existingBattleData || await loadBattleDataFromFirebase();
    
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
            <span class="stat-value">${userPirate.bounty.toLocaleString()}${getWeaponBuffDisplay()}</span>
          </div>
          ${getEquippedWeaponDisplay()}
          <div class="stat-row">
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
  
  // Get weapon buff
  const weaponBuff = getEquippedWeaponBuff();
  
  // Calculate damage with weapon stats
  const baseDamage = userPirate.bounty;
  const damage = Math.floor(baseDamage * (1 + weaponBuff.atk / 100));
  
  // Check for critical hit
  const isCrit = Math.random() * 100 < weaponBuff.crit;
  const finalDamage = isCrit ? Math.floor(damage * 2) : damage;
  
  const currentBoss = BOSS_LIST[battleData.currentBossIndex];
  
  // Trừ HP boss
  battleData.currentBossHP -= finalDamage;
  battleData.dailyAttacks++;
  
  // Thêm log
  const logEntry = {
    type: 'damage',
    message: `⚔️ Bạn tấn công ${currentBoss.name} gây ${finalDamage.toLocaleString()} sát thương!${isCrit ? ' 💥 CRITICAL!' : ''}${weaponBuff.atk > 0 ? ` (+${weaponBuff.atk}% ATK)` : ''} (HP còn: ${Math.max(0, battleData.currentBossHP).toLocaleString()})`
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
  
  // Lưu dữ liệu - QUAN TRỌNG: phải lưu trước khi render
  saveBattleData(battleData);
  
  // Đợi một chút để đảm bảo dữ liệu được lưu
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Render lại UI với battleData hiện tại (KHÔNG load lại từ Firebase)
  await renderBattle(battleData);
  
  // Toast thông báo
  if (battleData.currentBossHP > 0) {
    showToast('success', `⚔️ Gây ${finalDamage.toLocaleString()} sát thương! (${MAX_DAILY_ATTACKS - battleData.dailyAttacks} lượt còn lại)`);
  }
}

// Hiển thị thông báo chiến thắng
function showVictoryMessage(boss) {
  // Drop weapon (always drops one)
  const dropResult = dropRandomWeapon();
  
  const victoryDiv = document.createElement('div');
  victoryDiv.className = 'victory-modal';
  
  // Mapping tiếng Việt
  const rarityNames = {
    'common': 'Thường',
    'uncommon': 'Khá',
    'rare': 'Hiếm',
    'epic': 'Sử Thi',
    'legendary': 'Huyền Thoại',
    'mythic': 'Thần Thoại'
  };
  
  const typeNames = {
    'sword': 'Kiếm',
    'gun': 'Súng',
    'bow': 'Cung',
    'staff': 'Gậy',
    'hammer': 'Búa',
    'spear': 'Thương',
    'axe': 'Rìu'
  };
  
  victoryDiv.innerHTML = `
    <h2>🎉 CHIẾN THẮNG! 🎉</h2>
    <p>Bạn đã hạ gục <strong>${boss.name}</strong>!</p>
    <p>Phần thưởng: <strong style="color: #f39c12;">+${boss.reward.toLocaleString()}฿</strong></p>
    ${dropResult ? `
      <div style="margin-top: 15px; padding: 20px; background: linear-gradient(135deg, rgba(241, 196, 15, 0.2), rgba(230, 126, 34, 0.2)); border: 3px solid rgba(241, 196, 15, 0.5); border-radius: 15px; box-shadow: 0 5px 20px rgba(241, 196, 15, 0.3);">
        ${dropResult.isNew ? `
          <p style="font-size: 1.3em; margin: 5px 0; color: #2ecc71;">⚔️ <strong>Nhận Vũ Khí Mới!</strong></p>
          <p style="font-size: 3em; margin: 15px 0; filter: drop-shadow(0 0 10px rgba(241, 196, 15, 0.8));">${dropResult.weapon.icon}</p>
          <p style="font-weight: 900; color: #f1c40f; font-size: 1.3em; margin: 5px 0;">${dropResult.weapon.name}</p>
          <p style="font-size: 0.95em; color: #ecf0f1; margin: 5px 0;">${rarityNames[dropResult.weapon.rarity]} • ${typeNames[dropResult.weapon.type]}</p>
          <p style="font-size: 0.85em; color: #3498db; font-weight: bold; margin-top: 10px;">⭐ Level 1</p>
        ` : `
          <p style="font-size: 1.3em; margin: 5px 0; color: #e74c3c;">⬆️ <strong>Nâng Cấp Vũ Khí!</strong></p>
          <p style="font-size: 3em; margin: 15px 0; filter: drop-shadow(0 0 15px rgba(231, 76, 60, 0.8)); animation: pulse 1s ease-in-out infinite;">${dropResult.weapon.icon}</p>
          <p style="font-weight: 900; color: #f1c40f; font-size: 1.3em; margin: 5px 0;">${dropResult.weapon.name}</p>
          <p style="font-size: 0.95em; color: #ecf0f1; margin: 5px 0;">${rarityNames[dropResult.weapon.rarity]} • ${typeNames[dropResult.weapon.type]}</p>
          <p style="font-size: 1.1em; color: #e74c3c; font-weight: 900; margin-top: 10px;">⭐ Level ${dropResult.level - 1} → Level ${dropResult.level}</p>
          <p style="font-size: 0.9em; color: #2ecc71; margin-top: 5px;">💪 Stats tăng 10%!</p>
        `}
      </div>
    ` : ''}
  `;
  
  document.body.appendChild(victoryDiv);
  
  setTimeout(() => {
    victoryDiv.remove();
  }, dropResult ? 5000 : 3000);
}

// Drop random weapon based on drop rate (always drop 1 weapon)
function dropRandomWeapon() {
  const weapons = JSON.parse(localStorage.getItem('onePieceWeapons') || '[]');
  const activeWeapons = weapons.filter(w => w.status === 'active');
  
  if (activeWeapons.length === 0) return null;
  
  // Calculate cumulative drop rates
  const totalDropRate = activeWeapons.reduce((sum, w) => sum + w.dropRate, 0);
  const random = Math.random() * totalDropRate;
  let cumulative = 0;
  
  // Pick weapon based on cumulative probability
  for (const weapon of activeWeapons) {
    cumulative += weapon.dropRate;
    if (random <= cumulative) {
      // Add weapon to user's inventory (or upgrade if duplicate)
      const result = addWeaponToUser(weapon);
      return { weapon, ...result };
    }
  }
  
  // Fallback: return random weapon if somehow nothing was picked
  const randomWeapon = activeWeapons[Math.floor(Math.random() * activeWeapons.length)];
  const result = addWeaponToUser(randomWeapon);
  return { weapon: randomWeapon, ...result };
}

// Add weapon to user's inventory or upgrade if duplicate
function addWeaponToUser(weapon) {
  const currentUser = JSON.parse(localStorage.getItem('onePieceCurrentUser'));
  if (!currentUser || !currentUser.pirateId) return { isNew: true };
  
  let userWeapons = JSON.parse(localStorage.getItem('onePieceUserWeapons') || '{}');
  
  if (!userWeapons[currentUser.pirateId]) {
    userWeapons[currentUser.pirateId] = [];
  }
  
  const userWeaponList = userWeapons[currentUser.pirateId];
  
  // Check if user already has this weapon (same weapon ID)
  const existingWeapon = userWeaponList.find(w => w.id === weapon.id);
  
  if (existingWeapon) {
    // Upgrade existing weapon
    if (!existingWeapon.level) existingWeapon.level = 1;
    existingWeapon.level++;
    
    // Increase stats by 10% per level
    const bonusMultiplier = 0.1;
    existingWeapon.atk = Math.round(weapon.atk * (1 + bonusMultiplier * existingWeapon.level));
    existingWeapon.def = Math.round(weapon.def * (1 + bonusMultiplier * existingWeapon.level));
    existingWeapon.hp = Math.round(weapon.hp * (1 + bonusMultiplier * existingWeapon.level));
    existingWeapon.crit = Math.round(weapon.crit * (1 + bonusMultiplier * existingWeapon.level) * 10) / 10;
    
    localStorage.setItem('onePieceUserWeapons', JSON.stringify(userWeapons));
    
    // Sync to Firebase
    if (typeof database !== 'undefined' && database) {
      database.ref('sharedData/userWeapons').set(userWeapons);
    }
    
    return { isNew: false, level: existingWeapon.level, upgraded: existingWeapon };
  } else {
    // Add new weapon with level 1
    const newWeapon = {
      ...weapon,
      level: 1,
      instanceId: Date.now() + Math.random().toString(36).substr(2, 9),
      obtainedAt: new Date().toISOString(),
      equipped: false
    };
    
    userWeaponList.push(newWeapon);
    localStorage.setItem('onePieceUserWeapons', JSON.stringify(userWeapons));
    
    // Sync to Firebase if available
    if (typeof database !== 'undefined' && database) {
      database.ref('sharedData/userWeapons').set(userWeapons).catch(console.error);
    }
    
    return { isNew: true, level: 1 };
  }
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
