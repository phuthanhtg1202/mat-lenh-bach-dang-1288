"use client";

import { useEffect, useRef, useState } from "react";

const storyPages = [
  {
    kicker: "TRUYỆN MỞ ĐẦU",
    milestone: "30.3 → 9.4.1288",
    moment: "Mười ngày quyết định",
    title: "Mật lệnh Bạch Đằng",
    text: ["Một dòng sông. Một kế sách. Một buổi sáng làm nên lịch sử."],
    image: "/images/truyen-ke-sach-dem-trang.png",
    alt: "Bìa truyện Mật lệnh Bạch Đằng 1288",
    cover: true,
  },
  {
    kicker: "MÙA XUÂN · 1288",
    milestone: "30.3.1288",
    moment: "Địch bắt đầu rút quân",
    title: "Đường về bị chặn",
    text: [
      "Mùa xuân năm 1288, đoàn quân Nguyên–Mông buộc phải rút khỏi Đại Việt. Con đường bộ đầy hiểm nguy, còn đường biển tưởng như rộng mở hơn. Vì thế, một đoàn chiến thuyền lớn do Ô Mã Nhi chỉ huy xuôi về phía cửa biển.",
      "Nhưng lương thảo đã cạn dần sau nhiều tháng giao chiến. Những kho lương và đường tiếp tế của đối phương liên tục bị quân dân nhà Trần đánh phá. Đoàn thuyền càng đi, nỗi lo càng lớn.",
      "Trước mắt họ là sông Bạch Đằng — một dòng sông rộng, nhiều nhánh và thay đổi theo từng con nước.",
    ],
    image: "/images/ban-do-chien-thuat.png",
    alt: "Đoàn thuyền tiến về cửa sông Bạch Đằng",
  },
  {
    kicker: "KẾ SÁCH TRONG ĐÊM",
    milestone: "30.3 → 8.4.1288",
    moment: "Bày thế trận Bạch Đằng",
    title: "Chọn dòng sông",
    text: [
      "Trong một đêm yên gió, Trần Hưng Đạo cùng các tướng nhìn thật lâu vào bản đồ cửa sông. Ông hiểu rằng nếu đối đầu trực diện giữa dòng nước rộng, những chiến thuyền lớn của đối phương vẫn rất nguy hiểm.",
      "Nhưng Bạch Đằng có một bí mật: khi triều dâng, mặt nước che lấp mọi vật; khi triều rút, lòng sông đổi khác rất nhanh. Ai hiểu dòng sông sẽ biến điều tưởng là bất lợi thành sức mạnh.",
      "Một kế hoạch được hình thành. Không dùng sức đối sức — hãy khiến đối phương tự đi vào nơi ta đã chọn.",
    ],
    image: "/images/truyen-ke-sach-dem-trang.png",
    alt: "Trần Hưng Đạo cùng các tướng bàn kế sách bên bản đồ sông",
  },
  {
    kicker: "CẢ DÂN TỘC VÀO TRẬN",
    milestone: "Đầu 4.1288",
    moment: "Bí mật dựng bãi cọc",
    title: "Không ai đứng ngoài",
    text: [
      "Khi mệnh lệnh truyền xuống, cả vùng ven sông cùng chuyển động. Người vào rừng chọn gỗ chắc. Người vót nhọn đầu cọc. Người chèo thuyền, kéo dây và dò từng luồng nước giữa đêm tối.",
      "Những cây cọc lớn được cắm sâu xuống lòng sông ở vị trí đã tính toán. Công việc nặng nhọc phải hoàn thành trước khi trời sáng và trước khi con nước quay trở lại.",
      "Đó không chỉ là kế sách của một vị tướng. Chiếc bẫy trên sông được dựng nên bởi sức người, sự kín đáo và quyết tâm bảo vệ quê hương của cả quân lẫn dân.",
    ],
    image: "/images/truyen-quan-dan-dong-coc.png",
    alt: "Quân dân Đại Việt cùng chuẩn bị bãi cọc trong đêm",
  },
  {
    kicker: "RẠNG SÁNG · 9.4.1288",
    milestone: "Rạng sáng · 9.4",
    moment: "Nước cao che kín bãi cọc",
    title: "Dòng sông im lặng",
    text: [
      "Rạng sáng ngày 9 tháng 4 năm 1288, nước triều dâng cao. Bãi cọc biến mất hoàn toàn dưới mặt sông. Nhìn từ xa, Bạch Đằng vẫn rộng và yên như chưa từng có một chiếc bẫy nào.",
      "Những thuyền nhẹ của Đại Việt bất ngờ xuất hiện, áp sát đoàn thuyền đối phương rồi quay đầu. Họ không bỏ chạy. Họ đang dẫn đường — nhưng chỉ người biết kế hoạch mới hiểu điều đó.",
      "Tin rằng đối phương đang yếu thế, Ô Mã Nhi thúc đoàn thuyền lớn đuổi theo. Cả đội hình tiến ngày một sâu vào cửa sông.",
    ],
    image: "/images/song-bach-dang-trieu-cao.png",
    alt: "Bãi cọc ẩn dưới nước triều cao khi đoàn thuyền tiến vào",
  },
  {
    kicker: "CON NƯỚC ĐỔI CHIỀU",
    milestone: "Gần trưa · 9.4",
    moment: "Nước rút, cọc bắt đầu lộ",
    title: "Chiếc bẫy thức giấc",
    text: [
      "Đoàn thuyền lớn đã vào đúng vị trí. Sau lưng họ, các lối rút dần bị những lực lượng mai phục kiểm soát. Phía trước, thuyền nhẹ Đại Việt vẫn vừa đánh vừa lùi, giữ cho đối phương tiếp tục đuổi theo.",
      "Rồi dòng nước bắt đầu hạ xuống. Một đầu cọc nhô lên. Sau đó là hàng chục, rồi hàng trăm đầu cọc. Những chiến thuyền nặng nề va vào bãi cọc và chen chúc giữa luồng nước đang thu hẹp.",
      "Đến lúc ấy, đối phương mới nhận ra: dòng sông yên tĩnh ban sáng chính là một trận địa đã được chuẩn bị từ trước.",
    ],
    image: "/images/song-bach-dang-trieu-rut.png",
    alt: "Nước rút làm lộ bãi cọc giữa sông Bạch Đằng",
  },
  {
    kicker: "BẠCH ĐẰNG DẬY SÓNG",
    milestone: "Trưa → chiều · 9.4",
    moment: "Tổng công kích",
    title: "Vòng vây khép lại",
    text: [
      "Tiếng trống trận vang lên. Từ các nhánh sông, sau những bãi cây và dọc hai bên bờ, thuyền chiến Đại Việt đồng loạt xuất hiện. Những mũi tiến công khép lại quanh đội hình đang mắc kẹt.",
      "Quân dân nhà Trần phối hợp đúng thời điểm: người chặn đường rút, người đánh từ hai bên, người điều khiển thuyền nhỏ luồn qua những nơi chiến thuyền lớn không thể xoay trở.",
      "Chiến thắng không đến từ bãi cọc riêng lẻ. Nó đến từ kế hoạch, địa hình, con nước và hàng nghìn con người cùng hành động như một.",
    ],
    image: "/images/bach-dang-cao-trao.png",
    alt: "Quân Đại Việt khép vòng vây trên sông Bạch Đằng",
  },
  {
    kicker: "BÌNH MINH ĐẠI VIỆT",
    milestone: "Chiều tối · 9.4.1288",
    moment: "Trận đánh kết thúc",
    title: "Dòng sông yên trở lại",
    text: [
      "Khi chiều buông, Bạch Đằng dần yên trở lại. Đoàn thủy quân xâm lược bị đánh tan, Ô Mã Nhi bị bắt. Cuộc kháng chiến chống Nguyên–Mông lần thứ ba đi đến thắng lợi.",
      "Trên bờ sông, những người đã chặt gỗ, chèo thuyền, canh nước và chiến đấu lại gặp nhau. Không có bàn tay nào là quá nhỏ trong chiến thắng ấy.",
      "Hơn bảy thế kỷ đã qua, câu chuyện Bạch Đằng vẫn nhắc chúng ta rằng lòng yêu nước không chỉ là lòng dũng cảm. Đó còn là trí tuệ, sự đoàn kết và khả năng chờ đúng thời cơ để bảo vệ quê hương.",
    ],
    image: "/images/truyen-binh-minh-chien-thang.png",
    alt: "Quân dân Đại Việt đón đoàn thuyền trở về trong bình minh",
  },
];

type StoryBookProps = {
  onFinish: () => void;
};

export default function StoryBook({ onFinish }: StoryBookProps) {
  const [page, setPage] = useState(0);
  const [textRevealed, setTextRevealed] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "back">("next");
  const [drumPlaying, setDrumPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const touchStart = useRef<number | null>(null);
  const current = storyPages[page];

  const turnTo = (next: number) => {
    const target = Math.max(0, Math.min(storyPages.length - 1, next));
    if (target === page) {
      setTextRevealed(false);
      return;
    }
    setTurnDirection(target > page ? "next" : "back");
    setTextRevealed(false);
    setPage(target);
  };

  const playDrum = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setDrumPlaying(true);
    try {
      await audio.play();
    } catch {
      setDrumPlaying(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("button, a")) return;
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        if (!textRevealed) setTextRevealed(true);
        else if (page === storyPages.length - 1) onFinish();
        else turnTo(page + 1);
      }
      if (event.key === "ArrowLeft") turnTo(page - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [page, textRevealed, onFinish]);

  return (
    <main className={drumPlaying ? "story-shell drum-active" : "story-shell"}>
      <audio
        ref={audioRef}
        src="/audio/trong-tran-hao-hung.mp3"
        preload="auto"
        onEnded={() => setDrumPlaying(false)}
      />

      <header className="story-topbar">
        <button className="story-brand" onClick={() => turnTo(0)} aria-label="Về bìa truyện">
          <span>1288</span><b>Chuyện Bạch Đằng</b>
        </button>
        <div className="story-progress" aria-label={`Trang ${page + 1} trên ${storyPages.length}`}>
          {storyPages.map((_, index) => (
            <button
              key={index}
              className={index === page ? "active" : index < page ? "seen" : ""}
              onClick={() => turnTo(index)}
              aria-label={`Đi tới trang ${index + 1}`}
            />
          ))}
        </div>
        <div className="story-tools">
          <button className={drumPlaying ? "playing" : ""} onClick={playDrum} aria-label="Phát tiếng trống mở truyện"><span>●</span> Trống mở truyện</button>
          <a href="/teacher" target="_blank" rel="noreferrer" aria-label="Mở kế hoạch giáo viên">Kế hoạch GV</a>
        </div>
      </header>

      <section
        className="storybook-stage"
        onTouchStart={(event) => { touchStart.current = event.changedTouches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
          if (!textRevealed) setTextRevealed(true);
          else if (distance < -55) turnTo(page + 1);
          else if (distance > 55) turnTo(page - 1);
          touchStart.current = null;
        }}
      >
        <div className="book-shadow" aria-hidden="true" />
        <article
          key={page}
          className={`storybook-spread ${current.cover ? "story-cover" : page % 2 === 0 ? "story-right" : "story-left"} ${textRevealed ? "story-text-revealed" : "story-text-hidden"} turn-${turnDirection}`}
          aria-live="polite"
          onClick={() => { if (!textRevealed) setTextRevealed(true); }}
        >
          <div
            className={`story-time-scene ${current.cover ? "cover-story-time" : ""}`}
            aria-label={`${current.milestone}: ${current.moment}`}
          >
            <span>CỘT MỐC THỜI GIAN</span>
            <strong>{current.milestone}</strong>
            <em>{current.moment}</em>
          </div>
          {current.cover ? (
            <>
              <img className="story-cover-image" src={current.image} alt={current.alt} />
              <div className="story-cover-scrim" />
              <div className="story-cover-copy">
                <span>{current.kicker}</span>
                <h1>{current.title}</h1>
                <p>{current.text[0]}</p>
                <button onClick={() => turnTo(1)}>Mở truyện&nbsp; →</button>
              </div>
            </>
          ) : (
            <>
              <div className="storybook-paper">
                <span className="story-number">{String(page).padStart(2, "0")}</span>
                <div className="story-copy-inner">
                  <p className="story-kicker">{current.kicker}</p>
                  <h1>{current.title}</h1>
                  <div className="story-body">
                    {current.text.map((paragraph) => <p className="story-text" key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
                <small>Trang {page} / {storyPages.length - 1}</small>
              </div>
              <figure className="storybook-art">
                <img src={current.image} alt={current.alt} />
              </figure>
            </>
          )}
        </article>

        {!textRevealed && (
          <button className="story-reveal-control" onClick={() => setTextRevealed(true)}>
            <span>TOÀN CẢNH TRƯỚC</span>
            <b>Hiện lời kể&nbsp; →</b>
          </button>
        )}

        {textRevealed && page > 0 && (
          <nav className="story-controls" aria-label="Điều khiển sách truyện">
            <button onClick={() => turnTo(page - 1)} aria-label="Trang trước">←</button>
            {page === storyPages.length - 1 ? (
              <button className="enter-lesson" onClick={onFinish}>Kết thúc truyện · Vào bài học&nbsp; →</button>
            ) : (
              <button onClick={() => turnTo(page + 1)} aria-label="Trang tiếp">Lật trang&nbsp; →</button>
            )}
          </nav>
        )}
        {!textRevealed && <p className="story-hint">Chạm màn hình để hiện lời kể</p>}
      </section>
    </main>
  );
}
