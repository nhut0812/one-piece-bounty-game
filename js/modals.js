// Mở/đóng modal
function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Chuyển đổi chế độ thêm
function switchAddMode(mode) {
  const tabs = document.querySelectorAll('.add-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  if (mode === 'single') {
    tabs[0].classList.add('active');
    document.getElementById('singleAddForm').style.display = 'block';
    document.getElementById('bulkAddForm').style.display = 'none';
  } else {
    tabs[1].classList.add('active');
    document.getElementById('singleAddForm').style.display = 'none';
    document.getElementById('bulkAddForm').style.display = 'block';
  }
}

// Thêm hải tặc đơn
function addPirate(event) {
  event.preventDefault();
  const name = document.getElementById('pirateName').value;
  const crew = document.getElementById('pirateCrew').value;
  const imageFile = document.getElementById('avatarUpload').files[0];
  
  let imageUrl = null;
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imageUrl = e.target.result;
      pirates.push({
        name: name,
        bounty: 0,
        image: imageUrl,
        type: 'rookie',
        crew: crew
      });
      renderPirates();
      saveToLocalStorage();
      closeModal('addPirateModal');
      document.getElementById('pirateName').value = '';
      document.getElementById('pirateCrew').value = '';
      document.getElementById('avatarPreview').innerHTML = '📷';
    };
    reader.readAsDataURL(imageFile);
  } else {
    pirates.push({
      name: name,
      bounty: 0,
      image: null,
      type: 'rookie',
      crew: crew
    });
    renderPirates();
    saveToLocalStorage();
    closeModal('addPirateModal');
    document.getElementById('pirateName').value = '';
    document.getElementById('pirateCrew').value = '';
  }
}

// Thêm hải tặc hàng loạt
function addBulkPirates() {
  const text = document.getElementById('bulkNames').value;
  const crew = document.getElementById('bulkCrew').value;
  const names = text.split('\n').map(n => n.trim()).filter(n => n.length > 0);
  
  if (names.length === 0) {
    alert('Vui lòng nhập danh sách tên!');
    return;
  }
  
  if (!crew) {
    alert('Vui lòng chọn băng nhóm!');
    return;
  }
  
  let addedCount = 0;
  names.forEach(name => {
    pirates.push({
      name: name,
      bounty: 0,
      image: null,
      type: 'rookie',
      crew: crew
    });
    addedCount++;
  });
  
  renderPirates();
  saveToLocalStorage();
  closeModal('addPirateModal');
  document.getElementById('bulkNames').value = '';
  document.getElementById('bulkCrew').value = '';
  
  // Hiệu ứng thông báo
  const notification = document.createElement('div');
  notification.className = 'rank-up-notification show';
  notification.innerHTML = `🎉 Đã thêm ${addedCount} hải tặc vào băng! 🏴‍☠️`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Preview avatar khi upload
function previewAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('avatarPreview').innerHTML = 
        `<img src="${e.target.result}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">`;
    };
    reader.readAsDataURL(file);
  }
}

// Hiển thị hải tặc có bounty cao nhất
function showTopPirate() {
  if (pirates.length === 0) {
    alert('Chưa có hải tặc nào trong băng!');
    return;
  }
  
  const topPirate = pirates.reduce((max, p) => p.bounty > max.bounty ? p : max, pirates[0]);
  const rank = getRankByBounty(topPirate.bounty);
  
  // Set ảnh
  const avatarContainer = document.getElementById('wantedAvatar');
  const avatarImg = document.getElementById('wantedAvatarImg');
  
  // Reset container nếu cần
  if (!avatarImg) {
    avatarContainer.innerHTML = '<img src="" alt="Pirate" id="wantedAvatarImg" style="display: none;">';
    avatarImg = document.getElementById('wantedAvatarImg');
  }
  
  if (topPirate.image) {
    avatarImg.src = topPirate.image;
    avatarImg.style.display = 'block';
  } else if (rankImages[rank.type]) {
    avatarImg.src = rankImages[rank.type];
    avatarImg.style.display = 'block';
  } else {
    avatarImg.style.display = 'none';
    // Thêm icon nếu không có ảnh
    const existingIcon = avatarContainer.querySelector('.rank-icon-fallback');
    if (!existingIcon) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'rank-icon-fallback';
      iconDiv.style.fontSize = '120px';
      iconDiv.textContent = rank.icon;
      avatarContainer.appendChild(iconDiv);
    } else {
      existingIcon.textContent = rank.icon;
      existingIcon.style.display = 'block';
    }
  }
  
  // Xóa icon fallback nếu có ảnh
  if (topPirate.image || rankImages[rank.type]) {
    const iconFallback = avatarContainer.querySelector('.rank-icon-fallback');
    if (iconFallback) {
      iconFallback.style.display = 'none';
    }
  }
  
  document.getElementById('wantedName').textContent = topPirate.name;
  document.getElementById('wantedBounty').textContent = formatBounty(topPirate.bounty);
  document.getElementById('wantedRank').textContent = rank.name;
  document.getElementById('wantedRank').style.color = rank.color;
  
  // Hiển thị thông tin băng
  const pirateCrew = crews.find(c => c.name === topPirate.crew) || crews.find(c => c.name === 'No Crew');
  document.getElementById('wantedCrewIcon').textContent = pirateCrew.icon;
  document.getElementById('wantedCrewName').textContent = pirateCrew.name;
  document.getElementById('wantedCrew').style.borderColor = pirateCrew.color;
  
  openModal('wantedModal');
  createConfetti();
}

// In Wanted Poster
function printPoster() {
  // Ẩn nút close và print trước khi in
  const closeBtn = document.querySelector('#wantedModal .close');
  const printBtn = document.querySelector('.print-poster-btn');
  
  closeBtn.style.display = 'none';
  printBtn.style.display = 'none';
  
  // In poster
  window.print();
  
  // Hiện lại sau khi in
  setTimeout(() => {
    closeBtn.style.display = 'block';
    printBtn.style.display = 'block';
  }, 500);
}

// Xử lý upload ảnh cấp độ
function uploadRankImage(rank) {
  document.getElementById(`rank-${rank}-upload`).click();
}

function handleRankUpload(event, rank) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      rankImages[rank] = e.target.result;
      document.getElementById(`rank-${rank}-preview`).innerHTML = 
        `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
      renderPirates();
      saveToLocalStorage();
    };
    reader.readAsDataURL(file);
  }
}

function deleteRankImage(rank) {
  rankImages[rank] = null;
  const defaultIcons = {
    rookie: '👶',
    pirate: '🏴‍☠️',
    rising: '🌠',
    supernova: '⭐',
    warlord: '⚔️',
    general: '🛡️',
    commander: '💪',
    admiral: '🎖️',
    yonko: '👹',
    emperor: '👑',
    legend: '💎',
    mythic: '🔥',
    divine: '⚡',
    demigod: '✨',
    supreme: '🌟'
  };
  document.getElementById(`rank-${rank}-preview`).innerHTML = defaultIcons[rank];
  renderPirates();
  saveToLocalStorage();
}

// Filter tabs
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      renderPirates(filter);
    });
  });
});
