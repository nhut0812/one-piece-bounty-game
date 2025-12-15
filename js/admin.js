// =====================================================
// ADMIN PANEL - ONE PIECE BOUNTY SYSTEM
// =====================================================

// Data Storage Keys
const PIRATES_KEY = 'onePiecePirates';
const CREWS_KEY = 'onePieceCrews';
const ACCOUNTS_KEY = 'onePieceAccounts';
const RANK_IMAGES_KEY = 'onePieceRankImages';
const CREW_IMAGES_KEY = 'onePieceCrewImages';
const QUESTS_KEY = 'onePieceQuests';
const SUBMISSIONS_KEY = 'onePieceSubmissions';

// Firebase Database được khởi tạo bởi firebase-config.js

// Default Data
let pirates = [];
let quests = [];
let submissions = [];
let crews = [
  { name: "Straw Hat Pirates", icon: "🏴‍☠️", color: "#e74c3c", captain: "Monkey D. Luffy" },
  { name: "Roger Pirates", icon: "👑", color: "#f1c40f", captain: "Gol D. Roger" },
  { name: "Whitebeard Pirates", icon: "⚔️", color: "#95a5a6", captain: "Edward Newgate" },
  { name: "Blackbeard Pirates", icon: "💀", color: "#2c3e50", captain: "Marshall D. Teach" },
  { name: "Heart Pirates", icon: "❤️", color: "#3498db", captain: "Trafalgar D. Water Law" },
  { name: "Beast Pirates", icon: "🐉", color: "#9b59b6", captain: "Kaido" },
  { name: "Big Mom Pirates", icon: "🎂", color: "#e91e63", captain: "Charlotte Linlin" },
  { name: "Red Hair Pirates", icon: "💥", color: "#c0392b", captain: "Shanks" },
  { name: "Kid Pirates", icon: "🧠", color: "#d35400", captain: "Eustass Kid" },
  { name: "Kuja Pirates", icon: "🐍", color: "#8e44ad", captain: "Boa Hancock" },
  { name: "Donquixote Pirates", icon: "🦩", color: "#ff1493", captain: "Donquixote Doflamingo" },
  { name: "Baroque Works", icon: "🎭", color: "#d4af37", captain: "Crocodile" },
  { name: "Arlong Pirates", icon: "🦈", color: "#1e90ff", captain: "Arlong" },
  { name: "Buggy Pirates", icon: "🤡", color: "#ff6347", captain: "Buggy" },
  { name: "Krieg Pirates", icon: "⚙️", color: "#708090", captain: "Don Krieg" },
  { name: "Hawkins Pirates", icon: "🎴", color: "#dda0dd", captain: "Basil Hawkins" },
  { name: "Bonney Pirates", icon: "🍕", color: "#ff69b4", captain: "Jewelry Bonney" },
  { name: "Drake Pirates", icon: "🦖", color: "#8b4513", captain: "X Drake" },
  { name: "No Crew", icon: "⚖️", color: "#7f8c8d", captain: "Independent" }
];

let ranks = [
  { type: 'supreme', name: 'Chí Tôn', icon: '🌟', color: '#ffffff', minBounty: 500000 },
  { type: 'demigod', name: 'Bán Thần', icon: '✨', color: '#e8daef', minBounty: 250000 },
  { type: 'divine', name: 'Thần Thoại', icon: '⚡', color: '#9b59b6', minBounty: 100000 },
  { type: 'mythic', name: 'Huyền Thoại', icon: '🔥', color: '#e74c3c', minBounty: 50000 },
  { type: 'legend', name: 'Truyền Thuyết', icon: '💎', color: '#3498db', minBounty: 25000 },
  { type: 'emperor', name: 'Đế Vương', icon: '👑', color: '#f1c40f', minBounty: 15000 },
  { type: 'yonko', name: 'Tứ Hoàng', icon: '👹', color: '#c0392b', minBounty: 8000 },
  { type: 'admiral', name: 'Đô Đốc', icon: '🎖️', color: '#d35400', minBounty: 4000 },
  { type: 'commander', name: 'Tư Lệnh', icon: '💪', color: '#e67e22', minBounty: 2000 },
  { type: 'general', name: 'Đại Tướng', icon: '🛡️', color: '#16a085', minBounty: 1000 },
  { type: 'warlord', name: 'Thất Vũ Hải', icon: '⚔️', color: '#8e44ad', minBounty: 600 },
  { type: 'supernova', name: 'Siêu Tân Tinh', icon: '⭐', color: '#f39c12', minBounty: 350 },
  { type: 'rising', name: 'Tân Tinh', icon: '🌠', color: '#3498db', minBounty: 180 },
  { type: 'pirate', name: 'Hải Tặc', icon: '🏴‍☠️', color: '#3498db', minBounty: 80 },
  { type: 'rookie', name: 'Tân Binh', icon: '👶', color: '#95a5a6', minBounty: 0 },
  { type: 'prisoner', name: 'Tù Nhân', icon: '⛓️', color: '#2c3e50', minBounty: -999999999 }
];

let accounts = [
  { username: 'admin', email: 'admin@onepiece.com', password: 'admin123', role: 'admin', status: 'active', createdAt: '2025-01-01' }
];

let rankImages = {};
let crewImages = {};

// Search queries
let pirateSearchQuery = '';
let crewSearchQuery = '';
let accountSearchQuery = '';
let questSearchQuery = '';
let questGradeFilter = '';
let questSubjectFilter = '';
let submissionSearchQuery = '';
let submissionStatusFilter = '';

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
  // Database đã được khởi tạo bởi firebase-config.js
  if (database) {
    console.log('✅ Admin Firebase database ready');
  } else {
    console.error('❌ Admin Firebase database not initialized');
  }
  
  loadData();
  initTabs();
  renderAll();
});

function loadData() {
  // Load pirates
  const savedPirates = localStorage.getItem(PIRATES_KEY);
  if (savedPirates) {
    pirates = JSON.parse(savedPirates);
  }
  
  // Load crews
  const savedCrews = localStorage.getItem(CREWS_KEY);
  if (savedCrews) {
    crews = JSON.parse(savedCrews);
  }
  
  // Load accounts
  const savedAccounts = localStorage.getItem(ACCOUNTS_KEY);
  if (savedAccounts) {
    accounts = JSON.parse(savedAccounts);
  } else {
    // Khởi tạo tài khoản admin mặc định nếu chưa có
    accounts = [
      { username: 'admin', email: 'admin@onepiece.com', password: 'admin123', role: 'admin', status: 'active', createdAt: '2025-01-01' }
    ];
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }
  
  // Load rank images
  const savedRankImages = localStorage.getItem(RANK_IMAGES_KEY);
  console.log('Loading rankImages from localStorage:', savedRankImages);
  if (savedRankImages) {
    rankImages = JSON.parse(savedRankImages);
    console.log('Loaded rankImages:', rankImages);
  }
  
  // Load crew images
  const savedCrewImages = localStorage.getItem(CREW_IMAGES_KEY);
  if (savedCrewImages) {
    crewImages = JSON.parse(savedCrewImages);
  }
  
  // Load quests
  const savedQuests = localStorage.getItem(QUESTS_KEY);
  if (savedQuests) {
    quests = JSON.parse(savedQuests);
  }
  
  // Load submissions
  const savedSubmissions = localStorage.getItem(SUBMISSIONS_KEY);
  if (savedSubmissions) {
    submissions = JSON.parse(savedSubmissions);
  }
}

function saveData() {
  console.log('🔵 saveData() được gọi');
  console.log('Quests trước khi lưu:', quests);
  console.log('Số lượng quests:', quests.length);
  
  localStorage.setItem(PIRATES_KEY, JSON.stringify(pirates));
  localStorage.setItem(CREWS_KEY, JSON.stringify(crews));
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  localStorage.setItem(RANK_IMAGES_KEY, JSON.stringify(rankImages));
  localStorage.setItem(CREW_IMAGES_KEY, JSON.stringify(crewImages));
  localStorage.setItem(QUESTS_KEY, JSON.stringify(quests));
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  // Cập nhật timestamp để Firebase không ghi đè
  localStorage.setItem('lastLocalUpdate', Date.now().toString());
  console.log('Saved rankImages:', rankImages);
  
  // Xác nhận đã lưu
  const savedQuests = localStorage.getItem(QUESTS_KEY);
  console.log('✅ Quests đã lưu vào localStorage:', savedQuests);
}

// =====================================================
// TAB NAVIGATION
// =====================================================
function initTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  const pageTitles = {
    'pirates': '🏴‍☠️ Quản lý Hải Tặc',
    'crews': '⚔️ Quản lý Băng Nhóm',
    'ranks': '🏆 Quản lý Cấp Độ',
    'accounts': '👥 Quản lý Tài Khoản',
    'quests': '📝 Quản lý Nhiệm Vụ',
    'submissions': '📸 Duyệt Bài Nộp'
  };
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Load submissions from Firebase when switching to submissions tab
      if (tabId === 'submissions') {
        loadSubmissionsFromFirebase();
      }
      
      // Update active nav
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      
      // Update active tab content
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      document.getElementById(`${tabId}-tab`).classList.add('active');
      
      // Update page title
      document.getElementById('pageTitle').textContent = pageTitles[tabId];
    });
  });
}

// =====================================================
// RENDER FUNCTIONS
// =====================================================
function renderAll() {
  renderPirates();
  renderCrews();
  renderRanks();
  renderAccounts();
  renderQuests();
  renderSubmissions();
  updateStats();
}

function renderPirates() {
  const tbody = document.getElementById('piratesTableBody');
  tbody.innerHTML = '';
  
  let filteredPirates = pirates;
  if (pirateSearchQuery) {
    filteredPirates = pirates.filter(p => 
      p.name.toLowerCase().includes(pirateSearchQuery.toLowerCase())
    );
  }
  
  // Sort by bounty descending
  filteredPirates.sort((a, b) => b.bounty - a.bounty);
  
  filteredPirates.forEach((pirate, index) => {
    const realIndex = pirates.indexOf(pirate);
    const rank = getRankByBounty(pirate.bounty);
    const crew = crews.find(c => c.name === pirate.crew) || { icon: '⚖️', name: 'No Crew' };
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox" class="pirate-checkbox" data-index="${realIndex}" onchange="updateBulkActions()"></td>
      <td>${index + 1}</td>
      <td>
        <div class="avatar-cell">
          ${pirate.image ? `<img src="${pirate.image}" alt="${pirate.name}">` : rank.icon}
        </div>
      </td>
      <td><strong>${pirate.name}</strong></td>
      <td><span class="badge badge-crew">${crew.icon} ${crew.name}</span></td>
      <td><strong style="color: #f39c12">${formatBounty(pirate.bounty)}฿</strong></td>
      <td><span class="badge badge-rank" style="color: ${rank.color}; border-color: ${rank.color}">${rank.icon} ${rank.name}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-edit" onclick="editPirate(${realIndex})">✏️</button>
          <button class="btn-delete" onclick="deletePirate(${realIndex})">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderCrews() {
  const grid = document.getElementById('crewsGrid');
  grid.innerHTML = '';
  
  let filteredCrews = crews;
  if (crewSearchQuery) {
    filteredCrews = crews.filter(c => 
      c.name.toLowerCase().includes(crewSearchQuery.toLowerCase())
    );
  }
  
  filteredCrews.forEach((crew, index) => {
    const realIndex = crews.indexOf(crew);
    const memberCount = pirates.filter(p => p.crew === crew.name).length;
    const totalBounty = pirates.filter(p => p.crew === crew.name).reduce((sum, p) => sum + p.bounty, 0);
    const hasImage = crewImages[crew.name];
    
    const card = document.createElement('div');
    card.className = 'crew-card';
    card.innerHTML = `
      <div class="crew-header">
        <div class="crew-icon-wrapper">
          <div class="crew-icon" style="background: ${crew.color}40; border: 3px solid ${crew.color}">
            ${hasImage ? `<img src="${crewImages[crew.name]}" alt="${crew.name}">` : crew.icon}
          </div>
          <div class="crew-image-actions">
            <label class="btn-upload-img" title="Upload hình">
              📷
              <input type="file" accept="image/*" onchange="uploadCrewImage('${crew.name}', this)" style="display:none">
            </label>
            ${hasImage ? `<button class="btn-delete-img" onclick="deleteCrewImage('${crew.name}')" title="Xóa hình">❌</button>` : ''}
          </div>
        </div>
        <div class="crew-info">
          <h4>${crew.name}</h4>
          <p>👑 ${crew.captain}</p>
        </div>
      </div>
      <div class="crew-stats">
        <div class="crew-stat">
          <div class="crew-stat-value">${memberCount}</div>
          <div class="crew-stat-label">Thành viên</div>
        </div>
        <div class="crew-stat">
          <div class="crew-stat-value">${formatBounty(totalBounty)}฿</div>
          <div class="crew-stat-label">Tổng Bounty</div>
        </div>
      </div>
      <div class="crew-actions">
        <button class="btn-edit" onclick="editCrew(${realIndex})">✏️ Sửa</button>
        <button class="btn-delete" onclick="deleteCrew(${realIndex})">🗑️ Xóa</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderRanks() {
  const list = document.getElementById('ranksList');
  list.innerHTML = '';
  
  // Sort by minBounty descending
  const sortedRanks = [...ranks].sort((a, b) => b.minBounty - a.minBounty);
  
  sortedRanks.forEach((rank, index) => {
    const realIndex = ranks.indexOf(rank);
    const count = pirates.filter(p => getRankByBounty(p.bounty).type === rank.type).length;
    const hasImage = rankImages[rank.type];
    
    const item = document.createElement('div');
    item.className = 'rank-item';
    item.innerHTML = `
      <div class="rank-icon-wrapper">
        <div class="rank-icon" style="background: ${rank.color}30; border-color: ${rank.color}">
          ${hasImage ? `<img src="${rankImages[rank.type]}" alt="${rank.name}">` : rank.icon}
        </div>
        <div class="rank-image-actions">
          <label class="btn-upload-img" title="Upload hình">
            📷
            <input type="file" accept="image/*" onchange="uploadRankImage('${rank.type}', this)" style="display:none">
          </label>
          ${hasImage ? `<button class="btn-delete-img" onclick="deleteRankImage('${rank.type}')" title="Xóa hình">❌</button>` : ''}
        </div>
      </div>
      <div class="rank-info">
        <h4 style="color: ${rank.color}">${rank.name}</h4>
        <p>Type: ${rank.type} | ${count} hải tặc</p>
      </div>
      <div class="rank-bounty">
        <div class="rank-bounty-value">${formatBounty(rank.minBounty)}฿+</div>
        <div class="rank-bounty-label">Bounty tối thiểu</div>
      </div>
      <div class="action-btns">
        <button class="btn-edit" onclick="editRank(${realIndex})">✏️</button>
        <button class="btn-delete" onclick="deleteRank(${realIndex})">🗑️</button>
      </div>
    `;
    list.appendChild(item);
  });
}

function renderAccounts() {
  const tbody = document.getElementById('accountsTableBody');
  tbody.innerHTML = '';
  
  let filteredAccounts = accounts;
  if (accountSearchQuery) {
    filteredAccounts = accounts.filter(a => 
      a.username.toLowerCase().includes(accountSearchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(accountSearchQuery.toLowerCase())
    );
  }
  
  filteredAccounts.forEach((account, index) => {
    const realIndex = accounts.indexOf(account);
    const statusClass = account.status === 'active' ? 'badge-active' : 
                       account.status === 'banned' ? 'badge-banned' : 'badge-inactive';
    const roleClass = account.role === 'admin' ? 'badge-admin' : 
                     account.role === 'moderator' ? 'badge-moderator' : 'badge-user';
    
    // Tìm hải tặc liên kết
    const linkedPirate = account.pirateId ? pirates.find(p => p.name === account.pirateId) : null;
    const pirateDisplay = linkedPirate ? 
      `<span class="badge badge-crew">🏴‍☠️ ${linkedPirate.name}</span>` : 
      '<span class="badge badge-inactive">Chưa liên kết</span>';
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${account.username}</strong></td>
      <td>${account.email}</td>
      <td>${pirateDisplay}</td>
      <td><span class="badge ${roleClass}">${account.role.toUpperCase()}</span></td>
      <td><span class="badge ${statusClass}">${account.status}</span></td>
      <td>${account.createdAt}</td>
      <td>
        <div class="action-btns">
          <button class="btn-edit" onclick="editAccount(${realIndex})">✏️</button>
          <button class="btn-delete" onclick="deleteAccount(${realIndex})">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function updateStats() {
  // Pirates stats
  document.getElementById('totalPirates').textContent = pirates.length;
  const totalBounty = pirates.reduce((sum, p) => sum + p.bounty, 0);
  document.getElementById('totalBounty').textContent = formatBounty(totalBounty) + '฿';
  
  if (pirates.length > 0) {
    const topPirate = pirates.reduce((max, p) => p.bounty > max.bounty ? p : max);
    const topRank = getRankByBounty(topPirate.bounty);
    document.getElementById('topRank').textContent = topRank.name;
  }
  
  // Crews stats
  document.getElementById('totalCrews').textContent = crews.length;
  const avgMembers = pirates.length > 0 ? Math.round(pirates.length / crews.length) : 0;
  document.getElementById('avgMembers').textContent = avgMembers;
  
  // Accounts stats
  document.getElementById('totalAccounts').textContent = accounts.length;
  document.getElementById('adminAccounts').textContent = accounts.filter(a => a.role === 'admin').length;
  document.getElementById('userAccounts').textContent = accounts.filter(a => a.role === 'user').length;
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================
function getRankByBounty(bounty) {
  const sortedRanks = [...ranks].sort((a, b) => b.minBounty - a.minBounty);
  for (const rank of sortedRanks) {
    if (bounty >= rank.minBounty) {
      return rank;
    }
  }
  return ranks[ranks.length - 1];
}

function formatBounty(bounty) {
  if (bounty >= 1000000) {
    return (bounty / 1000000).toFixed(1) + 'M';
  }
  if (bounty >= 1000) {
    return (bounty / 1000).toFixed(1) + 'K';
  }
  return bounty.toString();
}

// Chuyển tên có dấu thành không dấu và viết liền
function removeVietnameseTones(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/\s+/g, ''); // Xóa khoảng trắng
  return str;
}

// Tạo tài khoản tự động cho hải tặc mới
function createAccountForPirate(pirateName) {
  let username = removeVietnameseTones(pirateName);
  
  // Kiểm tra xem tài khoản đã tồn tại chưa, nếu có thì tự động thêm số
  let finalUsername = username;
  let counter = 1;
  
  while (accounts.find(a => a.username === finalUsername)) {
    finalUsername = username + counter;
    counter++;
  }
  
  const newAccount = {
    username: finalUsername,
    email: finalUsername + '@onepiece.com',
    password: '123456',
    role: 'user',
    status: 'active',
    createdAt: new Date().toISOString().split('T')[0],
    pirateId: pirateName // Liên kết với hải tặc
  };
  
  accounts.push(newAccount);
  return newAccount;
}

// =====================================================
// MODAL FUNCTIONS
// =====================================================
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// =====================================================
// PIRATE CRUD
// =====================================================
function openAddPirateModal() {
  document.getElementById('pirateModalTitle').textContent = '➕ Thêm Hải Tặc';
  document.getElementById('pirateForm').reset();
  document.getElementById('pirateIndex').value = -1;
  document.getElementById('pirateAvatarPreview').innerHTML = '📷';
  loadCrewOptions();
  openModal('pirateModal');
}

// Preview ảnh đại diện hải tặc
function previewPirateAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageData = e.target.result;
      document.getElementById('pirateAvatarPreview').innerHTML = 
        `<img src="${imageData}" style="width: 100%; height: 100%; object-fit: cover;">`;
      document.getElementById('pirateImage').value = imageData;
    };
    reader.readAsDataURL(file);
  }
}

// Xóa ảnh đại diện
function clearPirateAvatar() {
  document.getElementById('pirateAvatarPreview').innerHTML = '📷';
  document.getElementById('pirateImage').value = '';
  document.getElementById('pirateAvatarUpload').value = '';
}

function loadCrewOptions() {
  const select = document.getElementById('pirateCrew');
  select.innerHTML = '<option value="">-- Chọn băng nhóm --</option>';
  crews.forEach(crew => {
    select.innerHTML += `<option value="${crew.name}">${crew.icon} ${crew.name}</option>`;
  });
}

function editPirate(index) {
  const pirate = pirates[index];
  document.getElementById('pirateModalTitle').textContent = '✏️ Sửa Hải Tặc';
  document.getElementById('pirateIndex').value = index;
  document.getElementById('pirateName').value = pirate.name;
  document.getElementById('pirateBounty').value = pirate.bounty;
  document.getElementById('pirateImage').value = pirate.image || '';
  
  // Hiển thị ảnh hiện tại
  const preview = document.getElementById('pirateAvatarPreview');
  if (pirate.image) {
    preview.innerHTML = `<img src="${pirate.image}" style="width: 100%; height: 100%; object-fit: cover;">`;
  } else {
    const rank = getRankByBounty(pirate.bounty);
    preview.innerHTML = `<div style="font-size: 40px;">${rank.icon}</div>`;
  }
  
  loadCrewOptions();
  document.getElementById('pirateCrew').value = pirate.crew;
  openModal('pirateModal');
}

function savePirate(event) {
  event.preventDefault();
  
  const index = parseInt(document.getElementById('pirateIndex').value);
  const pirateData = {
    name: document.getElementById('pirateName').value,
    crew: document.getElementById('pirateCrew').value,
    bounty: parseInt(document.getElementById('pirateBounty').value),
    image: document.getElementById('pirateImage').value || null,
    type: ''
  };
  
  pirateData.type = getRankByBounty(pirateData.bounty).type;
  
  if (index === -1) {
    pirates.push(pirateData);
    
    // Tự động tạo tài khoản cho hải tặc mới
    const newAccount = createAccountForPirate(pirateData.name);
    if (newAccount) {
      showToast('success', `✅ Đã thêm hải tặc "${pirateData.name}" và tạo tài khoản "${newAccount.username}" (mật khẩu: 123456)!`);
    } else {
      showToast('success', '✅ Đã thêm hải tặc mới!');
    }
  } else {
    // Cập nhật username nếu đổi tên hải tặc
    const oldName = pirates[index].name;
    const oldUsername = removeVietnameseTones(oldName);
    let newUsername = removeVietnameseTones(pirateData.name);
    
    if (oldUsername !== newUsername) {
      const accountIndex = accounts.findIndex(a => a.username === oldUsername);
      if (accountIndex !== -1) {
        // Kiểm tra trùng lặp username mới và tự động thêm số
        let finalUsername = newUsername;
        let counter = 1;
        
        while (accounts.find((a, idx) => idx !== accountIndex && a.username === finalUsername)) {
          finalUsername = newUsername + counter;
          counter++;
        }
        
        accounts[accountIndex].username = finalUsername;
        accounts[accountIndex].email = finalUsername + '@onepiece.com';
        accounts[accountIndex].pirateId = pirateData.name;
        
        if (finalUsername !== newUsername) {
          showToast('success', `✅ Đã cập nhật hải tặc! Username đổi thành "${finalUsername}" (tránh trùng)`);
        } else {
          showToast('success', '✅ Đã cập nhật hải tặc!');
        }
      }
    } else {
      showToast('success', '✅ Đã cập nhật hải tặc!');
    }
    
    pirates[index] = pirateData;
  }
  
  saveData();
  renderPirates();
  renderAccounts();
  updateStats();
  closeModal('pirateModal');
}

function deletePirate(index) {
  const pirateName = pirates[index].name;
  showConfirm(`Bạn có chắc muốn xóa hải tặc "${pirateName}"?\nTài khoản liên kết và TẤT CẢ dữ liệu của người này sẽ bị xóa vĩnh viễn.`, () => {
    // Xóa tài khoản liên kết - tìm theo pirateId để tránh xóa nhầm khi trùng tên
    const accountIndex = accounts.findIndex(a => a.pirateId === pirateName);
    if (accountIndex !== -1) {
      accounts.splice(accountIndex, 1);
    }
    
    // Xóa quest attempts của hải tặc này
    const questAttempts = JSON.parse(localStorage.getItem('onePieceQuestAttempts') || '{}');
    if (questAttempts[pirateName]) {
      delete questAttempts[pirateName];
      localStorage.setItem('onePieceQuestAttempts', JSON.stringify(questAttempts));
      
      // Sync lên Firebase
      if (typeof database !== 'undefined' && database) {
        database.ref('sharedData/questAttempts').set(questAttempts);
      }
    }
    
    // Xóa submissions của hải tặc này
    submissions = submissions.filter(sub => sub.studentName !== pirateName);
    localStorage.setItem('onePieceSubmissions', JSON.stringify(submissions));
    
    // Xóa submissions trên Firebase
    if (typeof database !== 'undefined' && database) {
      database.ref('submissions').once('value').then(snapshot => {
        const firebaseSubmissions = snapshot.val() || {};
        Object.keys(firebaseSubmissions).forEach(key => {
          if (firebaseSubmissions[key].studentName === pirateName) {
            database.ref('submissions/' + key).remove();
          }
        });
      });
    }
    
    pirates.splice(index, 1);
    saveData();
    renderPirates();
    renderAccounts();
    renderSubmissions();
    updateStats();
    showToast('success', '✅ Đã xóa vĩnh viễn hải tặc và toàn bộ dữ liệu!');
  });
}

// Chọn/bỏ chọn tất cả checkbox
function toggleSelectAllPirates(checked) {
  const checkboxes = document.querySelectorAll('.pirate-checkbox');
  checkboxes.forEach(cb => cb.checked = checked);
  updateBulkActions();
}

// Cập nhật hiển thị nút bulk actions
function updateBulkActions() {
  const checkboxes = document.querySelectorAll('.pirate-checkbox:checked');
  const bulkActions = document.getElementById('bulkActions');
  const selectedCount = document.getElementById('selectedCount');
  const selectAll = document.getElementById('selectAllPirates');
  
  if (checkboxes.length > 0) {
    bulkActions.style.display = 'flex';
    selectedCount.textContent = checkboxes.length;
  } else {
    bulkActions.style.display = 'none';
  }
  
  // Update select all checkbox state
  const allCheckboxes = document.querySelectorAll('.pirate-checkbox');
  selectAll.checked = allCheckboxes.length > 0 && checkboxes.length === allCheckboxes.length;
  selectAll.indeterminate = checkboxes.length > 0 && checkboxes.length < allCheckboxes.length;
}

// Xóa các hải tặc đã chọn
function deleteSelectedPirates() {
  const checkboxes = document.querySelectorAll('.pirate-checkbox:checked');
  if (checkboxes.length === 0) {
    showToast('warning', '⚠️ Vui lòng chọn ít nhất một hải tặc!');
    return;
  }
  
  showConfirm(`Bạn có chắc muốn xóa ${checkboxes.length} hải tặc đã chọn?\nTài khoản liên kết cũng sẽ bị xóa.`, () => {
    const indicesToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index)).sort((a, b) => b - a);
    
    indicesToDelete.forEach(index => {
      // Xóa tài khoản liên kết
      const pirateName = pirates[index].name;
      const username = removeVietnameseTones(pirateName);
      const accountIndex = accounts.findIndex(a => a.username === username);
      if (accountIndex !== -1) {
        accounts.splice(accountIndex, 1);
      }
      
      pirates.splice(index, 1);
    });
    
    saveData();
    renderPirates();
    renderAccounts();
    updateStats();
    updateBulkActions();
    showToast('success', `✅ Đã xóa ${indicesToDelete.length} hải tặc và tài khoản liên kết!`);
  });
}

// Xóa tất cả hải tặc
function deleteAllPirates() {
  if (pirates.length === 0) {
    showToast('warning', '⚠️ Không có hải tặc nào để xóa!');
    return;
  }
  
  showConfirm(`⚠️ BẠN CÓ CHẮC CHẮN?\n\nXóa tất cả ${pirates.length} hải tặc?\nTất cả tài khoản liên kết cũng sẽ bị xóa.\n\nHành động này KHÔNG THỂ HOÀN TÁC!`, () => {
    // Xóa tất cả tài khoản liên kết (trừ admin)
    accounts = accounts.filter(a => a.role === 'admin');
    
    // Xóa tất cả hải tặc
    pirates = [];
    
    saveData();
    renderPirates();
    renderAccounts();
    updateStats();
    showToast('success', '✅ Đã xóa tất cả hải tặc và tài khoản liên kết!');
  });
}

function searchPirates(query) {
  pirateSearchQuery = query;
  renderPirates();
}

// =====================================================
// CREW CRUD
// =====================================================
function openAddCrewModal() {
  document.getElementById('crewModalTitle').textContent = '➕ Thêm Băng Nhóm';
  document.getElementById('crewForm').reset();
  document.getElementById('crewIndex').value = -1;
  openModal('crewModal');
}

function editCrew(index) {
  const crew = crews[index];
  document.getElementById('crewModalTitle').textContent = '✏️ Sửa Băng Nhóm';
  document.getElementById('crewIndex').value = index;
  document.getElementById('crewName').value = crew.name;
  document.getElementById('crewIcon').value = crew.icon;
  document.getElementById('crewColor').value = crew.color;
  document.getElementById('crewCaptain').value = crew.captain;
  openModal('crewModal');
}

function saveCrew(event) {
  event.preventDefault();
  
  const index = parseInt(document.getElementById('crewIndex').value);
  const crewData = {
    name: document.getElementById('crewName').value,
    icon: document.getElementById('crewIcon').value,
    color: document.getElementById('crewColor').value,
    captain: document.getElementById('crewCaptain').value
  };
  
  if (index === -1) {
    crews.push(crewData);
    showToast('success', '✅ Đã thêm băng nhóm mới!');
  } else {
    // Update pirates with old crew name
    const oldName = crews[index].name;
    pirates.forEach(p => {
      if (p.crew === oldName) {
        p.crew = crewData.name;
      }
    });
    crews[index] = crewData;
    showToast('success', '✅ Đã cập nhật băng nhóm!');
  }
  
  saveData();
  renderCrews();
  renderPirates();
  closeModal('crewModal');
}

function deleteCrew(index) {
  const crewName = crews[index].name;
  const memberCount = pirates.filter(p => p.crew === crewName).length;
  
  showConfirm(`Bạn có chắc muốn xóa băng "${crewName}"?\n${memberCount} hải tặc sẽ trở thành Độc Lập.`, () => {
    // Update pirates
    pirates.forEach(p => {
      if (p.crew === crewName) {
        p.crew = 'No Crew';
      }
    });
    crews.splice(index, 1);
    saveData();
    renderCrews();
    renderPirates();
    showToast('success', '✅ Đã xóa băng nhóm!');
  });
}

function searchCrews(query) {
  crewSearchQuery = query;
  renderCrews();
}

// =====================================================
// RANK CRUD
// =====================================================
function openAddRankModal() {
  document.getElementById('rankModalTitle').textContent = '➕ Thêm Cấp Độ';
  document.getElementById('rankForm').reset();
  document.getElementById('rankIndex').value = -1;
  openModal('rankModal');
}

function editRank(index) {
  const rank = ranks[index];
  document.getElementById('rankModalTitle').textContent = '✏️ Sửa Cấp Độ';
  document.getElementById('rankIndex').value = index;
  document.getElementById('rankType').value = rank.type;
  document.getElementById('rankName').value = rank.name;
  document.getElementById('rankIcon').value = rank.icon;
  document.getElementById('rankColor').value = rank.color;
  document.getElementById('rankMinBounty').value = rank.minBounty;
  openModal('rankModal');
}

function saveRank(event) {
  event.preventDefault();
  
  const index = parseInt(document.getElementById('rankIndex').value);
  const rankData = {
    type: document.getElementById('rankType').value,
    name: document.getElementById('rankName').value,
    icon: document.getElementById('rankIcon').value,
    color: document.getElementById('rankColor').value,
    minBounty: parseInt(document.getElementById('rankMinBounty').value)
  };
  
  if (index === -1) {
    ranks.push(rankData);
    showToast('success', '✅ Đã thêm cấp độ mới!');
  } else {
    ranks[index] = rankData;
    showToast('success', '✅ Đã cập nhật cấp độ!');
  }
  
  saveData();
  renderRanks();
  renderPirates();
  closeModal('rankModal');
}

function deleteRank(index) {
  showConfirm(`Bạn có chắc muốn xóa cấp độ "${ranks[index].name}"?`, () => {
    ranks.splice(index, 1);
    saveData();
    renderRanks();
    renderPirates();
    showToast('success', '✅ Đã xóa cấp độ!');
  });
}

// Upload hình ảnh cho cấp độ
function uploadRankImage(rankType, input) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    rankImages[rankType] = e.target.result;
    saveData();
    renderRanks();
    showToast('success', '✅ Đã cập nhật hình ảnh cấp độ!');
  };
  reader.readAsDataURL(file);
}

// Xóa hình ảnh cấp độ
function deleteRankImage(rankType) {
  showConfirm('Bạn có chắc muốn xóa hình ảnh này?', () => {
    delete rankImages[rankType];
    saveData();
    renderRanks();
    showToast('success', '✅ Đã xóa hình ảnh cấp độ!');
  });
}

// Upload hình ảnh cho băng nhóm
function uploadCrewImage(crewName, input) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    crewImages[crewName] = e.target.result;
    saveData();
    renderCrews();
    showToast('success', '✅ Đã cập nhật hình ảnh băng nhóm!');
  };
  reader.readAsDataURL(file);
}

// Xóa hình ảnh băng nhóm
function deleteCrewImage(crewName) {
  showConfirm('Bạn có chắc muốn xóa hình ảnh này?', () => {
    delete crewImages[crewName];
    saveData();
    renderCrews();
    showToast('success', '✅ Đã xóa hình ảnh băng nhóm!');
  });
}

// =====================================================
// ACCOUNT CRUD
// =====================================================
function loadPirateOptions(selectedPirate = '') {
  const select = document.getElementById('accountPirate');
  if (!select) {
    console.log('Select element not found!');
    return;
  }
  
  console.log('Loading pirate options, pirates count:', pirates.length);
  
  select.innerHTML = '<option value="">-- Không liên kết --</option>';
  pirates.forEach(p => {
    const selected = p.name === selectedPirate ? 'selected' : '';
    const option = document.createElement('option');
    option.value = p.name;
    option.textContent = `${p.name} (${p.crew})`;
    if (p.name === selectedPirate) option.selected = true;
    select.appendChild(option);
  });
}

function openAddAccountModal() {
  document.getElementById('accountModalTitle').textContent = '➕ Thêm Tài Khoản';
  document.getElementById('accountForm').reset();
  document.getElementById('accountIndex').value = -1;
  loadPirateOptions();
  openModal('accountModal');
}

function editAccount(index) {
  const account = accounts[index];
  document.getElementById('accountModalTitle').textContent = '✏️ Sửa Tài Khoản';
  document.getElementById('accountIndex').value = index;
  document.getElementById('accountUsername').value = account.username;
  document.getElementById('accountEmail').value = account.email;
  document.getElementById('accountPassword').value = '';
  document.getElementById('accountRole').value = account.role;
  document.getElementById('accountStatus').value = account.status;
  loadPirateOptions(account.pirateId || '');
  openModal('accountModal');
}

function saveAccount(event) {
  event.preventDefault();
  
  const index = parseInt(document.getElementById('accountIndex').value);
  const password = document.getElementById('accountPassword').value;
  
  const pirateIdSelect = document.getElementById('accountPirate');
  const accountData = {
    username: document.getElementById('accountUsername').value,
    email: document.getElementById('accountEmail').value,
    role: document.getElementById('accountRole').value,
    status: document.getElementById('accountStatus').value,
    pirateId: pirateIdSelect ? pirateIdSelect.value || null : null,
    createdAt: index === -1 ? new Date().toISOString().split('T')[0] : accounts[index].createdAt
  };
  
  if (index === -1) {
    accountData.password = password;
    accounts.push(accountData);
    showToast('success', '✅ Đã thêm tài khoản mới!');
  } else {
    accountData.password = password || accounts[index].password;
    accounts[index] = accountData;
    showToast('success', '✅ Đã cập nhật tài khoản!');
  }
  
  saveData();
  renderAccounts();
  updateStats();
  closeModal('accountModal');
}

function deleteAccount(index) {
  const account = accounts[index];
  showConfirm(`Bạn có chắc muốn xóa tài khoản "${account.username}"?\nHải tặc liên kết và TẤT CẢ dữ liệu sẽ bị xóa vĩnh viễn.`, () => {
    // Xóa hải tặc liên kết nếu có
    if (account.pirateId) {
      const pirateIndex = pirates.findIndex(p => p.name === account.pirateId);
      if (pirateIndex !== -1) {
        const pirateName = pirates[pirateIndex].name;
        
        // Xóa quest attempts của hải tặc này
        const questAttempts = JSON.parse(localStorage.getItem('onePieceQuestAttempts') || '{}');
        if (questAttempts[pirateName]) {
          delete questAttempts[pirateName];
          localStorage.setItem('onePieceQuestAttempts', JSON.stringify(questAttempts));
          
          // Sync lên Firebase
          if (typeof database !== 'undefined' && database) {
            database.ref('sharedData/questAttempts').set(questAttempts);
          }
        }
        
        // Xóa submissions của hải tặc này
        submissions = submissions.filter(sub => sub.studentName !== pirateName);
        localStorage.setItem('onePieceSubmissions', JSON.stringify(submissions));
        
        // Xóa submissions trên Firebase
        if (typeof database !== 'undefined' && database) {
          database.ref('submissions').once('value').then(snapshot => {
            const firebaseSubmissions = snapshot.val() || {};
            Object.keys(firebaseSubmissions).forEach(key => {
              if (firebaseSubmissions[key].studentName === pirateName) {
                database.ref('submissions/' + key).remove();
              }
            });
          });
        }
        
        pirates.splice(pirateIndex, 1);
      }
    }
    
    accounts.splice(index, 1);
    saveData();
    renderAccounts();
    renderPirates();
    renderSubmissions();
    updateStats();
    showToast('success', '✅ Đã xóa vĩnh viễn tài khoản và toàn bộ dữ liệu!');
  });
}

function searchAccounts(query) {
  accountSearchQuery = query;
  renderAccounts();
}

// =====================================================
// IMPORT/EXPORT
// =====================================================
function exportData() {
  const data = {
    pirates,
    crews,
    ranks,
    accounts,
    rankImages,
    quests,
    submissions,
    exportDate: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `onepiece-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  showToast('success', '📤 Đã xuất dữ liệu thành công!');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      
      let newAccountsCreated = 0;
      
      if (data.pirates) {
        const oldPirateCount = pirates.length;
        pirates = data.pirates;
        
        // Tạo tài khoản cho tất cả hải tặc mới import
        pirates.forEach(pirate => {
          const account = createAccountForPirate(pirate.name);
          if (account) {
            newAccountsCreated++;
          }
        });
      }
      
      if (data.crews) crews = data.crews;
      if (data.ranks) ranks = data.ranks;
      if (data.rankImages) rankImages = data.rankImages;
      if (data.quests) quests = data.quests;
      if (data.submissions) submissions = data.submissions;
      
      // Chỉ import accounts nếu có trong file và merge với accounts hiện tại
      if (data.accounts) {
        // Giữ lại admin account
        const adminAccounts = accounts.filter(a => a.role === 'admin');
        const importedAccounts = data.accounts.filter(a => a.role !== 'admin');
        accounts = [...adminAccounts, ...importedAccounts];
      }
      
      saveData();
      renderAll();
      
      if (newAccountsCreated > 0) {
        showToast('success', `📥 Đã nhập dữ liệu và tạo ${newAccountsCreated} tài khoản mới!`);
      } else {
        showToast('success', '📥 Đã nhập dữ liệu thành công!');
      }
    } catch (error) {
      showToast('error', '❌ File không hợp lệ!');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// =====================================================
// SYNC TO CLOUD (Firebase)
// =====================================================
async function syncToCloud() {
  // Database đã được khởi tạo bởi firebase-config.js
  if (!database) {
    showToast('warning', '⚠️ Firebase chưa được cấu hình!');
    return;
  }
  
  try {
    const userId = localStorage.getItem('onePieceUserId') || 'admin_' + Date.now();
    
    // Đảm bảo admin luôn có trong danh sách
    const hasAdmin = accounts.some(a => a.role === 'admin');
    if (!hasAdmin) {
      accounts.unshift({ username: 'admin', email: 'admin@onepiece.com', password: 'admin123', role: 'admin', status: 'active', createdAt: '2025-01-01' });
      saveData(); // Lưu lại
    }
    
    const data = {
      pirates: pirates,
      crews: crews,
      accounts: accounts,
      rankImages: rankImages,
      crewImages: crewImages,
      quests: quests,
      submissions: submissions,
      lastUpdate: Date.now(),
      lastUserId: userId
    };
    
    await database.ref('sharedData').set(data);
    localStorage.setItem('lastLocalUpdate', Date.now().toString());
    showToast('success', `☁️ Đã đồng bộ ${pirates.length} hải tặc, ${crews.length} băng nhóm, ${accounts.length} tài khoản, ${quests.length} nhiệm vụ, ${submissions.length} bài nộp và hình ảnh lên cloud!`);
  } catch (error) {
    console.error('Sync error:', error);
    showToast('error', '❌ Lỗi đồng bộ: ' + error.message);
  }
}

// =====================================================
// CONFIRM & TOAST
// =====================================================
function showConfirm(message, callback) {
  document.getElementById('confirmMessage').textContent = message;
  document.getElementById('confirmBtn').onclick = () => {
    callback();
    closeModal('confirmModal');
  };
  openModal('confirmModal');
}

function showToast(type, message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Close modal when clicking outside
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
    }
  });
});

// =====================================================
// QUEST MANAGEMENT
// =====================================================

function renderQuests() {
  const grid = document.getElementById('questsGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  let filteredQuests = quests.filter(quest => {
    const matchesSearch = !questSearchQuery || 
      quest.title.toLowerCase().includes(questSearchQuery.toLowerCase()) ||
      quest.description?.toLowerCase().includes(questSearchQuery.toLowerCase());
    const matchesGrade = !questGradeFilter || quest.grade === questGradeFilter;
    const matchesSubject = !questSubjectFilter || quest.subject === questSubjectFilter;
    return matchesSearch && matchesGrade && matchesSubject;
  });
  
  if (filteredQuests.length === 0) {
    grid.innerHTML = '<div style="text-align: center; padding: 40px; color: #95a5a6;">📝 Chưa có nhiệm vụ nào</div>';
    return;
  }
  
  filteredQuests.forEach((quest, index) => {
    const realIndex = quests.indexOf(quest);
    const gradeText = quest.grade ? `Khối ${quest.grade}` : 'N/A';
    const subjectText = quest.subject === 'tin-hoc' ? 'Tin học' : quest.subject === 'cong-nghe' ? 'Công nghệ' : 'N/A';
    const questionCount = quest.questions?.length || 0;
    const rewardPerQuestion = quest.rewardPerQuestion || quest.reward || 100;
    const penaltyPerQuestion = quest.penaltyPerQuestion || 0;
    const maxScore = quest.maxScore || 1000;
    const questType = quest.type === 'special' ? 'Đặc biệt' : 'Trắc nghiệm';
    const questTypeIcon = quest.type === 'special' ? '📸' : '📝';
    const questTypeColor = quest.type === 'special' ? '#e67e22' : '#3498db';
    
    const card = document.createElement('div');
    card.className = 'quest-card';
    card.innerHTML = `
      <div class="quest-card-header">
        <h3>${questTypeIcon} ${quest.title}</h3>
        <div class="quest-card-badges">
          <span class="badge" style="background: ${questTypeColor};">${questType}</span>
          <span class="badge badge-grade">🎓 ${gradeText}</span>
          <span class="badge badge-subject">📖 ${subjectText}</span>
        </div>
      </div>
      <div class="quest-card-body">
        <p class="quest-description">${quest.description || 'Không có mô tả'}</p>
        ${quest.type === 'special' ? `
          <div class="quest-stats">
            <div class="quest-stat">
              <span class="stat-icon">📸</span>
              <span class="stat-text">Nộp hình ảnh</span>
            </div>
            <div class="quest-stat">
              <span class="stat-icon">💰</span>
              <span class="stat-text">Điểm tối đa: ${maxScore}฿</span>
            </div>
            <div class="quest-stat">
              <span class="stat-icon">⏳</span>
              <span class="stat-text">1 lần/tháng</span>
            </div>
          </div>
        ` : `
          <div class="quest-stats">
            <div class="quest-stat">
              <span class="stat-icon">📚</span>
              <span class="stat-text">${questionCount} câu (random 5)</span>
            </div>
            <div class="quest-stat">
              <span class="stat-icon">💰</span>
              <span class="stat-text">+${rewardPerQuestion}฿/đúng | -${penaltyPerQuestion}฿/sai</span>
            </div>
            <div class="quest-stat">
              <span class="stat-icon">⏳</span>
              <span class="stat-text">3 lần/ngày</span>
            </div>
          </div>
        `}
      </div>
      <div class="quest-card-actions">
        <button class="btn-edit" onclick="editQuest(${realIndex})" title="Chỉnh sửa">
          ✏️ Sửa
        </button>
        <button class="btn-delete" onclick="deleteQuest(${realIndex})" title="Xóa">
          🗑️ Xóa
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
  
  updateQuestStats();
}

function updateQuestStats() {
  const totalQuests = quests.length;
  const totalQuestions = quests.reduce((sum, quest) => sum + (quest.questions?.length || 0), 0);
  const avgQuestions = totalQuests > 0 ? Math.round(totalQuestions / totalQuests) : 0;
  
  const totalQuestsEl = document.getElementById('totalQuests');
  const totalQuestionsEl = document.getElementById('totalQuestions');
  const avgQuestionsEl = document.getElementById('avgQuestionsPerQuest');
  
  if (totalQuestsEl) totalQuestsEl.textContent = totalQuests;
  if (totalQuestionsEl) totalQuestionsEl.textContent = totalQuestions;
  if (avgQuestionsEl) avgQuestionsEl.textContent = avgQuestions;
}

function searchQuests(query) {
  questSearchQuery = query;
  renderQuests();
}

function filterQuests() {
  questGradeFilter = document.getElementById('gradeFilter')?.value || '';
  questSubjectFilter = document.getElementById('subjectFilter')?.value || '';
  renderQuests();
}

function openAddQuizQuestModal() {
  document.getElementById('questModalTitle').textContent = '📝 Thêm Nhiệm Vụ Trắc Nghiệm';
  document.getElementById('questIndex').value = '-1';
  document.getElementById('questForm').reset();
  document.getElementById('questType').value = 'quiz';
  document.getElementById('questionsContainer').innerHTML = '';
  addQuestionField(); // Add one default question
  toggleQuestType();
  openModal('questModal');
}

function openAddSpecialQuestModal() {
  document.getElementById('questModalTitle').textContent = '📸 Thêm Nhiệm Vụ Đặc Biệt';
  document.getElementById('questIndex').value = '-1';
  document.getElementById('questForm').reset();
  document.getElementById('questType').value = 'special';
  toggleQuestType();
  openModal('questModal');
}

function editQuest(index) {
  const quest = quests[index];
  document.getElementById('questModalTitle').textContent = '✏️ Chỉnh sửa Nhiệm Vụ';
  document.getElementById('questIndex').value = index;
  document.getElementById('questTitle').value = quest.title;
  document.getElementById('questGrade').value = quest.grade || '';
  document.getElementById('questSubject').value = quest.subject || '';
  document.getElementById('questType').value = quest.type || 'quiz';
  document.getElementById('questDescription').value = quest.description || '';
  
  // Set values based on quest type
  if (quest.type === 'special') {
    document.getElementById('questRequirements').value = quest.requirements || '';
    document.getElementById('questMaxScore').value = quest.maxScore || 1000;
  } else {
    document.getElementById('questRewardPerQuestion').value = quest.rewardPerQuestion || quest.reward || 100;
    document.getElementById('questPenaltyPerQuestion').value = quest.penaltyPerQuestion || 0;
    
    // Load questions
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    if (quest.questions && quest.questions.length > 0) {
      quest.questions.forEach((q, i) => {
        addQuestionField(q);
      });
    } else {
      addQuestionField();
    }
  }
  
  toggleQuestType();
  openModal('questModal');
}

function addQuestionField(questionData = null) {
  const container = document.getElementById('questionsContainer');
  const questionIndex = container.children.length;
  
  const questionDiv = document.createElement('div');
  questionDiv.className = 'question-item';
  questionDiv.innerHTML = `
    <div class="question-header">
      <strong>Câu ${questionIndex + 1}</strong>
      <button type="button" class="btn-remove-question" onclick="removeQuestionField(this)" title="Xóa câu hỏi">
        🗑️
      </button>
    </div>
    <div class="form-group">
      <label>❓ Nội dung câu hỏi</label>
      <input type="text" class="question-text" required placeholder="Nhập câu hỏi..." value="${questionData?.question || ''}">
    </div>
    <div class="form-group">
      <label>📋 Các đáp án (mỗi đáp án một dòng)</label>
      <textarea class="question-options" rows="4" required placeholder="Đáp án A&#10;Đáp án B&#10;Đáp án C&#10;Đáp án D">${questionData?.options?.join('\n') || ''}</textarea>
    </div>
    <div class="form-group">
      <label>✅ Đáp án đúng (số thứ tự, bắt đầu từ 0)</label>
      <input type="number" class="question-correct" required min="0" placeholder="0" value="${questionData?.correctAnswer ?? ''}">
      <small style="color: #95a5a6; font-size: 12px; display: block; margin-top: 5px;">
        Ví dụ: 0 = đáp án đầu tiên, 1 = đáp án thứ hai, ...
      </small>
    </div>
  `;
  
  container.appendChild(questionDiv);
}

function removeQuestionField(btn) {
  const questionItem = btn.closest('.question-item');
  questionItem.remove();
  
  // Re-number remaining questions
  const container = document.getElementById('questionsContainer');
  Array.from(container.children).forEach((item, index) => {
    const header = item.querySelector('.question-header strong');
    if (header) {
      header.textContent = `Câu ${index + 1}`;
    }
  });
}

function saveQuest(event) {
  event.preventDefault();
  
  const index = parseInt(document.getElementById('questIndex').value);
  const title = document.getElementById('questTitle').value.trim();
  const grade = document.getElementById('questGrade').value;
  const subject = document.getElementById('questSubject').value;
  const questType = document.getElementById('questType').value;
  const description = document.getElementById('questDescription').value.trim();
  
  let questData = {
    title,
    grade,
    subject,
    type: questType,
    description,
    createdAt: index === -1 ? new Date().toISOString() : (quests[index]?.createdAt || new Date().toISOString()),
    updatedAt: new Date().toISOString()
  };
  
  if (questType === 'special') {
    // Special quest (image submission)
    const requirements = document.getElementById('questRequirements').value.trim();
    const maxScore = parseInt(document.getElementById('questMaxScore').value);
    
    questData.requirements = requirements;
    questData.maxScore = maxScore;
  } else {
    // Quiz quest
    const rewardPerQuestion = parseInt(document.getElementById('questRewardPerQuestion').value);
    const penaltyPerQuestion = parseInt(document.getElementById('questPenaltyPerQuestion').value);
    
    // Collect questions
    const questionItems = document.querySelectorAll('.question-item');
    const questions = [];
    
    questionItems.forEach(item => {
      const questionText = item.querySelector('.question-text').value.trim();
      const optionsText = item.querySelector('.question-options').value.trim();
      const correctAnswer = parseInt(item.querySelector('.question-correct').value);
      
      if (questionText && optionsText) {
        const options = optionsText.split('\n').map(opt => opt.trim()).filter(opt => opt);
        questions.push({
          question: questionText,
          options: options,
          correctAnswer: correctAnswer
        });
      }
    });
    
    if (questions.length === 0) {
      showToast('error', '❌ Vui lòng thêm ít nhất một câu hỏi!');
      return;
    }
    
    questData.rewardPerQuestion = rewardPerQuestion;
    questData.penaltyPerQuestion = penaltyPerQuestion;
    questData.questions = questions;
  }
  
  if (index === -1) {
    quests.push(questData);
    console.log('🟢 Đã thêm nhiệm vụ mới vào mảng quests');
    showToast('success', '✅ Đã thêm nhiệm vụ mới!');
  } else {
    quests[index] = questData;
    console.log('🟡 Đã cập nhật nhiệm vụ trong mảng quests');
    showToast('success', '✅ Đã cập nhật nhiệm vụ!');
  }
  
  console.log('📦 Quest data:', questData);
  console.log('📊 Tổng số quests:', quests.length);
  console.log('📋 Toàn bộ quests:', quests);
  
  saveData();
  renderQuests();
  closeModal('questModal');
  
  // Auto sync lên Firebase
  if (typeof syncToFirebase === 'function') {
    syncToFirebase().then(() => {
      console.log('☁️ Đã tự động đồng bộ nhiệm vụ lên Firebase');
    }).catch(err => {
      console.error('❌ Lỗi đồng bộ:', err);
    });
  }
}

function deleteQuest(index) {
  showConfirm(`Bạn có chắc chắn muốn xóa nhiệm vụ "${quests[index].title}"?`, () => {
    quests.splice(index, 1);
    saveData();
    renderQuests();
    showToast('success', '✅ Đã xóa nhiệm vụ!');
    
    // Auto sync lên Firebase
    if (typeof syncToFirebase === 'function') {
      syncToFirebase().then(() => {
        console.log('☁️ Đã tự động đồng bộ sau khi xóa nhiệm vụ');
      }).catch(err => {
        console.error('❌ Lỗi đồng bộ:', err);
      });
    }
  });
}

function toggleQuestType() {
  const questType = document.getElementById('questType').value;
  const quizContainer = document.getElementById('quizTypeContainer');
  const specialContainer = document.getElementById('specialTypeContainer');
  
  if (questType === 'quiz') {
    quizContainer.style.display = 'block';
    specialContainer.style.display = 'none';
    
    // Bật required cho quiz fields
    document.getElementById('questRewardPerQuestion').required = true;
    document.getElementById('questPenaltyPerQuestion').required = true;
    
    // Tắt required cho special fields
    document.getElementById('questRequirements').required = false;
    document.getElementById('questMaxScore').required = false;
  } else {
    quizContainer.style.display = 'none';
    specialContainer.style.display = 'block';
    
    // Tắt required cho quiz fields
    document.getElementById('questRewardPerQuestion').required = false;
    document.getElementById('questPenaltyPerQuestion').required = false;
    
    // Bật required cho special fields  
    document.getElementById('questRequirements').required = false; // Không bắt buộc
    document.getElementById('questMaxScore').required = true;
  }
}

// =====================================================
// SUBMISSION MANAGEMENT
// =====================================================

function renderSubmissions() {
  const grid = document.getElementById('submissionsGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  let filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = !submissionSearchQuery || 
      sub.studentName?.toLowerCase().includes(submissionSearchQuery.toLowerCase()) ||
      sub.questTitle?.toLowerCase().includes(submissionSearchQuery.toLowerCase());
    const matchesStatus = !submissionStatusFilter || sub.status === submissionStatusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Sort by date descending (newest first)
  filteredSubmissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  
  if (filteredSubmissions.length === 0) {
    grid.innerHTML = '<div style="text-align: center; padding: 40px; color: #95a5a6;">📸 Chưa có bài nộp nào</div>';
    return;
  }
  
  filteredSubmissions.forEach((sub, index) => {
    const statusBadge = sub.status === 'pending' ? '⏳ Chờ duyệt' : 
                       sub.status === 'approved' ? '✅ Đã duyệt' : '❌ Từ chối';
    const statusColor = sub.status === 'pending' ? '#f39c12' : 
                       sub.status === 'approved' ? '#27ae60' : '#e74c3c';
    const submitDate = new Date(sub.submittedAt).toLocaleString('vi-VN');
    
    const card = document.createElement('div');
    card.className = 'submission-card';
    card.innerHTML = `
      <div class="submission-card-header">
        <div>
          <h3>👤 ${sub.studentName}</h3>
          <p style="color: #95a5a6; font-size: 14px; margin-top: 5px;">⚔️ ${sub.crewName}</p>
        </div>
        <span class="badge" style="background: ${statusColor};">${statusBadge}</span>
      </div>
      <div class="submission-card-body">
        <p style="margin-bottom: 10px;"><strong>📝 Nhiệm vụ:</strong> ${sub.questTitle}</p>
        <p style="margin-bottom: 10px; color: #95a5a6; font-size: 14px;">📅 ${submitDate}</p>
        ${sub.score !== undefined && sub.status === 'approved' ? `<p style="color: #f39c12; font-weight: 600;">💰 Điểm: ${sub.score}฿</p>` : ''}
        ${sub.feedback ? `<p style="margin-top: 10px; padding: 10px; background: rgba(52, 73, 94, 0.3); border-radius: 5px; font-size: 14px;">💬 ${sub.feedback}</p>` : ''}
      </div>
      <div class="submission-card-actions">
        <button class="btn-view" onclick="viewSubmission('${sub.id}')" title="Xem và duyệt">
          👁️ Xem & Duyệt
        </button>
        <button class="btn-delete" onclick="deleteSubmission('${sub.id}')" title="Xóa">
          🗑️ Xóa
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
  
  updateSubmissionStats();
}

function updateSubmissionStats() {
  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter(s => s.status === 'pending').length;
  const approvedSubmissions = submissions.filter(s => s.status === 'approved').length;
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected').length;
  
  const totalEl = document.getElementById('totalSubmissions');
  const pendingEl = document.getElementById('pendingSubmissions');
  const approvedEl = document.getElementById('approvedSubmissions');
  const rejectedEl = document.getElementById('rejectedSubmissions');
  
  if (totalEl) totalEl.textContent = totalSubmissions;
  if (pendingEl) pendingEl.textContent = pendingSubmissions;
  if (approvedEl) approvedEl.textContent = approvedSubmissions;
  if (rejectedEl) rejectedEl.textContent = rejectedSubmissions;
}

function searchSubmissions(query) {
  submissionSearchQuery = query;
  renderSubmissions();
}

function filterSubmissions() {
  submissionStatusFilter = document.getElementById('submissionStatusFilter')?.value || '';
  renderSubmissions();
}

function toggleScoreField() {
  const status = document.getElementById('submissionStatus').value;
  const scoreContainer = document.getElementById('scoreFieldContainer');
  
  if (status === 'approved') {
    scoreContainer.style.display = 'block';
    document.getElementById('submissionScore').required = true;
  } else {
    scoreContainer.style.display = 'none';
    document.getElementById('submissionScore').required = false;
  }
}

// =====================================================
// FIREBASE SUBMISSIONS MANAGEMENT
// =====================================================

async function loadSubmissionsFromFirebase() {
  if (!database) {
    showToast('error', '❌ Firebase chưa sẵn sàng!');
    return;
  }
  
  try {
    const snapshot = await database.ref('submissions').once('value');
    const submissionsData = snapshot.val();
    
    if (!submissionsData) {
      submissions = [];
    } else {
      // Convert to array with IDs
      submissions = Object.keys(submissionsData).map(key => ({
        id: key,
        ...submissionsData[key]
      }));
    }
    
    renderSubmissions();
    console.log('Loaded', submissions.length, 'submissions from Firebase');
  } catch (error) {
    console.error('Load submissions error:', error);
    showToast('error', '❌ Lỗi khi tải bài nộp');
  }
}

function viewSubmission(submissionId) {
  const sub = submissions.find(s => s.id === submissionId);
  if (!sub) return;
  
  document.getElementById('submissionStudentName').textContent = sub.studentName;
  document.getElementById('submissionCrewName').textContent = sub.crewName;
  document.getElementById('submissionQuestTitle').textContent = sub.questTitle;
  document.getElementById('submissionDate').textContent = new Date(sub.submittedAt).toLocaleString('vi-VN');
  document.getElementById('submissionStatus').value = sub.status || 'pending';
  document.getElementById('submissionScore').value = sub.score || '';
  document.getElementById('submissionFeedback').value = sub.feedback || '';
  document.getElementById('submissionId').value = submissionId;
  
  toggleScoreField();
  
  // Load images
  const imagesContainer = document.getElementById('submissionImagesContainer');
  imagesContainer.innerHTML = '';
  if (sub.images && sub.images.length > 0) {
    sub.images.forEach(imgURL => {
      const imgDiv = document.createElement('div');
      imgDiv.style.cssText = 'position: relative; width: 200px; height: 200px; border: 2px solid #34495e; border-radius: 10px; overflow: hidden;';
      imgDiv.innerHTML = `
        <img src="${imgURL}" alt="Submission" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" onclick="window.open('${imgURL}', '_blank')">
      `;
      imagesContainer.appendChild(imgDiv);
    });
  } else {
    imagesContainer.innerHTML = '<p style="color: #95a5a6;">Không có hình ảnh</p>';
  }
  
  openModal('reviewSubmissionModal');
}

async function saveSubmissionReview(event) {
  event.preventDefault();
  
  const submissionId = document.getElementById('submissionId').value;
  const status = document.getElementById('submissionStatus').value;
  const score = status === 'approved' ? parseInt(document.getElementById('submissionScore').value) : 0;
  const feedback = document.getElementById('submissionFeedback').value.trim();
  
  if (!database) {
    showToast('error', '❌ Firebase chưa sẵn sàng!');
    return;
  }
  
  try {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) {
      showToast('error', '❌ Không tìm thấy bài nộp!');
      return;
    }
    
    // Update submission in Firebase
    await database.ref(`submissions/${submissionId}`).update({
      status: status,
      score: score,
      feedback: feedback,
      reviewedAt: new Date().toISOString()
    });
    
    // Xử lý lượt nộp và điểm
    const oldStatus = sub.status || 'pending';
    const oldScore = sub.score || 0;
    const questTitle = sub.questTitle;
    const studentName = sub.studentName;
    
    // Load quest attempts from Firebase
    const attemptsSnapshot = await database.ref('questAttempts').once('value');
    const questAttempts = attemptsSnapshot.val() || {};
    
    if (!questAttempts[studentName]) questAttempts[studentName] = {};
    if (!questAttempts[studentName][questTitle]) {
      questAttempts[studentName][questTitle] = { count: 0, dates: [] };
    }
    
    const attemptData = questAttempts[studentName][questTitle];
    
    // Xử lý chuyển đổi trạng thái
    if ((oldStatus === 'pending' || oldStatus === 'approved') && status === 'rejected') {
      // Từ Chờ/Đã duyệt → Từ chối: Hoàn lại lượt
      if (attemptData.count > 0) {
        attemptData.count -= 1;
        attemptData.dates = attemptData.dates.slice(0, -1);
        await database.ref(`questAttempts/${studentName}/${questTitle}`).set(attemptData);
        console.log(`➕ Đã hoàn lại lượt cho ${studentName} (${oldStatus} → rejected)`);
      }
      
      // Nếu từ Đã duyệt → Từ chối: TRỪ ĐIỂM đã cộng
      if (oldStatus === 'approved' && oldScore > 0) {
        const pirate = pirates.find(p => p.name === studentName);
        if (pirate) {
          pirate.bounty = Math.max(0, (pirate.bounty || 0) - oldScore);
          console.log(`💸 Đã trừ lại ${oldScore}฿ từ ${studentName} (bounty: ${pirate.bounty})`);
          saveData();
          
          // Sync pirates to Firebase
          const piratesRef = database.ref('sharedData/pirates');
          await piratesRef.set(pirates);
          console.log('☁️ Đã sync điểm lên Firebase');
        }
      }
    } 
    else if (oldStatus === 'rejected' && (status === 'pending' || status === 'approved')) {
      // Từ Từ chối → Chờ/Đã duyệt: Trừ lại lượt (không cho nộp lại)
      attemptData.count += 1;
      attemptData.dates.push(sub.submittedAt || new Date().toISOString());
      await database.ref(`questAttempts/${studentName}/${questTitle}`).set(attemptData);
      console.log(`➖ Đã trừ lại lượt cho ${studentName} (rejected → ${status})`);
    }
    
    // Cộng điểm nếu Đã duyệt (chỉ khi chưa cộng trước đó)
    if (status === 'approved' && score > 0 && oldStatus !== 'approved') {
      const pirate = pirates.find(p => p.name === studentName);
      
      if (pirate) {
        const oldBounty = pirate.bounty || 0;
        pirate.bounty = oldBounty + score;
        console.log(`💰 Cộng điểm: ${oldBounty} + ${score} = ${pirate.bounty}`);
        
        saveData();
        console.log('✅ Đã lưu vào localStorage');
        
        // Sync pirates to Firebase manually
        const piratesRef = database.ref('sharedData/pirates');
        await piratesRef.set(pirates);
        console.log('☁️ Đã sync điểm lên Firebase');
      } else {
        console.error('❌ Không tìm thấy hải tặc:', studentName);
      }
    }
    // Nếu thay đổi điểm trong trạng thái Đã duyệt
    else if (status === 'approved' && oldStatus === 'approved' && score !== oldScore) {
      const pirate = pirates.find(p => p.name === studentName);
      
      if (pirate) {
        // Trừ điểm cũ, cộng điểm mới
        pirate.bounty = Math.max(0, (pirate.bounty || 0) - oldScore + score);
        console.log(`🔄 Cập nhật điểm: -${oldScore} +${score} = ${pirate.bounty}`);
        
        saveData();
        
        const piratesRef = database.ref('sharedData/pirates');
        await piratesRef.set(pirates);
        console.log('☁️ Đã sync điểm cập nhật lên Firebase');
      }
    }
    
    // Reload submissions
    await loadSubmissionsFromFirebase();
    renderPirates();
    closeModal('reviewSubmissionModal');
    showToast('success', '✅ Đã lưu đánh giá!');
  } catch (error) {
    console.error('Save review error:', error);
    showToast('error', '❌ Lỗi khi lưu đánh giá');
  }
}

async function deleteSubmission(submissionId) {
  showConfirm(`Bạn có chắc chắn muốn xóa bài nộp này?`, async () => {
    if (!database) {
      showToast('error', '❌ Firebase chưa sẵn sàng!');
      return;
    }
    
    try {
      // Lấy thông tin bài nộp trước khi xóa
      const sub = submissions.find(s => s.id === submissionId);
      
      if (sub) {
        const questTitle = sub.questTitle;
        const studentName = sub.studentName;
        
        // Load quest attempts from Firebase
        const attemptsSnapshot = await database.ref('questAttempts').once('value');
        const questAttempts = attemptsSnapshot.val() || {};
        
        if (questAttempts[studentName] && questAttempts[studentName][questTitle]) {
          const attemptData = questAttempts[studentName][questTitle];
          
          // Giảm số lần đã làm đi 1 để hoàn lượt
          if (attemptData.count > 0) {
            attemptData.count -= 1;
            attemptData.dates = attemptData.dates.slice(0, -1); // Xóa lần thử cuối
            
            // Update lại Firebase
            await database.ref(`questAttempts/${studentName}/${questTitle}`).set(attemptData);
            console.log(`✅ Đã hoàn lại 1 lượt cho ${studentName} - ${questTitle}`);
          }
        }
      }
      
      // Xóa bài nộp
      await database.ref(`submissions/${submissionId}`).remove();
      await loadSubmissionsFromFirebase();
      showToast('success', '✅ Đã xóa bài nộp và hoàn lại lượt cho học sinh!');
    } catch (error) {
      console.error('Delete submission error:', error);
      showToast('error', '❌ Lỗi khi xóa bài nộp');
    }
  });
}

