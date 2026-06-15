import React from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { FEATURE, STORIES } from "./StoryCards";
import { Grain, filmFilter } from "./Grain";

interface StoryPageProps {
  id: number;
  onClose: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ id, onClose }) => {
  const allStories = [FEATURE, ...STORIES];
  const story = allStories.find((s) => s.id === id) || FEATURE;

  // Rich historical narrative text for each story
  const narratives: Record<number, { paragraphs: string[]; quote: string }> = {
    1: {
      paragraphs: [
        "Diễm Xưa ra đời vào năm 1960, lấy cảm hứng từ hình bóng của Ngô Thị Lệ Diễm — một người con gái Huế dịu dàng, xa xăm. Bài hát là sự hòa quyện tuyệt vời giữa cảnh sắc mưa bay trầm mặc của xứ Huế cổ kính và tiếng thở dài của một thời kỳ đầy biến động. Trịnh Công Sơn từng chia sẻ rằng, hình dáng mảnh mai của người con gái ấy đi dưới những cơn mưa dài qua hàng cây long não cổ kính của cố đô đã khắc sâu vào tâm khảm ông, khơi nguồn cho những nốt nhạc da diết ban đầu.",
        "Bài hát nhanh chóng vượt khỏi biên giới tình yêu đôi lứa để trở thành tiếng nói phản chiến thầm lặng. Dưới làn mưa xám xịt của Huế, nỗi nhớ thương người con gái lồng ghép vào nỗi xót xa cho thân phận con người giữa cuộc chiến tranh chia cắt đất nước. Giai điệu mượt mà nhưng buồn mênh mang ấy đã len lỏi vào từng ngóc ngách của đời sống đô thị miền Nam thời bấy giờ, xoa dịu những vết thương tinh thần của cả một thế hệ đi qua giông bão.",
        "Trải qua hơn nửa thế kỷ, Diễm Xưa vẫn vẹn nguyên giá trị nghệ thuật và lịch sử. Tác phẩm đã được dịch sang nhiều thứ tiếng, đặc biệt thành công tại Nhật Bản dưới cái tên 'Utsukushii Mukashi' và lọt vào top những ca khúc được yêu thích nhất tại quốc gia này. Khúc ca mãi mãi là một tượng đài âm nhạc hoài cổ, một mảnh ghép linh hồn của cố đô Huế rêu phong."
      ],
      quote: "Chiều nay còn mưa sao em không lại... Nhớ mãi trong cơn đau buốt này, thương xót cho giọt lệ hiếm hoi..."
    },
    2: {
      paragraphs: [
        "Nối Vòng Tay Lớn là lời kêu gọi hòa hợp, hòa giải dân tộc mãnh liệt được Trịnh Công Sơn sáng tác vào năm 1968. Bài hát vượt lên trên mọi lăng kính chính trị để hướng về ước vọng thiêng liêng nhất của người Việt Nam: độc lập, thống nhất và sum họp gia đình sau hàng chục năm chịu cảnh chia cắt đau đớn.",
        "Sức sống của tác phẩm được minh chứng rõ rệt nhất vào trưa ngày 30/4/1975, khi nhạc sĩ Trịnh Công Sơn trực tiếp ôm đàn guitar và cất tiếng hát ca khúc này trên Đài phát thanh Sài Gòn vừa được giải phóng. Khoảnh khắc giai điệu rộn rã ấy vang lên đã trở thành cột mốc âm thanh lịch sử, báo hiệu chiến tranh kết thúc và kỷ nguyên hòa bình mở ra trên toàn lãnh thổ.",
        "Cho đến hôm nay, Nối Vòng Tay Lớn vẫn là bài hát cộng đồng phổ biến nhất tại Việt Nam. Ca khúc thường xuyên được hát vang trong các ngày hội lớn, các buổi sinh hoạt tập thể của giới trẻ, thể hiện tinh thần đoàn kết bền chặt của người dân Việt Nam qua nhiều thế hệ nối tiếp nhau."
      ],
      quote: "Rừng núi dang tay nối lại biển xa. Ta đi vòng tay lớn mãi để nối sơn hà. Mặt đất bao la, anh em ta về, gặp nhau mừng như bão cát quay cuồng trời rộng..."
    },
    3: {
      paragraphs: [
        "Hoa Sữa được nhạc sĩ Hồng Đăng viết vào năm 1978 cho bộ phim 'Hà Nội mùa chim làm tổ'. Bài hát vẽ nên một bức tranh vô cùng lãng mạn và đầy chất thơ về Hà Nội những năm đầu sau ngày thống nhất đất nước. Mùi hương hoa sữa nồng nàn lan tỏa trong đêm thu tĩnh lặng đã trở thành biểu tượng đầy hoài niệm cho tình yêu và nỗi nhớ Hà Nội.",
        "Ca khúc là tiếng lòng của những tâm hồn nhạy cảm đi qua chiến tranh, nay tìm lại những rung động dịu dàng của đời thường. Tiếng đàn piano trầm bổng cùng giọng hát sâu lắng đã làm xao xuyến hàng triệu trái tim, biến hoa sữa từ một loài cây bình thường trở thành một phần ký ức không thể tách rời của thủ đô yêu dấu.",
        "Dù qua nhiều thập kỷ, Hoa Sữa vẫn là một trong những ca khúc hay nhất viết về Hà Nội. Cứ mỗi độ thu về, khi những cơn gió heo may chớm lạnh tràn về đầu phố, giai điệu ấy lại ngân vang, gợi nhắc về một thời thanh xuân tươi đẹp và yên bình của biết bao thế hệ người Tràng An."
      ],
      quote: "Tuổi mười lăm em lớn từng ngày. Một buổi sáng bỗng biến thành thiếu nữ. Tin nhắn đến từ một mùi hương lạ, hoa sữa nồng nàn đầu phố đêm đêm..."
    },
    4: {
      paragraphs: [
        "Phượng Hồng là bài ca tuổi học trò kinh điển được phổ nhạc từ bài thơ nổi tiếng của nhà thơ Đỗ Trung Quân. Sáng tác vào những năm đầu thập niên 1990, bài hát khắc họa sâu sắc những tình cảm trong sáng, ngây ngô dưới mái trường cấp ba thân thương trước mùa chia tay đầy lưu luyến.",
        "Hình ảnh hoa phượng vĩ đỏ rực rơi trên những chiếc giỏ xe đạp, những tiếng ve kêu râm ran gọi hè, và những mối tình đơn phương e ấp đã đi sâu vào tâm khảm học sinh Việt Nam. Ca khúc mang một giai điệu valse nhẹ nhàng, pha chút tiếc nuối khi mùa hè cuối cùng khép lại, mở ra những ngả đường tương lai mới.",
        "Đối với giới trẻ thế hệ 8X, 9X, Phượng Hồng là bản nhạc chia tay bắt buộc phải vang lên trong mọi lễ bế giảng. Bài hát giữ trọn khoảnh khắc thiêng liêng khi học trò trao nhau những cuốn lưu bút, ký tên lên áo trắng và hứa hẹn về một ngày gặp lại dưới ánh mặt trời rực rỡ."
      ],
      quote: "Những chiếc giỏ xe chở đầy hoa phượng, em chở mùa hè của tôi đi đâu? Chùm phượng vĩ em cầm là tuổi tôi mười tám, thuở chẳng ai hay thầm lặng một tình yêu..."
    }
  };

  const currentNarrative = narratives[story.id] || narratives[1];

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A] relative selection:bg-[#8B0000] selection:text-[#F5F1E8] pb-20">
      {/* Noise layer */}
      <Grain opacity={0.06} />

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#F5F1E8]/80 backdrop-blur-md border-b border-[rgba(26,26,26,0.08)] py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[#8B0000] hover:text-[#C2A47E] font-medium text-xs uppercase tracking-widest transition-colors cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
          </button>
          
          <span
            className="text-[#6B5F4E] font-semibold text-[10px] tracking-[0.3em] uppercase hidden sm:inline"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Triển Lãm Âm Nhạc Ký Ức
          </span>

          <span
            className="text-[#C2A47E] italic"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "1.4rem" }}
          >
            nhạc ký ức Việt
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-6 pt-12 md:pt-20 relative z-10">
        {/* Category & Tag details */}
        <div className="flex flex-col items-center text-center mb-6">
          <span
            className="text-[#C2A47E] font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {story.era} · {story.tag}
          </span>
          <div className="w-8 h-0.5 bg-[#8B0000]" />
        </div>

        {/* Large Title */}
        <h1
          className="text-center font-black leading-[1.1] mb-2"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontVariationSettings: "'opsz' 144",
          }}
        >
          {story.song}
        </h1>

        {/* Artist Credit */}
        <p
          className="text-center text-[#6B5F4E] italic mb-10 text-lg md:text-xl"
          style={{ fontFamily: "'Fraunces', serif", fontVariationSettings: "'opsz' 18" }}
        >
          — Tác phẩm tiêu biểu của {story.artist}
        </p>

        {/* Big Magazine Cover Image */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[rgba(26,26,26,0.1)] mb-12">
          <img
            src={story.img}
            alt={story.song}
            className="w-full h-full object-cover"
            style={{ filter: filmFilter }}
          />
          <Grain opacity={0.14} />
          {/* Cover Corner brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/40" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/40" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/40" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/40" />
        </div>

        {/* Article Body */}
        <article className="prose prose-stone max-w-none">
          {/* Lead Paragraph */}
          <p
            className="text-lg md:text-xl text-[#3c3c3c] leading-relaxed mb-8 font-medium font-serif italic"
            style={{ textIndent: "1.5rem" }}
          >
            {story.desc}
          </p>

          {/* Blockquote Quote Band */}
          <div className="relative my-10 p-6 md:p-8 bg-[#EDE9DF]/50 border-l-4 border-[#8B0000] rounded-r-xl overflow-hidden">
            <span className="absolute -top-3 left-4 text-8xl font-serif text-[#8B0000]/10 select-none pointer-events-none">
              “
            </span>
            <blockquote
              className="text-[#8B0000] font-black leading-relaxed relative z-10 text-lg md:text-xl"
              style={{
                fontFamily: "'Fraunces', serif",
                fontVariationSettings: "'opsz' 24",
              }}
            >
              {currentNarrative.quote}
            </blockquote>
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-6 text-[#2C2C2C] text-base md:text-lg leading-relaxed">
            {currentNarrative.paragraphs.map((p, idx) => (
              <p
                key={idx}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.8,
                  textIndent: "1.5rem",
                }}
              >
                {/* Visual drop-cap on first letter of first paragraph */}
                {idx === 0 ? (
                  <>
                    <span
                      className="float-left text-5xl md:text-6xl font-black text-[#8B0000] mr-2.5 mt-1 leading-[0.8] font-serif"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {p.charAt(0)}
                    </span>
                    {p.slice(1)}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </div>
        </article>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-14">
          <div className="h-px w-20 bg-[rgba(26,26,26,0.1)]" />
          <BookOpen className="w-4 h-4 text-[#C2A47E]" />
          <div className="h-px w-20 bg-[rgba(26,26,26,0.1)]" />
        </div>

        {/* Footer Navigation CTA */}
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-[#8B0000] hover:bg-[#8B0000] text-[#8B0000] hover:text-[#F5F1E8] font-semibold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer rounded-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Quay lại Triển Lãm
          </button>
          
          <span
            className="text-[10px] text-[#6B5F4E] font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Thời gian đọc: {story.readTime}
          </span>
        </div>
      </main>
    </div>
  );
};
