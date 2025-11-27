// Khởi tạo ứng dụng One Piece
document.addEventListener('DOMContentLoaded', function() {
  // Load dữ liệu ngay lập tức
  loadFromLocalStorage();
  renderPirates();
  
  console.log('⚓ One Piece Bounty System sẵn sàng!');
  console.log('🏴‍☠️ Số hải tặc:', pirates.length);
  
  // Load rank images ở background (không chặn UI)
  if (typeof loadAllRankImages === 'function') {
    loadAllRankImages().then(() => {
      console.log('✅ Rank images loaded');
    }).catch(err => {
      console.log('⚠️ Rank images optional:', err);
    });
  }
});
