# 🏴‍☠️ ONE PIECE BOUNTY HUNTER SYSTEM

Hệ thống quản lý hải tặc với tiền truy nã theo phong cách One Piece.

## 📊 Hệ thống 7 cấp độ

| Cấp Độ | Tiền Truy Nã | Icon | Màu sắc |
|--------|--------------|------|---------|
| 👶 Tân Binh | 0-99฿ | 👶 | Xám (#95a5a6) |
| 🏴‍☠️ Hải Tặc | 100-499฿ | 🏴‍☠️ | Xanh (#3498db) |
| ⭐ Siêu Tân Tinh | 500-999฿ | ⭐ | Cam (#f39c12) |
| ⚔️ Thất Vũ Hải | 1K-2.9K฿ | ⚔️ | Tím (#9b59b6) |
| 💪 Tứ Hoàng Phó | 3K-4.9K฿ | 💪 | Đỏ nhạt (#e74c3c) |
| 👹 Tứ Hoàng | 5K-9.9K฿ | 👹 | Đỏ đậm (#c0392b) |
| 👑 Vua Hải Tặc | 10K+฿ | 👑 | Vàng (#f1c40f) |

## 🎮 Chức năng

### 1. Thêm Hải Tặc
- Nhập tên hải tặc
- Upload ảnh đại diện (tùy chọn)
- Mặc định bắt đầu ở cấp Tân Binh (0฿)

### 2. Quản lý Bounty
- **+10฿**: Tăng nhẹ tiền truy nã
- **+100฿**: Tăng mạnh tiền truy nã
- **-10฿**: Giảm tiền truy nã
- Tự động format: 100฿ → 1.5K฿ → 10M฿

### 3. Wanted Poster
- Hiển thị hải tặc có bounty cao nhất
- Thiết kế poster vintage như trong truyện
- Hiệu ứng confetti với emoji cướp biển

### 4. Cài Đặt Ảnh Cấp Độ
- Upload ảnh mặc định cho từng cấp độ
- Áp dụng tự động khi hải tặc thăng cấp
- Lưu vào LocalStorage

### 5. Lọc theo cấp độ
- 8 tab filter: Tất cả + 7 cấp độ
- Click để xem từng nhóm hải tặc
- Tự động sắp xếp theo bounty

## 🎨 Giao diện

### Theme màu sắc
- **Nền**: Gradient xanh đen đại dương (#1a1a2e → #0f3460)
- **Header**: Gradient đỏ/cam (#c0392b → #e67e22)
- **Accent**: Cam vàng (#f39c12)
- **Cards**: Gradient xanh đen với viền màu theo cấp độ

### Hiệu ứng
- ✨ Confetti với emoji cướp biển (⭐🏴‍☠️)
- 🎯 Rank-up notification khi thăng cấp
- 💫 Shimmer và glow effects
- 🌊 Background animation đại dương
- 🎪 Bounce, float, pulse animations

## 📁 Cấu trúc file

```
one-piece/
├── index.html              # File chính
├── css/
│   ├── styles.css         # Base styles & theme
│   ├── header.css         # Header với gradient đỏ/cam
│   ├── filters.css        # 8 filter tabs
│   ├── cards.css          # Pirate cards
│   ├── modal.css          # Modal base
│   ├── wanted.css         # Wanted poster style
│   ├── rank-settings.css  # Settings grid
│   └── effects.css        # Animations
└── js/
    ├── pirates.js         # Dữ liệu & logic
    ├── modals.js          # Modal handlers
    ├── effects.js         # Visual effects
    └── app.js             # Initialization
```

## 💾 Lưu trữ dữ liệu

### LocalStorage Keys
- `onePiecePirates`: Danh sách hải tặc
- `onePieceRankImages`: Ảnh cấp độ custom

### Cấu trúc dữ liệu Pirate
```javascript
{
  name: "Monkey D. Luffy",
  bounty: 3000,           // Tiền truy nã
  image: "base64...",     // Ảnh đại diện (nullable)
  type: "commander"       // Loại cấp độ hiện tại
}
```

## 🚀 Cách sử dụng

1. **Mở file**: Double click `index.html`
2. **Thêm hải tặc**: Click "👤 Thêm Hải Tặc"
3. **Tăng bounty**: Dùng nút +10 hoặc +100
4. **Xem top**: Click "🎯 Truy Nã Gắt"
5. **Cài đặt**: Click "🏴‍☠️ Cài Đặt Cấp Độ"

## 🎯 Mẹo sử dụng

- Bounty càng cao, card càng có hiệu ứng đẹp
- King rank (10K+) có animation glow đặc biệt
- Upload ảnh rank để tự động thay avatar khi thăng cấp
- Filter giúp quản lý khi có nhiều hải tặc
- Dữ liệu tự động lưu sau mỗi thay đổi

## 🔧 Tùy chỉnh

### Thay đổi cấp độ bounty
Sửa trong `js/pirates.js` → function `getRankByBounty()`

### Thêm hiệu ứng
Thêm animation vào `css/effects.css`

### Thay icon
Sửa icon trong `getRankByBounty()` hoặc upload ảnh mới

## 📝 Ghi chú

- **Responsive**: Hoạt động tốt trên mobile/tablet
- **No server needed**: Chạy trực tiếp HTML
- **Browser**: Chrome, Firefox, Edge, Safari
- **LocalStorage limit**: ~5-10MB (đủ cho hàng nghìn hải tặc)

---

**🏴‍☠️ Set sail for the Grand Line! 🏴‍☠️**
