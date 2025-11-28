// DANH SÁCH HẢI TẶC
let pirates = [
  { name: "Gol D. Roger", bounty: 55648, image: null, type: "god", crew: "Roger Pirates" },
  { name: "Whitebeard", bounty: 50464, image: null, type: "god", crew: "Whitebeard Pirates" },
  { name: "Monkey D. Luffy", bounty: 30000, image: null, type: "mythic", crew: "Straw Hat Pirates" },
  { name: "Blackbeard", bounty: 22470, image: null, type: "mythic", crew: "Blackbeard Pirates" },
  { name: "Roronoa Zoro", bounty: 11110, image: null, type: "legend", crew: "Straw Hat Pirates" },
  { name: "Trafalgar Law", bounty: 10500, image: null, type: "legend", crew: "Heart Pirates" },
  { name: "Kaido", bounty: 4611, image: null, type: "yonko", crew: "Beast Pirates" },
  { name: "Big Mom", bounty: 4388, image: null, type: "yonko", crew: "Big Mom Pirates" },
  { name: "Shanks", bounty: 4048, image: null, type: "yonko", crew: "Red Hair Pirates" },
  { name: "Mihawk", bounty: 3590, image: null, type: "yonko", crew: "No Crew" },
  { name: "Sanji", bounty: 1032, image: null, type: "commander", crew: "Straw Hat Pirates" },
  { name: "Jinbe", bounty: 1100, image: null, type: "commander", crew: "Straw Hat Pirates" },
  { name: "Boa Hancock", bounty: 659, image: null, type: "warlord", crew: "Kuja Pirates" },
  { name: "Eustass Kid", bounty: 470, image: null, type: "supernova", crew: "Kid Pirates" },
  { name: "Nami", bounty: 366, image: null, type: "supernova", crew: "Straw Hat Pirates" },
  { name: "Nico Robin", bounty: 130, image: null, type: "pirate", crew: "Straw Hat Pirates" },
  { name: "Franky", bounty: 94, image: null, type: "pirate", crew: "Straw Hat Pirates" },
  { name: "Brook", bounty: 83, image: null, type: "pirate", crew: "Straw Hat Pirates" },
  { name: "Chopper", bounty: 10, image: null, type: "rookie", crew: "Straw Hat Pirates" },
  { name: "Bepo", bounty: 5, image: null, type: "rookie", crew: "Heart Pirates" }
];

// DANH SÁCH BĂNG NHÓM (18 băng thực tế theo One Piece)
let crews = [
  { name: "Straw Hat Pirates", nameVi: "Mũ Rơm", icon: "🏴‍☠️", color: "#e74c3c", captain: "Monkey D. Luffy" },
  { name: "Roger Pirates", nameVi: "Roger", icon: "👑", color: "#f1c40f", captain: "Gol D. Roger" },
  { name: "Whitebeard Pirates", nameVi: "Râu Trắng", icon: "⚔️", color: "#95a5a6", captain: "Edward Newgate" },
  { name: "Blackbeard Pirates", nameVi: "Râu Đen", icon: "💀", color: "#2c3e50", captain: "Marshall D. Teach" },
  { name: "Heart Pirates", nameVi: "Trái Tim", icon: "❤️", color: "#3498db", captain: "Trafalgar D. Water Law" },
  { name: "Beast Pirates", nameVi: "Bách Thú", icon: "🐉", color: "#9b59b6", captain: "Kaido" },
  { name: "Big Mom Pirates", nameVi: "Big Mom", icon: "🎂", color: "#e91e63", captain: "Charlotte Linlin" },
  { name: "Red Hair Pirates", nameVi: "Tóc Đỏ", icon: "💥", color: "#c0392b", captain: "Shanks" },
  { name: "Kid Pirates", nameVi: "Kid", icon: "🧠", color: "#d35400", captain: "Eustass Kid" },
  { name: "Kuja Pirates", nameVi: "Kuja", icon: "🐍", color: "#8e44ad", captain: "Boa Hancock" },
  { name: "Donquixote Pirates", nameVi: "Doflamingo", icon: "🦩", color: "#ff1493", captain: "Donquixote Doflamingo" },
  { name: "Baroque Works", nameVi: "Baroque Works", icon: "🎭", color: "#d4af37", captain: "Crocodile" },
  { name: "Arlong Pirates", nameVi: "Arlong", icon: "🦈", color: "#1e90ff", captain: "Arlong" },
  { name: "Buggy Pirates", nameVi: "Buggy", icon: "🤡", color: "#ff6347", captain: "Buggy" },
  { name: "Krieg Pirates", nameVi: "Don Krieg", icon: "⚙️", color: "#708090", captain: "Don Krieg" },
  { name: "Hawkins Pirates", nameVi: "Hawkins", icon: "🎴", color: "#dda0dd", captain: "Basil Hawkins" },
  { name: "Bonney Pirates", nameVi: "Bonney", icon: "🍕", color: "#ff69b4", captain: "Jewelry Bonney" },
  { name: "Drake Pirates", nameVi: "X Drake", icon: "🦖", color: "#8b4513", captain: "X Drake" },
  { name: "No Crew", nameVi: "Độc Lập", icon: "⚖️", color: "#7f8c8d", captain: "Independent" }
];

// Lưu ảnh cấp độ mặc định
let rankImages = {
  rookie: null,       // 0-79
  pirate: null,       // 80-179
  rising: null,       // 180-349
  supernova: null,    // 350-599
  warlord: null,      // 600-999
  general: null,      // 1000-1999
  commander: null,    // 2000-3999
  admiral: null,      // 4000-7999
  yonko: null,        // 8000-14999
  emperor: null,      // 15000-24999
  legend: null,       // 25000-49999
  mythic: null,       // 50000-99999
  divine: null,       // 100000-249999
  demigod: null,      // 250000-499999
  supreme: null       // 500000+
};

// Lưu ảnh băng nhóm
let crewImages = {};

// Hàm xác định cấp độ dựa trên bounty
function getRankByBounty(bounty) {
  if (bounty >= 500000) return { 
    type: 'supreme', 
    name: 'Chí Tôn', 
    icon: '🌟',
    color: '#ffffff',
    minBounty: 500000
  };
  if (bounty >= 250000) return { 
    type: 'demigod', 
    name: 'Bán Thần', 
    icon: '✨',
    color: '#e8daef',
    minBounty: 250000
  };
  if (bounty >= 100000) return { 
    type: 'divine', 
    name: 'Thần Thoại', 
    icon: '⚡',
    color: '#9b59b6',
    minBounty: 100000
  };
  if (bounty >= 50000) return { 
    type: 'mythic', 
    name: 'Huyền Thoại', 
    icon: '🔥',
    color: '#e74c3c',
    minBounty: 50000
  };
  if (bounty >= 25000) return { 
    type: 'legend', 
    name: 'Truyền Thuyết', 
    icon: '💎',
    color: '#3498db',
    minBounty: 25000
  };
  if (bounty >= 15000) return { 
    type: 'emperor', 
    name: 'Đế Vương', 
    icon: '👑',
    color: '#f1c40f',
    minBounty: 15000
  };
  if (bounty >= 8000) return { 
    type: 'yonko', 
    name: 'Tứ Hoàng', 
    icon: '👹',
    color: '#c0392b',
    minBounty: 8000
  };
  if (bounty >= 4000) return { 
    type: 'admiral', 
    name: 'Đô Đốc', 
    icon: '🎖️',
    color: '#d35400',
    minBounty: 4000
  };
  if (bounty >= 2000) return { 
    type: 'commander', 
    name: 'Tư Lệnh', 
    icon: '💪',
    color: '#e67e22',
    minBounty: 2000
  };
  if (bounty >= 1000) return { 
    type: 'general', 
    name: 'Đại Tướng', 
    icon: '🛡️',
    color: '#16a085',
    minBounty: 1000
  };
  if (bounty >= 600) return { 
    type: 'warlord', 
    name: 'Thất Vũ Hải', 
    icon: '⚔️',
    color: '#8e44ad',
    minBounty: 600
  };
  if (bounty >= 350) return { 
    type: 'supernova', 
    name: 'Siêu Tân Tinh', 
    icon: '⭐',
    color: '#f39c12',
    minBounty: 350
  };
  if (bounty >= 180) return { 
    type: 'rising', 
    name: 'Tân Tinh', 
    icon: '🌠',
    color: '#3498db',
    minBounty: 180
  };
  if (bounty >= 80) return { 
    type: 'pirate', 
    name: 'Hải Tặc', 
    icon: '🏴‍☠️',
    color: '#3498db',
    minBounty: 80
  };
  if (bounty >= 0) return { 
    type: 'rookie', 
    name: 'Tân Binh', 
    icon: '👶',
    color: '#95a5a6',
    minBounty: 0
  };
  return { 
    type: 'prisoner', 
    name: 'Tù Nhân', 
    icon: '⛓️',
    color: '#7f8c8d',
    minBounty: -Infinity
  };
}

// Format số bounty
function formatBounty(bounty) {
  if (bounty >= 1000000) {
    return (bounty / 1000000).toFixed(1) + 'M';
  }
  if (bounty >= 1000) {
    return (bounty / 1000).toFixed(1) + 'K';
  }
  return bounty.toString();
}

// Filter by bounty range using combobox
function filterByBounty(range) {
  renderPirates(range);
}

// Render hải tặc
function renderPirates(filter = 'all') {
  const grid = document.getElementById("pirateGrid");
  grid.innerHTML = "";

  let filteredPirates = pirates;
  
  // Filter by crew
  if (currentCrewFilter !== 'all') {
    filteredPirates = filteredPirates.filter(p => p.crew === currentCrewFilter);
  }
  
  // Filter by search
  if (searchQuery) {
    filteredPirates = filteredPirates.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Filter by bounty range
  if (filter !== 'all') {
    filteredPirates = filteredPirates.filter(p => {
      if (filter === '0-79') return p.bounty < 80;
      if (filter === '80-179') return p.bounty >= 80 && p.bounty < 180;
      if (filter === '180-349') return p.bounty >= 180 && p.bounty < 350;
      if (filter === '350-599') return p.bounty >= 350 && p.bounty < 600;
      if (filter === '600-999') return p.bounty >= 600 && p.bounty < 1000;
      if (filter === '1000-1999') return p.bounty >= 1000 && p.bounty < 2000;
      if (filter === '2000-3999') return p.bounty >= 2000 && p.bounty < 4000;
      if (filter === '4000-7999') return p.bounty >= 4000 && p.bounty < 8000;
      if (filter === '8000-14999') return p.bounty >= 8000 && p.bounty < 15000;
      if (filter === '15000-24999') return p.bounty >= 15000 && p.bounty < 25000;
      if (filter === '25000-49999') return p.bounty >= 25000 && p.bounty < 50000;
      if (filter === '50000-99999') return p.bounty >= 50000 && p.bounty < 100000;
      if (filter === '100000-249999') return p.bounty >= 100000 && p.bounty < 250000;
      if (filter === '250000-499999') return p.bounty >= 250000 && p.bounty < 500000;
      if (filter === '500000+') return p.bounty >= 500000;
      return true;
    });
  }

  // Sắp xếp theo bounty giảm dần
  filteredPirates.sort((a, b) => b.bounty - a.bounty);

  filteredPirates.forEach((p, index) => {
    const realIndex = pirates.indexOf(p);
    const rank = getRankByBounty(p.bounty);
    const avatarContent = p.image ? 
      `<img src="${p.image}" alt="${p.name}">` : 
      (rankImages[rank.type] ? `<img src="${rankImages[rank.type]}" alt="${rank.name}">` : rank.icon);

    const card = document.createElement("div");
    card.className = "card " + rank.type;
    const crewInfo = crews.find(c => c.name === p.crew) || crews[crews.length - 1];
    
    card.innerHTML = `
      <div class="card-icon">${rank.icon}</div>
      <div class="avatar" onclick="changeAvatar(${realIndex})" style="cursor: pointer;" title="Nhấn để đổi ảnh đại diện">${avatarContent}</div>
      <input type="file" id="avatar-input-${realIndex}" accept="image/*" style="display: none;" onchange="handleAvatarUpload(event, ${realIndex})">
      <div class="name">${p.name}</div>
      <div style="text-align: center;">
        <div class="crew-badge" style="background: ${crewInfo.color}; color: white; padding: 5px 12px; border-radius: 12px; font-size: 13px; font-weight: 900; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          ${crewImages[crewInfo.name] ? `<img src="${crewImages[crewInfo.name]}" style="width: 20px; height: 20px; border-radius: 50%; object-fit: cover;">` : crewInfo.icon} ${crewInfo.name}
        </div>
      </div>
      <div class="role" style="color: ${rank.color}; font-size: 16px; font-weight: bold;">${rank.name}</div>
      <div class="bounty">
        <span id="bounty-${realIndex}">${formatBounty(p.bounty)}</span>฿
      </div>
      <div class="actions">
        <button class="btn btn-plus" onclick="changeBounty(${realIndex}, 10)">+10</button>
        <button class="btn btn-plus" onclick="changeBounty(${realIndex}, 50)">+50</button>
        <button class="btn btn-plus-large" onclick="changeBounty(${realIndex}, 100)">+100</button>
        <button class="btn btn-minus" onclick="changeBounty(${realIndex}, -10)">-10</button>
        <button class="btn btn-minus" onclick="changeBounty(${realIndex}, -50)">-50</button>
        <button class="btn btn-delete" onclick="deletePirate(${realIndex})">🗑️</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Format số bounty
function changeBounty(index, delta) {
  const oldRank = getRankByBounty(pirates[index].bounty);
  pirates[index].bounty += delta;
  const newRank = getRankByBounty(pirates[index].bounty);
  
  // Cập nhật type khi thăng hạng
  if (oldRank.type !== newRank.type) {
    pirates[index].type = newRank.type;
    
    // Hiệu ứng thăng hạng
    if (pirates[index].bounty > oldRank.minBounty) {
      showRankUpEffect(pirates[index].name, newRank.name);
    }
  }
  
  renderPirates();
  saveToLocalStorage();
}

// Hiệu ứng thăng hạng
function showRankUpEffect(name, rankName) {
  const notification = document.createElement('div');
  notification.className = 'rank-up-notification';
  notification.innerHTML = `
    <div class="rank-up-content">
      🎉 <strong>${name}</strong> đã thăng cấp lên <strong>${rankName}</strong>! 🎉
    </div>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 500);
  }, 5000);
}

// Xóa hải tặc
function deletePirate(index) {
  if (confirm(`Bạn có chắc muốn xóa ${pirates[index].name} khỏi băng?`)) {
    pirates.splice(index, 1);
    renderPirates();
    saveToLocalStorage();
  }
}

// Đổi avatar
function changeAvatar(index) {
  const fileInput = document.getElementById(`avatar-input-${index}`);
  if (fileInput) {
    fileInput.click();
  }
}

// Xử lý upload avatar
function handleAvatarUpload(event, index) {
  const file = event.target.files[0];
  if (!file) return;

  // Kiểm tra file là ảnh
  if (!file.type.startsWith('image/')) {
    alert('Vui lòng chọn file ảnh!');
    return;
  }

  // Kiểm tra kích thước file (giới hạn 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Kích thước ảnh không được vượt quá 5MB!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    pirates[index].image = e.target.result;
    renderPirates();
    saveToLocalStorage();
    
    // Hiển thị thông báo
    showNotification(`🖼️ Đã cập nhật ảnh đại diện cho ${pirates[index].name}!`);
  };
  reader.readAsDataURL(file);
}

// Crew Filter
let currentCrewFilter = 'all';
let searchQuery = '';

// Populate crew filter dropdown
function populateCrewFilter() {
  const select = document.getElementById('crewFilter');
  if (!select) return;
  
  // Lưu giá trị hiện tại
  const currentValue = select.value;
  
  // Clear và thêm option mặc định
  select.innerHTML = '<option value="all">TẤT CẢ</option>';
  
  // Thêm các crew từ danh sách
  crews.forEach(crew => {
    const option = document.createElement('option');
    option.value = crew.name;
    option.textContent = `${crew.name} (${crew.nameVi})`;
    select.appendChild(option);
  });
  
  // Khôi phục giá trị
  select.value = currentValue || 'all';
}

function filterByCrew(crewName) {
  currentCrewFilter = crewName;
  
  // Update active state
  document.querySelectorAll('.crew-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('data-crew') === crewName) {
      tab.classList.add('active');
    }
  });
  
  // Use renderPirates to maintain consistency
  renderPirates();
  
  // Show crew stats
  if (crewName !== 'all') {
    const crewPirates = pirates.filter(p => p.crew === crewName);
    const totalBounty = crewPirates.reduce((sum, p) => sum + p.bounty, 0);
    const avgBounty = crewPirates.length > 0 ? Math.round(totalBounty / crewPirates.length) : 0;
    
    console.log(`🏴‍☠️ ${crewName}:`, {
      members: crewPirates.length,
      totalBounty: formatBounty(totalBounty) + '฿',
      avgBounty: formatBounty(avgBounty) + '฿'
    });
  }
}

// Search function
function searchPirates(query) {
  searchQuery = query;
  renderPirates();
}

// Local Storage
function saveToLocalStorage() {
  localStorage.setItem('onePiecePirates', JSON.stringify(pirates));
  localStorage.setItem('onePieceRankImages', JSON.stringify(rankImages));
}

// Export dữ liệu ra file JSON
function exportData() {
  const data = {
    pirates: pirates,
    rankImages: rankImages,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `one-piece-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  alert('✅ Đã xuất dữ liệu thành công!');
}

// Import dữ liệu từ file JSON
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      
      if (!data.pirates || !Array.isArray(data.pirates)) {
        alert('❌ File không đúng định dạng!');
        return;
      }
      
      const confirm = window.confirm(
        `📥 Bạn có muốn nhập dữ liệu này không?\n\n` +
        `🏴‍☠️ Số hải tặc: ${data.pirates.length}\n` +
        `📅 Ngày xuất: ${data.exportDate ? new Date(data.exportDate).toLocaleString('vi-VN') : 'Không rõ'}\n\n` +
        `⚠️ Dữ liệu hiện tại sẽ bị thay thế!`
      );
      
      if (confirm) {
        pirates = data.pirates;
        if (data.rankImages) {
          rankImages = data.rankImages;
        }
        saveToLocalStorage();
        renderPirates();
        alert('✅ Đã nhập dữ liệu thành công!');
        location.reload(); // Reload để cập nhật UI
      }
    } catch (error) {
      alert('❌ Lỗi đọc file: ' + error.message);
    }
  };
  reader.readAsText(file);
  
  // Reset input để có thể import lại cùng file
  event.target.value = '';
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('onePiecePirates');
  const savedRanks = localStorage.getItem('onePieceRankImages');
  const savedCrewImages = localStorage.getItem('onePieceCrewImages');
  const savedCrews = localStorage.getItem('onePieceCrews');
  
  if (saved) {
    pirates = JSON.parse(saved);
  }
  if (savedRanks) {
    rankImages = JSON.parse(savedRanks);
    // Cập nhật preview
    Object.keys(rankImages).forEach(rank => {
      if (rankImages[rank]) {
        const previewElement = document.getElementById(`rank-${rank}-preview`);
        if (previewElement) {
          previewElement.innerHTML = 
            `<img src="${rankImages[rank]}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        }
      }
    });
  }
  if (savedCrewImages) {
    crewImages = JSON.parse(savedCrewImages);
  }
  if (savedCrews) {
    const loadedCrews = JSON.parse(savedCrews);
    // Merge nameVi từ default crews vào loaded crews
    crews = loadedCrews.map(loadedCrew => {
      const defaultCrew = [
        { name: "Straw Hat Pirates", nameVi: "Mũ Rơm" },
        { name: "Roger Pirates", nameVi: "Roger" },
        { name: "Whitebeard Pirates", nameVi: "Râu Trắng" },
        { name: "Blackbeard Pirates", nameVi: "Râu Đen" },
        { name: "Heart Pirates", nameVi: "Trái Tim" },
        { name: "Beast Pirates", nameVi: "Bách Thú" },
        { name: "Big Mom Pirates", nameVi: "Big Mom" },
        { name: "Red Hair Pirates", nameVi: "Tóc Đỏ" },
        { name: "Kid Pirates", nameVi: "Kid" },
        { name: "Kuja Pirates", nameVi: "Kuja" },
        { name: "Donquixote Pirates", nameVi: "Doflamingo" },
        { name: "Baroque Works", nameVi: "Baroque Works" },
        { name: "Arlong Pirates", nameVi: "Arlong" },
        { name: "Buggy Pirates", nameVi: "Buggy" },
        { name: "Krieg Pirates", nameVi: "Don Krieg" },
        { name: "Hawkins Pirates", nameVi: "Hawkins" },
        { name: "Bonney Pirates", nameVi: "Bonney" },
        { name: "Drake Pirates", nameVi: "X Drake" },
        { name: "No Crew", nameVi: "Độc Lập" }
      ].find(d => d.name === loadedCrew.name);
      return { ...loadedCrew, nameVi: loadedCrew.nameVi || (defaultCrew ? defaultCrew.nameVi : loadedCrew.name) };
    });
  }
}
