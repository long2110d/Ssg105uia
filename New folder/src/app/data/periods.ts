export interface Song {
  title: string;
  artist: string;
  duration: number; // in seconds
  audioUrl?: string; // Optional actual audio file URL
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
    years: "Thời kỳ phong kiến",
    label: "Thời Kỳ Phong Kiến",
    color: "#8B0000",
    songs: [
      { title: 'Khúc nhạc "Long Ngâm"', artist: "Nhạc cung đình", duration: 215, audioUrl: "/songs/Khúc nhạc _Long Ngâm_.webm" },
      { title: 'Điệu "Trống Cơm"', artist: "Nhạc dân gian", duration: 182, audioUrl: "/songs/Điệu _Trống Cơm_.webm" },
      { title: "Giã bạn", artist: "Dân ca Quan họ", duration: 254, audioUrl: "/songs/Giã bạn.webm" }
    ],
    body: "Âm nhạc Việt Nam thời phong kiến mang đậm bản sắc dân tộc, từ những giai điệu cung đình trang trọng đến những điệu lý, câu hò dân gian bình dị.",
    detail: "Sự kết nối giữa âm nhạc bác học và âm nhạc dân gian tạo nên nền tảng vững chắc cho nền âm nhạc cổ truyền Việt Nam.",
  },
  {
    id: 2,
    frame: "02",
    years: "1945 – 1954",
    label: "Thời Kỳ Chống Pháp",
    color: "#6B3A1A",
    songs: [
      { title: "Tiến quân ca", artist: "Văn Cao", duration: 268, audioUrl: "/songs/Tiến quân ca.webm" },
      { title: "Hướng về Hà Nội", artist: "Hoàng Dương", duration: 212, audioUrl: "/songs/Hướng về Hà Nội.webm" },
      { title: "Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng", artist: "Phong Nhã", duration: 175, audioUrl: "/songs/Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng.webm" }
    ],
    body: "Âm nhạc thời kỳ này vang lên như một lời hiệu triệu, khơi dậy lòng yêu nước và tinh thần đấu tranh giải phóng dân tộc.",
    detail: "Những ca khúc hào hùng, lãng mạn ra đời trong khói lửa chiến tranh đã trở thành di sản vô giá của nền âm nhạc cách mạng Việt Nam.",
  },
  {
    id: 3,
    frame: "03",
    years: "1954 – 1975",
    label: "Thời Kỳ Chống Mỹ",
    color: "#2D4A3E",
    songs: [
      { title: "Như Có Bác Trong Ngày Vui Đại Thắng", artist: "Phạm Tuyên", duration: 198, audioUrl: "/songs/Nhu-Co-Bac-Ho-Trong-Ngay-Vui-Dai-Thang-Various-Artists.mp3" },
      { title: "Trường Sơn Đông, Trường Sơn Tây", artist: "Hoàng Hiệp / Phạm Tiến Duật", duration: 220, audioUrl: "/songs/Trường Sơn Đông, Trường Sơn Tây.webm" },
      { title: "Nối Vòng Tay Lớn", artist: "Trịnh Công Sơn", duration: 285, audioUrl: "/songs/Nối Vòng Tay Lớn.webm" }
    ],
    body: "Tiếng hát át tiếng bom. Âm nhạc là vũ khí tinh thần mạnh mẽ, đồng hành cùng những đoàn quân xẻ dọc Trường Sơn đi cứu nước.",
    detail: "Giai đoạn này chứng kiến sự phong phú của nhiều dòng nhạc khác nhau, từ nhạc đỏ hào hùng đến nhạc phản chiến đầy tính nhân văn.",
  },
  {
    id: 4,
    frame: "04",
    years: "1975 – 2000",
    label: "Thời Hậu Chiến Tranh",
    color: "#4A3728",
    songs: [
      { title: "Mùa Xuân Trên Thành Phố Hồ Chí Minh", artist: "Xuân Hồng", duration: 232, audioUrl: "/songs/Mùa Xuân Trên Thành Phố Hồ Chí Minh.webm" },
      { title: "Hà Nội mùa này vắng những cơn mưa", artist: "Trương Quý Hải", duration: 245, audioUrl: "/songs/Hà Nội mùa này vắng những cơn mưa.webm" },
      { title: "Thương Về Miền Trung", artist: "Minh Kỳ", duration: 228, audioUrl: "/songs/Thương Về Miền Trung.webm" }
    ],
    body: "Đất nước thống nhất, âm nhạc phản ánh niềm vui hòa bình xen lẫn những khó khăn, trăn trở của thời hậu chiến và bước đầu đổi mới.",
    detail: "Những giai điệu trữ tình, mang đậm tình yêu quê hương đất nước và nỗi nhớ nhung sâu lắng được công chúng vô cùng yêu thích.",
  },
  {
    id: 5,
    frame: "05",
    years: "2000 – NAY",
    label: "Thời Hiện Đại",
    color: "#2C3A5A",
    songs: [
      { title: "Việt Nam ơi", artist: "Minh Beta", duration: 215, audioUrl: "/songs/Việt Nam ơi.webm" },
      { title: "Thịnh vượng việt nam sáng ngời", artist: "Bùi Công Nam", duration: 202, audioUrl: "/songs/Thịnh vượng Việt Nam sáng ngời.webm" },
      { title: "Dòng sông ta về đây", artist: "Nhiều nghệ sĩ", duration: 241, audioUrl: "/songs/Dòng sông ta về đây.webm" }
    ],
    body: "Âm nhạc Việt Nam chuyển mình mạnh mẽ, hội nhập quốc tế với nhiều thể loại đa dạng, trẻ trung và tràn đầy năng lượng tích cực.",
    detail: "Thế hệ nghệ sĩ mới mang đến một diện mạo tươi sáng, tôn vinh tinh thần tự hào dân tộc và khát vọng vươn lên của đất nước.",
  }
];
