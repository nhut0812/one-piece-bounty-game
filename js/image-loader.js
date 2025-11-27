// Auto-detect và load ảnh từ thư mục img/
const rankImageFiles = {
  rookie: ['rookie', 'tan-binh', 'newbie', 'beginner'],
  pirate: ['pirate', 'hai-tac', 'buccaneer'],
  rising: ['rising', 'tan-tinh', 'rising-star'],
  supernova: ['supernova', 'sieu-tan-tinh', 'nova', 'rookie-11'],
  warlord: ['warlord', 'that-vu-hai', 'shichibukai'],
  general: ['general', 'dai-tuong', 'commander'],
  commander: ['commander', 'tu-lenh', 'captain'],
  admiral: ['admiral', 'do-doc', 'fleet-admiral'],
  yonko: ['yonko', 'tu-hoang', 'four-emperors'],
  emperor: ['emperor', 'de-vuong', 'king', 'sovereign'],
  legend: ['legend', 'truyen-thuyet', 'legendary'],
  mythic: ['mythic', 'huyen-thoai', 'myth'],
  divine: ['divine', 'than-thoai', 'deity'],
  demigod: ['demigod', 'ban-than', 'semi-god'],
  supreme: ['supreme', 'chi-ton', 'ultimate', 'god-king']
};

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

// Thử load ảnh với nhiều tên file và extension khác nhau
async function tryLoadImage(rankType, fileName, extension) {
  return new Promise((resolve) => {
    const img = new Image();
    const path = `img/${fileName}.${extension}`;
    
    img.onload = function() {
      console.log(`✅ Loaded: ${path} for rank ${rankType}`);
      resolve(path);
    };
    
    img.onerror = function() {
      resolve(null);
    };
    
    img.src = path;
  });
}

// Auto-detect ảnh cho một rank cụ thể
async function autoDetectRankImage(rankType) {
  const possibleNames = rankImageFiles[rankType];
  
  for (const name of possibleNames) {
    for (const ext of imageExtensions) {
      const imagePath = await tryLoadImage(rankType, name, ext);
      if (imagePath) {
        return imagePath;
      }
    }
  }
  
  return null;
}

// Load tất cả ảnh rank khi khởi động
async function loadAllRankImages() {
  console.log('🔍 Auto-detecting rank images...');
  
  for (const rankType of Object.keys(rankImageFiles)) {
    const imagePath = await autoDetectRankImage(rankType);
    
    if (imagePath) {
      // Convert sang base64 để lưu vào localStorage
      const response = await fetch(imagePath);
      const blob = await response.blob();
      
      const reader = new FileReader();
      reader.onloadend = function() {
        rankImages[rankType] = reader.result;
        
        // Update preview trong settings modal
        const previewElement = document.getElementById(`rank-${rankType}-preview`);
        if (previewElement) {
          previewElement.innerHTML = 
            `<img src="${reader.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        }
        
        saveToLocalStorage();
        renderPirates();
      };
      reader.readAsDataURL(blob);
    }
  }
  
  console.log('✅ Rank image detection complete!');
}
