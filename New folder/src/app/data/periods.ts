export interface Song {
  title: string;
  artist: string;
  duration: number; // in seconds
}

export interface Period {
  id: number;
  frame: string;
  years: string;
  label: string;
  color: string;
  songs: Song[];
  body: string;
  detail: string;
}

export const PERIODS: Period[] = [
  {
    id: 1,
    frame: "01",
    years: "1954 – 1960",
    label: "Thời kỳ Tập Kết",
    color: "#8B0000",
    songs: [
      { title: "Câu Hò Bên Bờ Hiền Lương", artist: "NSND Thu Hiền / Hoàng Hiệp", duration: 215 },
      { title: "Tiếng Hát Từ Thành Phố Mang Tên Người", artist: "NSND Tạ Minh Tâm / Cao Việt Bách", duration: 182 },
      { title: "Xa Khơi", artist: "Anh Thơ / Nguyễn Tài Tuệ", duration: 254 }
    ],
    body: "Đất nước chia đôi. Tiếng nhạc theo dòng người tập kết ra Bắc — một cuộc di cư văn hoá chưa từng có. Những bài ca sinh ra từ nỗi đau chia cắt và khát vọng thống nhất.",
    detail: "Âm nhạc giai đoạn này mang âm hưởng dân ca đồng bằng Bắc Bộ xen lẫn điệu hò miền Trung — một cuộc gặp gỡ giữa hai truyền thống.",
  },
  {
    id: 2,
    frame: "02",
    years: "1960 – 1975",
    label: "Nhạc Phản Chiến",
    color: "#6B3A1A",
    songs: [
      { title: "Diễm Xưa", artist: "Khánh Ly / Trịnh Công Sơn", duration: 268 },
      { title: "Gia Tài Của Mẹ", artist: "Khánh Ly / Trịnh Công Sơn", duration: 212 },
      { title: "Nối Vòng Tay Lớn", artist: "Trịnh Công Sơn", duration: 175 }
    ],
    body: "Trịnh Công Sơn và thế hệ da vàng. Âm nhạc như tiếng khóc, như lời cầu nguyện — không bên nào, chỉ vì con người.",
    detail: "Trịnh viết hơn 600 ca khúc. Trong đó có những bài bị cấm ở cả hai miền, nhưng người ta vẫn hát trong bóng tối.",
  },
  {
    id: 3,
    frame: "03",
    years: "1975 – 1986",
    label: "Âm Nhạc Thống Nhất",
    color: "#2D4A3E",
    songs: [
      { title: "Đất Nước Trọn Niềm Vui", artist: "NSND Trung Kiên / Hoàng Hà", duration: 198 },
      { title: "Thành Phố Hồ Chí Minh", artist: "Cao Minh / Phan Huỳnh Điểu", duration: 220 },
      { title: "Mùa Xuân Đầu Tiên", artist: "Thanh Thúy / Văn Cao", duration: 285 }
    ],
    body: "Ngày 30/4/1975 — cánh cửa mở ra. Âm nhạc hoà bình đã đến nhưng mang theo nỗi trống rỗng khó gọi tên của thời hậu chiến.",
    detail: "Văn Cao viết Mùa Xuân Đầu Tiên trong những ngày đầu thống nhất — bài hát ông coi là đẹp nhất, nhưng cũng bị cấm dài nhất.",
  },
  {
    id: 4,
    frame: "04",
    years: "1986 – 1995",
    label: "Thời Kỳ Đổi Mới",
    color: "#4A3728",
    songs: [
      { title: "Hoa Sữa", artist: "Thanh Lam / Hồng Đăng", duration: 232 },
      { title: "Một Mình", artist: "Hồng Nhung / Thanh Tùng", duration: 245 },
      { title: "Hà Nội Mùa Vắng Những Cơn Mưa", artist: "Hồng Nhung / Trương Quý Hải", duration: 228 }
    ],
    body: "Đổi mới mở cánh cửa. Nhạc pop, nhạc rock Việt bắt đầu tìm chỗ đứng bên cạnh những bản ballad mang hơi thở phố thị Hà Nội.",
    detail: "Thanh Lam, Hồng Nhung, Mỹ Linh — ba giọng ca định hình khẩu vị âm nhạc của cả thế hệ đô thị hóa đầu tiên.",
  },
  {
    id: 5,
    frame: "05",
    years: "1995 – 2007",
    label: "V-Pop Ra Đời",
    color: "#2C3A5A",
    songs: [
      { title: "Bụi Bay Vào Mắt", artist: "Đông Nhi / Hamlet Trương", duration: 215 },
      { title: "Nụ Hôn Đầu", artist: "Đan Trường / Quốc An", duration: 202 },
      { title: "Đêm Nay Ai Khóc", artist: "Nguyễn Phi Hùng / Nguyễn Nhất Huy", duration: 241 }
    ],
    body: "Làn sóng nhạc trẻ từ hải ngoại tràn về. V-Pop ra đời giữa màu sắc MTV và khát vọng của thế hệ trẻ thành thị muốn có tiếng nói riêng.",
    detail: "Mắt Ngọc, Lam Trường, Mỹ Tâm — những gương mặt đầu tiên của ngành công nghiệp giải trí hiện đại Việt Nam.",
  },
  {
    id: 6,
    frame: "06",
    years: "2007 – nay",
    label: "Kỷ Nguyên Indie",
    color: "#1A1A2E",
    songs: [
      { title: "Chạy Ngay Đi", artist: "Sơn Tùng M-TP", duration: 240 },
      { title: "Ngày Chưa Giông Bão", artist: "Bùi Lan Hương / Phan Mạnh Quỳnh", duration: 219 },
      { title: "Có Chắc Yêu Là Đây", artist: "Sơn Tùng M-TP", duration: 198 }
    ],
    body: "Gen Z dùng âm nhạc để kể lại ký ức cha ông — indie Việt, R&B, lo-fi và hoài cổ trở thành ngôn ngữ kết nối hai thế hệ.",
    detail: "Cá Hồi Hoang, Tăng Duy Tân, tlinh — nghệ sĩ trẻ hôm nay đang viết lại bản nhạc của ký ức dân tộc theo cách riêng của họ.",
  },
];
