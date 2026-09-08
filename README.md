# One Piece Bounty Game

Web game học tập cá nhân theo chủ đề One Piece. Học sinh làm nhiệm vụ, trả lời quiz, nhận bounty, mở khóa đảo, đánh boss và đổi phần thưởng.

## Chạy nhanh

Không cần build.

```bash
python3 -m http.server 8000
```

Mở: http://localhost:8000/index.html

Có thể mở trực tiếp `index.html`, nhưng chạy HTTP server ổn định hơn với Firebase và upload ảnh.

## Chạy online bằng GitHub Pages

1. Push repository lên GitHub branch `main`.
2. Vào **Settings → Pages**.
3. Chọn **Deploy from a branch**.
4. Chọn branch `main` và thư mục `/root`.
5. Mở URL GitHub Pages được cung cấp.

GitHub Pages chỉ phục vụ giao diện. Dữ liệu dùng chung nhiều máy cần Firebase Realtime Database. Firebase config nằm trong `js/firebase-config.js`.

## Các trang

### `index.html` - Trang chính

- Danh sách pirate và bounty.
- Tìm kiếm pirate.
- Lọc theo băng nhóm.
- Lọc theo cấp bounty.
- Cộng/trừ bounty nhanh.
- Thêm một hoặc nhiều pirate.
- Công điểm hàng loạt.
- Xem pirate có bounty cao nhất.
- In Wanted Poster.
- Upload và đổi avatar.
- Cài ảnh mặc định theo cấp độ.
- Đăng nhập/đăng xuất.
- Hiển thị nhanh streak và bounty của học sinh.
- Nút truy cập nhanh nhiệm vụ ngày và Quiz nhanh.
- Firebase Sync bật mặc định trên thiết bị mới.

### `admin.html` - Trang quản trị

#### Quản lý pirate

- Thêm, sửa, xóa pirate.
- Gán băng nhóm.
- Chỉnh bounty.
- Upload avatar.
- Tìm kiếm, chọn nhiều và xóa hàng loạt.
- Thống kê tổng pirate, tổng bounty và cấp cao nhất.

#### Quản lý băng nhóm

- Thêm, sửa, xóa băng nhóm.
- Captain, icon, màu sắc và ảnh băng nhóm.
- Thống kê thành viên và bounty.

#### Quản lý cấp độ

- Thêm, sửa, xóa rank.
- Cấu hình tên, icon, màu và bounty tối thiểu.
- Upload ảnh theo rank.

#### Quản lý tài khoản

- Thêm, sửa, xóa tài khoản.
- Username, email, nickname hiển thị.
- Gán pirate.
- Gán lớp 3/4/5 và môn Tin học/Công nghệ.
- Vai trò user, moderator hoặc admin.
- Trạng thái active, inactive hoặc banned.

#### Quản lý nhiệm vụ

- Tạo nhiệm vụ trắc nghiệm.
- Tạo nhiệm vụ đặc biệt nộp ảnh.
- Chọn lớp và môn.
- Cấu hình điểm đúng/sai.
- Thêm nhiều câu hỏi và đáp án.
- Sửa, xóa và lọc nhiệm vụ.

#### Duyệt bài nộp

- Xem danh sách bài nộp.
- Lọc theo trạng thái.
- Xem hình ảnh học sinh gửi.
- Chấm điểm.
- Duyệt hoặc từ chối bài.
- Ghi nhận xét.

#### Quản lý phần thưởng

- Thêm, sửa, xóa phần thưởng.
- Cấu hình icon, mô tả, loại và số bounty cần đổi.
- Giới hạn số lượt đổi.
- Duyệt hoặc hủy giao dịch đổi thưởng.

#### Quản lý vũ khí

- Thêm, sửa, xóa vũ khí.
- Loại, độ hiếm, icon và chỉ số.
- Tỷ lệ rơi.
- Trạng thái hoạt động.
- Theo dõi số vũ khí đã rơi và đang trang bị.

#### Gamification học tập

- Cấu hình thưởng hoàn thành nhiệm vụ ngày.
- Cấu hình bonus Quiz nhanh đúng 5/5.
- Cấu hình số hoạt động cần để mở từng đảo.
- Quản lý nickname, lớp và môn để bảng xếp hạng hoạt động chính xác.

#### Sao lưu và đồng bộ

- Xuất dữ liệu JSON.
- Nhập dữ liệu JSON.
- Tự backup trước khi nhập hoặc xóa toàn bộ pirate.
- Khôi phục backup gần nhất.
- Đồng bộ dữ liệu lên Firebase.

### `user.html` - Trang học sinh

- Hồ sơ cá nhân và avatar.
- Pirate được liên kết.
- Bounty, rank, băng nhóm và thứ hạng.
- Chuỗi đăng nhập hằng ngày.
- Level và thanh XP.
- Huy hiệu thành tích.
- Lịch sử học tập và đổi thưởng.
- Kho vũ khí, trang bị và gỡ vũ khí.
- Đổi phần thưởng bằng bounty.
- Đổi mật khẩu.
- Chọn lớp và môn để xem nhiệm vụ.
- Làm nhiệm vụ trắc nghiệm.
- Nộp bài đặc biệt bằng hình ảnh.
- Theo dõi tiến độ nhiệm vụ ngày.
- Quiz nhanh 5 câu mỗi ngày.
- Bonus khi trả lời đúng liên tiếp.
- Bản đồ 5 đảo tiến trình học tập.
- Bảng xếp hạng theo nickname, lớp và môn.

### `battle.html` - Chiến trường boss

- Hiển thị boss và HP.
- Tối đa 5 lượt đánh mỗi ngày.
- Reset lượt theo ngày.
- Gây sát thương theo bounty và vũ khí.
- Hạ boss và mở boss tiếp theo.
- Nhận bounty sau khi hạ boss.
- Rơi vũ khí ngẫu nhiên.
- Nhật ký chiến đấu.
- Reset tiến độ battle thủ công.
- Đồng bộ tiến độ battle online qua Firebase.
- Có fallback localStorage khi offline.

## Gamification

### Chuỗi đăng nhập

- Mỗi ngày đăng nhập được tính streak.
- Streak liên tiếp giúp học sinh duy trì động lực.
- Có thưởng bounty theo mốc đăng nhập.

### Nhiệm vụ ngày

Gồm 3 mục:

- Hoàn thành một Quiz nhanh.
- Nộp một bài học.
- Đạt ít nhất 80 điểm.

Khi hoàn thành đủ, học sinh nhận phần thưởng được admin cấu hình.

### Quiz nhanh

- 5 câu hỏi ngẫu nhiên.
- Mỗi ngày một lượt.
- Lấy câu hỏi từ kho quiz admin.
- Có bộ câu hỏi mặc định nếu chưa có quiz nào.
- Đúng liên tiếp 5/5 nhận bonus.

### Bản đồ đảo

- Đảo Khởi Đầu.
- Đảo Tin Học.
- Đảo Công Nghệ.
- Grand Line.
- Raftel Tri Thức.

Mỗi đảo mở theo số hoạt động học tập đã hoàn thành.

### Huy hiệu

- Chiến Binh 3 Ngày.
- Bài Học Đầu Tiên.
- Bounty 1K.
- Thợ Săn Boss.
- Người Mở Rương.

## Dữ liệu và đồng bộ

Ứng dụng dùng `localStorage` làm cache local và Firebase Realtime Database để đồng bộ giữa các máy.

Các nhóm dữ liệu chính:

- Pirate, bounty, crew và rank image.
- Account và liên kết pirate.
- Quest, attempt và submission.
- Reward và exchange.
- Weapon và user weapon.
- Battle progress.
- Login streak, daily progress và vật phẩm rương.

Khi Firebase không khả dụng, các chức năng local vẫn tiếp tục hoạt động. Khi dùng nhiều máy, nên bật Firebase Sync trên tất cả thiết bị.

## Backup dữ liệu

Trong `admin.html`:

- Chọn **Xuất dữ liệu** để tải file JSON.
- Chọn **Nhập dữ liệu** để khôi phục từ file.
- Ứng dụng tự tạo backup trước thao tác nhập hoặc xóa toàn bộ.
- Nút **Khôi phục** dùng để lấy lại backup gần nhất.

Nên xuất backup định kỳ trước khi chỉnh sửa dữ liệu lớn.

## Cấu trúc chính

```text
index.html       Trang chính
admin.html       Quản trị
user.html        Hồ sơ học sinh
battle.html      Chiến trường boss
css/             Giao diện
js/pirates.js    Pirate và bounty
js/admin.js      Chức năng admin
js/auth.js       Đăng nhập local
js/user-quests.js Nhiệm vụ, quiz và bài nộp
js/battle.js     Battle và vũ khí
js/firebase-sync.js Đồng bộ Firebase
js/utils.js      Toast và tiện ích an toàn
```

## Lưu ý

- Đây là web cá nhân, dữ liệu tài khoản hiện được lưu phía client.
- Không dùng mật khẩu thật hoặc dữ liệu nhạy cảm.
- Firebase Rules cần được cấu hình phù hợp nếu mở cho nhiều người dùng.
- Sau khi cập nhật code trên GitHub Pages, hãy refresh mạnh trình duyệt nếu vẫn thấy giao diện cũ.
