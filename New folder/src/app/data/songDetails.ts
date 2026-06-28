export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export interface Annotation {
  word: string;
  note: string;
}

export interface MediaItem {
  url: string;
  caption: string;
}

export interface SourceItem {
  name: string;
  url: string;
}

export interface SongDetail {
  summary: string;
  timeline: TimelineItem[];
  lyrics: string;
  annotations: Annotation[];
  media: MediaItem[];
  sources: SourceItem[];
}

export const SONG_DETAILS: Record<string, SongDetail> = {
  "Tiến quân ca": {
    summary: "Bài hát hùng tráng được nhạc sĩ Văn Cao sáng tác vào mùa đông năm 1944 tại Hà Nội, sau này được chọn làm Quốc ca chính thức của Việt Nam.",
    timeline: [
      {
        year: "1944",
        title: "Sáng tác trong đêm lạnh Hà Nội",
        desc: "Văn Cao viết bài hát tại căn gác nhỏ số 45 Nguyễn Thượng Hiền. Bài ca ra đời không bằng những lời ca hoa mỹ mà bằng tiếng súng và khát vọng tự do của nhân dân."
      },
      {
        year: "1945",
        title: "Vang lên trước Nhà hát Lớn",
        desc: "Ngày 17/8/1945, bài hát được cất lên lần đầu trước hàng vạn quần chúng nhân dân trong cuộc mít tinh của công chức Hà Nội, đánh dấu sự chuẩn bị cho Tổng khởi nghĩa."
      },
      {
        year: "1946",
        title: "Trở thành Quốc ca Việt Nam",
        desc: "Tại kỳ họp thứ nhất Quốc hội khóa I, Tiến quân ca chính thức được Hiến pháp công nhận là Quốc ca của nước Việt Nam Dân chủ Cộng hòa."
      }
    ],
    lyrics: "Đoàn quân Việt Nam đi chung lòng cứu quốc\nBước chân dồn vang trên đường gập ghềnh xa\nCờ in máu chiến thắng mang hồn nước\nSúng ngoài xa chen khúc quân hành ca\nĐường vinh quang xây xác quân thù\nThắng gian lao cùng nhau lập chiến khu\nVì nhân dân chiến đấu không ngừng\nTiến mau ra sa trường\nTiến lên! Cùng tiến lên!\nNước non Việt Nam ta vững bền.",
    annotations: [
      {
        word: "cứu quốc",
        note: "Hành động giải phóng đất nước thoát khỏi ách đô hộ của thực dân Pháp và phát xít Nhật thời kỳ bấy giờ."
      },
      {
        word: "hồn nước",
        note: "Tượng trưng cho linh khí sơn hà, lòng tự tôn dân tộc tích tụ qua hàng ngàn năm dựng nước và giữ nước."
      },
      {
        word: "chiến khu",
        note: "Các căn cứ địa cách mạng như ATK, Tân Trào vùng Việt Bắc — nơi đầu não chỉ đạo cuộc kháng chiến."
      }
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1699762707215-9f5bea5f6179?w=600&h=400&fit=crop&auto=format",
        caption: "Nhạc sĩ Văn Cao — Tác giả của Tiến quân ca và nhiều tình khúc bất hủ khác."
      },
      {
        url: "https://images.unsplash.com/photo-1763741218869-c36c3d6b3227?w=600&h=400&fit=crop&auto=format",
        caption: "Không khí khởi nghĩa giành chính quyền tại Quảng trường Nhà hát Lớn Hà Nội tháng 8/1945."
      }
    ],
    sources: [
      { name: "Lịch sử Quốc ca Việt Nam — Báo Chính phủ", url: "https://baochinhphu.vn" },
      { name: "Hồ sơ tư liệu Văn Cao — Hội Nhạc sĩ Việt Nam", url: "https://hoinhacsi.vn" }
    ]
  },
  "Nối Vòng Tay Lớn": {
    summary: "Một trong những tác phẩm cộng đồng nổi tiếng nhất của Trịnh Công Sơn, viết về khát vọng hòa hợp dân tộc và thống nhất non sông.",
    timeline: [
      {
        year: "1968",
        title: "Hoàn thành tác phẩm tại Huế",
        desc: "Trong bối cảnh đất nước chiến tranh ác liệt nhất, bài hát ra đời hướng tới một ngày hòa bình khi toàn bộ đồng bào ở mọi miền Nam Bắc được ôm chặt lấy nhau."
      },
      {
        year: "1975",
        title: "Cột mốc lịch sử trưa ngày 30/4",
        desc: "Ngay khi xe tăng tiến vào Dinh Độc Lập, Trịnh Công Sơn đã lên Đài phát thanh Sài Gòn tự ôm guitar cất tiếng hát bài này để kêu gọi hòa hợp dân tộc."
      }
    ],
    lyrics: "Rừng núi dang tay nối lại biển xa\nTa đi vòng tay lớn mãi để nối sơn hà\nMặt đất bao la anh em ta về\nGặp nhau mừng như bão cát quay cuồng trời rộng\nBàn tay ta nắm nối liền một vòng Việt Nam.",
    annotations: [
      {
        word: "sơn hà",
        note: "Núi sông, đất nước Việt Nam thống nhất toàn vẹn lãnh thổ từ Nam chí Bắc."
      },
      {
        word: "nối liền",
        note: "Hành động hàn gắn vết thương chiến tranh, xóa bỏ ranh giới chia cắt địa lý và tinh thần."
      }
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1725357599001-00709d50d32e?w=600&h=400&fit=crop&auto=format",
        caption: "Nhạc sĩ Trịnh Công Sơn với chiếc đàn guitar mộc mạc."
      }
    ],
    sources: [
      { name: "Trịnh Công Sơn và giai thoại Nối Vòng Tay Lớn", url: "https://trinhcongson.org" }
    ]
  },
  'Điệu "Trống Cơm"': {
    summary: "Điệu dân ca Quan họ Bắc Ninh vô cùng quen thuộc của đồng bằng Bắc Bộ, mang giai điệu tươi vui, dí dỏm kể về nét sinh hoạt xưa.",
    timeline: [
      {
        year: "Xưa",
        title: "Nguồn gốc Quan họ Bắc Ninh",
        desc: "Xuất phát từ các canh hát giao duyên cổ truyền của vùng Kinh Bắc, thể hiện sự khéo léo và tài hoa của các liền anh liền chị."
      },
      {
        year: "1956",
        title: "Ký âm và phổ biến rộng rãi",
        desc: "Được các nhạc sĩ cách mạng sưu tầm, ký âm và chuyển soạn thành bản nhạc trình diễn trên các sân khấu nghệ thuật lớn trong và ngoài nước."
      }
    ],
    lyrics: "Tình bằng có cái trống cơm\nKhen ai khéo vỗ ố mấy bông mà nên bông\nMột bầy tang tình con sít\nMấy lội lội lội sông\nMấy đi tìm em tìm\nOanh oanh liệt liệt tình bằng em đi tìm\nThương nhớ ơ hoài thương nhớ.",
    annotations: [
      {
        word: "trống cơm",
        note: "Loại trống dài, khi đánh phải miết cơm nếp dẻo vào hai mặt trống để tạo âm thanh trầm ấm độc đáo."
      },
      {
        word: "con sít",
        note: "Loài chim nhỏ sống ở đầm lầy, thường xuất hiện trong các bài ca dao cổ của Bắc Bộ."
      }
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1593407741958-59550f282621?w=600&h=400&fit=crop&auto=format",
        caption: "Biểu diễn dân ca Quan họ Bắc Ninh trên thuyền rồng Kinh Bắc."
      }
    ],
    sources: [
      { name: "Hồ sơ Di sản phi vật thể Quan họ Bắc Ninh — UNESCO", url: "https://unesco.org" }
    ]
  }
};

export const getSongDetail = (title: string): SongDetail => {
  // Try exact lookup
  if (SONG_DETAILS[title]) {
    return SONG_DETAILS[title];
  }

  // Fallback generation for any other song to keep UI robust
  return {
    summary: `Một tác phẩm âm nhạc ghi lại dấu ấn sâu sắc của thời đại qua sự thể hiện tài năng sáng tác và biểu diễn của người nghệ sĩ.`,
    timeline: [
      {
        year: "Sáng tác",
        title: "Hoàn cảnh ra đời",
        desc: "Bài hát ra đời trong bối cảnh lịch sử đầy cảm xúc, thể hiện tiếng lòng và tinh thần văn hóa dân tộc của thời đại."
      },
      {
        year: "Lan tỏa",
        title: "Đón nhận từ công chúng",
        desc: "Tác phẩm được biểu diễn rộng rãi và đón nhận nhiệt tình, trở thành một phần di sản tinh thần quý báu trong dòng chảy âm nhạc."
      }
    ],
    lyrics: `Lời ca của bài hát "${title}" chứa đựng những câu từ mộc mạc nhưng giàu tính nhân văn, là bức tranh vẽ nên những ký ức không phai nhòa.`,
    annotations: [
      {
        word: title,
        note: "Tên tác phẩm mang tính biểu tượng văn hóa tiêu biểu của thời kỳ này."
      }
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1676047871081-733dc414cbac?w=600&h=400&fit=crop&auto=format",
        caption: "Hình ảnh minh họa cho dòng chảy âm nhạc Việt Nam."
      }
    ],
    sources: [
      { name: "Thư viện Âm nhạc Việt Nam", url: "https://music.vn" }
    ]
  };
};
