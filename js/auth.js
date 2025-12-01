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

// Lấy danh sách tài khoản
function getAccounts() {
  const saved = localStorage.getItem(ACCOUNTS_KEY);
  return saved ? JSON.parse(saved) : [];
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
  return { success: true, user: account };
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
        if (user.avatar) {
          headerAvatar.innerHTML = `<img src="${user.avatar}" alt="Avatar">`;
        } else {
          // Kiểm tra pirate liên kết
          const pirates = JSON.parse(localStorage.getItem('onePiecePirates') || '[]');
          const linkedPirate = pirates.find(p => p.name === user.pirateId);
          if (linkedPirate && linkedPirate.image) {
            headerAvatar.innerHTML = `<img src="${linkedPirate.image}" alt="Avatar">`;
          } else {
            headerAvatar.innerHTML = user.role === 'admin' ? '👑' : '👤';
          }
        }
      }
    }
  } else {
    // Chưa đăng nhập - hiện nút login, ẩn user info
    loginBtn.style.display = 'inline-flex';
    if (userInfo) userInfo.style.display = 'none';
  }
}

// Khởi tạo auth UI khi trang load
document.addEventListener('DOMContentLoaded', function() {
  updateAuthUI();
});
