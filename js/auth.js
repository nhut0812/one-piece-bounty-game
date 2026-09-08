// =====================================================
// AUTHENTICATION SYSTEM - ONE PIECE BOUNTY
// =====================================================

const AUTH_KEY = 'onePieceCurrentUser';
const ACCOUNTS_KEY = 'onePieceAccounts';

// Lấy user hiện tại
function getCurrentUser() {
  const saved = localStorage.getItem(AUTH_KEY);
  return saved ? JSON.parse(saved) : null;
}

// Lưu user hiện tại
function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

function recordLoginStreak(user) {
  if (!user) return user;

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const lastLoginDate = user.lastLoginDate || '';

  if (lastLoginDate === today) return user;

  const streak = lastLoginDate === yesterday ? (user.loginStreak || 0) + 1 : 1;
  const dailyReward = 10;
  const milestoneReward = streak === 3 ? 25 : streak === 7 ? 100 : 0;
  const reward = dailyReward + milestoneReward;
  const accounts = getAccounts();
  const accountIndex = accounts.findIndex(account => account.username === user.username);

  user.loginStreak = streak;
  user.lastLoginDate = today;
  user.lastLoginReward = reward;

  if (accountIndex >= 0) {
    accounts[accountIndex] = { ...accounts[accountIndex], ...user };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  if (user.pirateId) {
    const pirates = JSON.parse(localStorage.getItem('onePiecePirates') || '[]');
    const pirate = pirates.find(item => item.name === user.pirateId);
    if (pirate) {
      pirate.bounty += reward;
      localStorage.setItem('onePiecePirates', JSON.stringify(pirates));
      if (typeof renderPirates === 'function') renderPirates();
      if (typeof syncToFirebase === 'function') syncToFirebase();
    }
  }

  setCurrentUser(user);
  return user;
}

// Lấy danh sách tài khoản
function getAccounts() {
  const saved = localStorage.getItem(ACCOUNTS_KEY);
  let accounts = saved ? JSON.parse(saved) : [];
  
  // Khởi tạo tài khoản admin mặc định nếu chưa có
  if (accounts.length === 0) {
    accounts = [
      { username: 'admin', email: 'admin@onepiece.com', password: 'admin123', role: 'admin', status: 'active', createdAt: '2025-01-01' }
    ];
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }
  
  return accounts;
}

// Đăng nhập
function login(username, password) {
  const accounts = getAccounts();
  const account = accounts.find(a => 
    a.username.toLowerCase() === username.toLowerCase() && 
    a.password === password
  );
  
  if (!account) {
    return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' };
  }
  
  if (account.status === 'banned') {
    return { success: false, message: 'Tài khoản đã bị cấm!' };
  }
  
  if (account.status === 'inactive') {
    return { success: false, message: 'Tài khoản chưa được kích hoạt!' };
  }
  
  setCurrentUser(account);
  return { success: true, user: recordLoginStreak(account) };
}

// Đăng xuất
function logout() {
  setCurrentUser(null);
  window.location.href = 'index.html';
}

// Kiểm tra đã đăng nhập chưa
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Kiểm tra quyền admin
function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

// Mở modal đăng nhập
function showLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.add('active');
    setTimeout(() => {
      document.getElementById('loginUsername').focus();
    }, 100);
  }
}

// Đóng modal đăng nhập
function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.remove('active');
    const form = modal.querySelector('form');
    if (form) form.reset();
    const errorEl = document.getElementById('loginError');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('show');
    }
  }
}

// Xử lý submit form đăng nhập
function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('loginError');
  
  if (!username || !password) {
    errorEl.textContent = 'Vui lòng nhập đầy đủ thông tin!';
    errorEl.classList.add('show');
    return;
  }
  
  const result = login(username, password);
  
  if (result.success) {
    closeModal('loginModal');
    
    // Chuyển hướng theo role
    if (result.user.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'user.html';
    }
  } else {
    errorEl.textContent = result.message;
    errorEl.classList.add('show');
  }
}

// Mở trang profile theo role
function openProfile() {
  const user = getCurrentUser();
  if (!user) {
    showLoginModal();
    return;
  }
  
  if (user.role === 'admin') {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'user.html';
  }
}

// Cập nhật UI theo trạng thái đăng nhập
function updateAuthUI() {
  const user = getCurrentUser();
  
  const loginBtn = document.getElementById('loginBtn');
  const userInfo = document.getElementById('userInfo');
  const headerAvatar = document.getElementById('headerAvatar');
  const headerUserName = document.getElementById('headerUserName');
  const adminOnlyButtons = document.querySelectorAll('.admin-only');
  const userOnlyButtons = document.querySelectorAll('.user-only');
  
  if (!loginBtn) return;
  
  if (user) {
    // Đã đăng nhập - ẩn nút login, hiện user info
    loginBtn.style.display = 'none';
    if (userInfo) {
      userInfo.style.display = 'flex';
      
      // Cập nhật tên
      if (headerUserName) {
        headerUserName.textContent = user.username;
      }
      
      // Cập nhật avatar
      if (headerAvatar) {
        const userAvatar = safeImageUrl(user.avatar);
        if (userAvatar) {
          headerAvatar.innerHTML = `<img src="${escapeHtml(userAvatar)}" alt="Avatar">`;
        } else {
          // Kiểm tra pirate liên kết
          const pirates = JSON.parse(localStorage.getItem('onePiecePirates') || '[]');
          const linkedPirate = pirates.find(p => p.name === user.pirateId);
          const pirateAvatar = safeImageUrl(linkedPirate && linkedPirate.image);
          if (pirateAvatar) {
            headerAvatar.innerHTML = `<img src="${escapeHtml(pirateAvatar)}" alt="Avatar">`;
          } else {
            headerAvatar.innerHTML = user.role === 'admin' ? '👑' : '👤';
          }
        }
      }
    }
    
    // Hiển thị nút admin-only nếu là admin
    if (adminOnlyButtons) {
      adminOnlyButtons.forEach(btn => {
        btn.style.display = user.role === 'admin' ? 'inline-flex' : 'none';
      });
      userOnlyButtons.forEach(btn => {
        btn.style.display = user.role === 'admin' ? 'none' : 'inline-flex';
      });
      const stats = document.getElementById('studentHeaderStats');
      if (stats && user.role !== 'admin') {
        const pirate = JSON.parse(localStorage.getItem('onePiecePirates') || '[]').find(item => item.name === user.pirateId);
        const bounty = pirate?.bounty || 0;
        stats.textContent = `🔥 ${user.loginStreak || 0} ngày · 💰 ${bounty >= 1000 ? (bounty / 1000).toFixed(1) + 'K' : bounty}฿`;
      }
    }
  } else {
    // Chưa đăng nhập - hiện nút login, ẩn user info và admin buttons
    loginBtn.style.display = 'inline-flex';
    if (userInfo) userInfo.style.display = 'none';
    if (adminOnlyButtons) {
      adminOnlyButtons.forEach(btn => {
        btn.style.display = 'none';
      });
    }
    if (userOnlyButtons) userOnlyButtons.forEach(btn => { btn.style.display = 'none'; });
  }
}

function openStudentFeature(feature) {
  window.location.href = `user.html?focus=${feature}`;
}

// Khởi tạo auth UI khi trang load
document.addEventListener('DOMContentLoaded', function() {
  const user = getCurrentUser();
  if (user) recordLoginStreak(user);
  updateAuthUI();
});
