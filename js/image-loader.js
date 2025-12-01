// Auto-detect và load ảnh từ thư mục img/
const rankImageFiles = {
  rookie: ['rookie'],
  pirate: ['pirate'],
  rising: ['rising'],
  supernova: ['supernova'],
  warlord: ['warlord'],
  general: ['general'],
  commander: ['commander'],
  admiral: ['admiral'],
  yonko: ['yonko'],
  emperor: ['emperor'],
  legend: ['legend'],
  mythic: ['mythic'],
  divine: ['divine'],
  demigod: ['demigod'],
  supreme: ['supreme']
};

// Chỉ thử các extension phổ biến nhất
const imageExtensions = ['png', 'jpg', 'webp'];

// Thử load ảnh với timeout ngắn
async function tryLoadImage(rankType, fileName, extension) {
  return new Promise((resolve) => {
    const img = new Image();
    const path = `img/${fileName}.${extension}`;
    
    // Timeout rất ngắn để load nhanh
    const timeout = setTimeout(() => {
      resolve(null);
    }, 100);
    
    img.onload = function() {
      clearTimeout(timeout);
      resolve(path);
    };
    
    img.onerror = function() {
      clearTimeout(timeout);
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

// Load tất cả ảnh rank khi khởi động (chỉ nếu chưa có trong localStorage)
async function loadAllRankImages() {
  // Kiểm tra xem đã load chưa
  const alreadyLoaded = localStorage.getItem('rankImagesLoaded');
  if (alreadyLoaded && Object.keys(rankImages).length > 0) {
    console.log('✅ Rank images already cached');
    return;
  }
  
  console.log('🔍 Auto-detecting rank images...');
  
  for (const rankType of Object.keys(rankImageFiles)) {
    const imagePath = await autoDetectRankImage(rankType);
    
    if (imagePath) {
      // Convert sang base64 để lưu vào localStorage
      try {
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
      } catch (error) {
        console.warn(`Failed to load ${imagePath}:`, error);
      }
    }
  }
  
  localStorage.setItem('rankImagesLoaded', 'true');
  console.log('✅ Rank image detection complete!');
}
