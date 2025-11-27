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

// Lưu ảnh cấp độ mặc định
let rankImages = {
  rookie: null,       // 0-29
  pirate: null,       // 30-99
  rising: null,       // 100-299
  supernova: null,    // 300-499
  warlord: null,      // 500-799
  general: null,      // 800-999
  commander: null,    // 1000-2499
  admiral: null,      // 2500-3999
  yonko: null,        // 4000-5999
  emperor: null,      // 6000-9999
  legend: null,       // 10000-19999
  mythic: null,       // 20000-39999
  divine: null,       // 40000-69999
  demigod: null,      // 70000-99999
  supreme: null       // 100000+
};

// Hàm xác định cấp độ dựa trên bounty
function getRankByBounty(bounty) {
  if (bounty >= 100000) return { 
    type: 'supreme', 
    name: 'Chí Tôn', 
    icon: '🌟',
    color: '#ffffff',
    minBounty: 100000
  };
  if (bounty >= 70000) return { 
    type: 'demigod', 
    name: 'Bán Thần', 
    icon: '✨',
    color: '#e8daef',
    minBounty: 70000
  };
  if (bounty >= 40000) return { 
    type: 'divine', 
    name: 'Thần Thoại', 
    icon: '⚡',
    color: '#9b59b6',
    minBounty: 40000
  };
  if (bounty >= 20000) return { 
    type: 'mythic', 
    name: 'Huyền Thoại', 
    icon: '🔥',
    color: '#e74c3c',
    minBounty: 20000
  };
  if (bounty >= 10000) return { 
    type: 'legend', 
    name: 'Truyền Thuyết', 
    icon: '💎',
    color: '#3498db',
    minBounty: 10000
  };
  if (bounty >= 6000) return { 
    type: 'emperor', 
    name: 'Đế Vương', 
    icon: '👑',
    color: '#f1c40f',
    minBounty: 6000
  };
  if (bounty >= 4000) return { 
    type: 'yonko', 
    name: 'Tứ Hoàng', 
    icon: '👹',
    color: '#c0392b',
    minBounty: 4000
  };
  if (bounty >= 2500) return { 
    type: 'admiral', 
    name: 'Đô Đốc', 
    icon: '🎖️',
    color: '#d35400',
    minBounty: 2500
  };
  if (bounty >= 1000) return { 
    type: 'commander', 
    name: 'Tư Lệnh', 
    icon: '💪',
    color: '#e67e22',
    minBounty: 1000
  };
  if (bounty >= 800) return { 
    type: 'general', 
    name: 'Đại Tướng', 
    icon: '🛡️',
    color: '#16a085',
    minBounty: 800
  };
  if (bounty >= 500) return { 
    type: 'warlord', 
    name: 'Thất Vũ Hải', 
    icon: '⚔️',
    color: '#8e44ad',
    minBounty: 500
  };
  if (bounty >= 300) return { 
    type: 'supernova', 
    name: 'Siêu Tân Tinh', 
    icon: '⭐',
    color: '#f39c12',
    minBounty: 300
  };
  if (bounty >= 100) return { 
    type: 'rising', 
    name: 'Tân Tinh', 
    icon: '🌠',
    color: '#3498db',
    minBounty: 100
  };
  if (bounty >= 30) return { 
    type: 'pirate', 
    name: 'Hải Tặc', 
    icon: '🏴‍☠️',
    color: '#3498db',
    minBounty: 30
  };
  return { 
    type: 'rookie', 
    name: 'Tân Binh', 
    icon: '👶',
    color: '#95a5a6',
    minBounty: 0
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

// Render hải tặc
function renderPirates(filter = 'all') {
  const grid = document.getElementById("pirateGrid");
  grid.innerHTML = "";

  let filteredPirates = pirates;
  
  if (filter !== 'all') {
    filteredPirates = pirates.filter(p => {
      if (filter === '0-29') return p.bounty < 30;
      if (filter === '30-99') return p.bounty >= 30 && p.bounty < 100;
      if (filter === '100-299') return p.bounty >= 100 && p.bounty < 300;
      if (filter === '300-499') return p.bounty >= 300 && p.bounty < 500;
      if (filter === '500-799') return p.bounty >= 500 && p.bounty < 800;
      if (filter === '800-999') return p.bounty >= 800 && p.bounty < 1000;
      if (filter === '1000-2499') return p.bounty >= 1000 && p.bounty < 2500;
      if (filter === '2500-3999') return p.bounty >= 2500 && p.bounty < 4000;
      if (filter === '4000-5999') return p.bounty >= 4000 && p.bounty < 6000;
      if (filter === '6000-9999') return p.bounty >= 6000 && p.bounty < 10000;
      if (filter === '10000-19999') return p.bounty >= 10000 && p.bounty < 20000;
      if (filter === '20000-39999') return p.bounty >= 20000 && p.bounty < 40000;
      if (filter === '40000-69999') return p.bounty >= 40000 && p.bounty < 70000;
      if (filter === '70000-99999') return p.bounty >= 70000 && p.bounty < 100000;
      if (filter === '100000+') return p.bounty >= 100000;
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
      <div class="avatar">${avatarContent}</div>
      <div class="name">${p.name}</div>
      <div class="crew-badge" style="background: ${crewInfo.color}; color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 900; margin: 8px auto; display: inline-block; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
        ${crewInfo.icon} ${crewInfo.name}
      </div>
      <div class="role" style="color: ${rank.color}">${rank.name}</div>
      <div class="bounty">
        <span id="bounty-${realIndex}">${formatBounty(p.bounty)}</span>฿
      </div>
      <div class="actions">
        <button class="btn btn-plus" onclick="changeBounty(${realIndex}, 10)">+10</button>
        <button class="btn btn-plus-large" onclick="changeBounty(${realIndex}, 100)">+100</button>
        <button class="btn btn-minus" onclick="changeBounty(${realIndex}, -10)">-10</button>
        <button class="btn btn-delete" onclick="deletePirate(${realIndex})">🗑️</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Thay đổi bounty
function changeBounty(index, delta) {
  const oldRank = getRankByBounty(pirates[index].bounty);
  pirates[index].bounty = Math.max(0, pirates[index].bounty + delta);
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

// Crew Filter
let currentCrewFilter = 'all';

function filterByCrew(crewName) {
  currentCrewFilter = crewName;
  
  // Update active state
  document.querySelectorAll('.crew-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('data-crew') === crewName) {
      tab.classList.add('active');
    }
  });
  
  // Filter pirates
  const grid = document.getElementById("pirateGrid");
  grid.innerHTML = "";
  
  let filteredPirates = crewName === 'all' ? pirates : pirates.filter(p => p.crew === crewName);
  
  // Sort by bounty
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
      <div class="avatar">${avatarContent}</div>
      <div class="name">${p.name}</div>
      <div class="crew-badge" style="background: ${crewInfo.color}; color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 900; margin: 8px auto; display: inline-block; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
        ${crewInfo.icon} ${crewInfo.name}
      </div>
      <div class="role" style="color: ${rank.color}">${rank.name}</div>
      <div class="bounty">
        <span id="bounty-${realIndex}">${formatBounty(p.bounty)}</span>฿
      </div>
      <div class="actions">
        <button class="btn btn-plus" onclick="changeBounty(${realIndex}, 10)">+10</button>
        <button class="btn btn-plus-large" onclick="changeBounty(${realIndex}, 100)">+100</button>
        <button class="btn btn-minus" onclick="changeBounty(${realIndex}, -10)">-10</button>
        <button class="btn btn-delete" onclick="deletePirate(${realIndex})">🗑️</button>
      </div>
    `;
    grid.appendChild(card);
  });
  
  // Show crew stats
  if (crewName !== 'all') {
    const crewPirates = filteredPirates;
    const totalBounty = crewPirates.reduce((sum, p) => sum + p.bounty, 0);
    const avgBounty = crewPirates.length > 0 ? Math.round(totalBounty / crewPirates.length) : 0;
    
    console.log(`🏴‍☠️ ${crewName}:`, {
      members: crewPirates.length,
      totalBounty: formatBounty(totalBounty) + '฿',
      avgBounty: formatBounty(avgBounty) + '฿'
    });
  }
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
}
