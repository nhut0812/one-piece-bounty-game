// Toast notification system
function showToast(type, message) {
  // Tạo toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Style cho toast
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
  
  // Màu theo type
  if (type === 'success') {
    toast.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  } else if (type === 'error') {
    toast.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
  } else if (type === 'info') {
    toast.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
  }
  
  // Thêm animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Thêm vào body
  document.body.appendChild(toast);
  
  // Tự động ẩn sau 3s
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}
