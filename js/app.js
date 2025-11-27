// Khởi tạo ứng dụng One Piece
document.addEventListener('DOMContentLoaded', async function() {
  loadFromLocalStorage();
  
  // Auto-load rank images từ thư mục img/
  if (typeof loadAllRankImages === 'function') {
    await loadAllRankImages();
  }
  
  renderPirates();
  
  console.log('⚓ One Piece Bounty System sẵn sàng!');
  console.log('🏴‍☠️ Số hải tặc:', pirates.length);
});
