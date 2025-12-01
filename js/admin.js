// =====================================================
// ADMIN PANEL - ONE PIECE BOUNTY SYSTEM
// =====================================================

// Data Storage Keys
const PIRATES_KEY = 'onePiecePirates';
const CREWS_KEY = 'onePieceCrews';
const ACCOUNTS_KEY = 'onePieceAccounts';
const RANK_IMAGES_KEY = 'onePieceRankImages';
const CREW_IMAGES_KEY = 'onePieceCrewImages';

// Default Data
let pirates = [];
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

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
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
}

function saveData() {
  localStorage.setItem(PIRATES_KEY, JSON.stringify(pirates));
  localStorage.setItem(CREWS_KEY, JSON.stringify(crews));
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  localStorage.setItem(RANK_IMAGES_KEY, JSON.stringify(rankImages));
  localStorage.setItem(CREW_IMAGES_KEY, JSON.stringify(crewImages));
  // Cập nhật timestamp để Firebase không ghi đè
  localStorage.setItem('lastLocalUpdate', Date.now().toString());
  console.log('Saved rankImages:', rankImages);
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
    'accounts': '👥 Quản lý Tài Khoản'
  };
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
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
  const username = removeVietnameseTones(pirateName);
  
  // Kiểm tra xem tài khoản đã tồn tại chưa
  const existingAccount = accounts.find(a => a.username === username);
  if (existingAccount) {
    return null; // Tài khoản đã tồn tại
  }
  
  const newAccount = {
    username: username,
    email: username + '@onepiece.com',
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
  loadCrewOptions();
  openModal('pirateModal');
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
    const newUsername = removeVietnameseTones(pirateData.name);
    
    if (oldUsername !== newUsername) {
      const accountIndex = accounts.findIndex(a => a.username === oldUsername);
      if (accountIndex !== -1) {
        accounts[accountIndex].username = newUsername;
        accounts[accountIndex].email = newUsername + '@onepiece.com';
        accounts[accountIndex].pirateId = pirateData.name;
      }
    }
    
    pirates[index] = pirateData;
    showToast('success', '✅ Đã cập nhật hải tặc!');
  }
  
  saveData();
  renderPirates();
  renderAccounts();
  updateStats();
  closeModal('pirateModal');
}

function deletePirate(index) {
  const pirateName = pirates[index].name;
  showConfirm(`Bạn có chắc muốn xóa hải tặc "${pirateName}"?\nTài khoản liên kết cũng sẽ bị xóa.`, () => {
    // Xóa tài khoản liên kết
    const username = removeVietnameseTones(pirateName);
    const accountIndex = accounts.findIndex(a => a.username === username);
    if (accountIndex !== -1) {
      accounts.splice(accountIndex, 1);
    }
    
    pirates.splice(index, 1);
    saveData();
    renderPirates();
    renderAccounts();
    updateStats();
    showToast('success', '✅ Đã xóa hải tặc và tài khoản liên kết!');
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
  showConfirm(`Bạn có chắc muốn xóa tài khoản "${accounts[index].username}"?`, () => {
    accounts.splice(index, 1);
    saveData();
    renderAccounts();
    updateStats();
    showToast('success', '✅ Đã xóa tài khoản!');
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
  // Load Firebase config nếu chưa có
  if (typeof firebase === 'undefined') {
    showToast('warning', '⚠️ Firebase chưa được cấu hình!');
    return;
  }
  
  try {
    const database = firebase.database();
    const userId = localStorage.getItem('onePieceUserId') || 'admin_' + Date.now();
    
    const data = {
      pirates: pirates,
      crews: crews,
      accounts: accounts,
      rankImages: rankImages,
      crewImages: crewImages,
      lastUpdate: Date.now(),
      lastUserId: userId
    };
    
    await database.ref('sharedData').set(data);
    localStorage.setItem('lastLocalUpdate', Date.now().toString());
    showToast('success', `☁️ Đã đồng bộ ${pirates.length} hải tặc, ${crews.length} băng nhóm, ${accounts.length} tài khoản và hình ảnh lên cloud!`);
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
