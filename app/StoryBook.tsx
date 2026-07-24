"use client";

import { useEffect, useRef, useState } from "react";

const storyPages = [
  {
    kicker: "TRUYỆN MỞ ĐẦU",
    title: "Mật lệnh Bạch Đằng",
    text: "Một dòng sông. Một kế sách. Một buổi sáng làm nên lịch sử.",
    image: "/images/truyen-ke-sach-dem-trang.png",
    alt: "Bìa truyện Mật lệnh Bạch Đằng 1288",
    cover: true,
  },
  {
    kicker: "MÙA XUÂN · 1288",
    title: "Đường về bị chặn",
    text: "Đoàn thuyền lớn đang tìm đường rút. Lương thực cạn dần. Trước mặt: sông Bạch Đằng.",
    image: "/images/ban-do-chien-thuat.png",
    alt: "Đoàn thuyền tiến về cửa sông Bạch Đằng",
  },
  {
    kicker: "KẾ SÁCH TRONG ĐÊM",
    title: "Chọn dòng sông",
    text: "Trần Hưng Đạo không chọn sức đối sức. Ông chọn dòng sông — và chờ đúng một con nước.",
    image: "/images/truyen-ke-sach-dem-trang.png",
    alt: "Trần Hưng Đạo cùng các tướng bàn kế sách bên bản đồ sông",
  },
  {
    kicker: "CẢ DÂN TỘC VÀO TRẬN",
    title: "Không ai đứng ngoài",
    text: "Đêm xuống, quân lính và dân binh cùng đóng cọc. Mỗi bàn tay góp vào một chiếc bẫy khổng lồ.",
    image: "/images/truyen-quan-dan-dong-coc.png",
    alt: "Quân dân Đại Việt cùng chuẩn bị bãi cọc trong đêm",
  },
  {
    kicker: "RẠNG SÁNG · 9.4.1288",
    title: "Dòng sông im lặng",
    text: "Triều dâng. Bãi cọc biến mất. Thuyền nhẹ Đại Việt xuất hiện rồi quay đầu.",
    image: "/images/song-bach-dang-trieu-cao.png",
    alt: "Bãi cọc ẩn dưới nước triều cao khi đoàn thuyền tiến vào",
  },
  {
    kicker: "CON NƯỚC ĐỔI CHIỀU",
    title: "Chiếc bẫy thức giấc",
    text: "Đoàn thuyền đuổi sâu. Nước bắt đầu rút. Từng đầu cọc nhô lên giữa dòng.",
    image: "/images/song-bach-dang-trieu-rut.png",
    alt: "Nước rút làm lộ bãi cọc giữa sông Bạch Đằng",
  },
  {
    kicker: "BẠCH ĐẰNG DẬY SÓNG",
    title: "Vòng vây khép lại",
    text: "Từ các lạch sông và hai bên bờ, quân Đại Việt đồng loạt xuất hiện.",
    image: "/images/bach-dang-cao-trao.png",
    alt: "Quân Đại Việt khép vòng vây trên sông Bạch Đằng",
  },
  {
    kicker: "BÌNH MINH ĐẠI VIỆT",
    title: "Dòng sông yên trở lại",
    text: "Chiến thắng thuộc về trí tuệ, thời cơ và sức mạnh của cả dân tộc.",
    image: "/images/truyen-binh-minh-chien-thang.png",
    alt: "Quân dân Đại Việt đón đoàn thuyền trở về trong bình minh",
  },
];

type StoryBookProps = {
  onFinish: () => void;
};

export default function StoryBook({ onFinish }: StoryBookProps) {
  const [page, setPage] = useState(0);
  const [turnDirection, setTurnDirection] = useState<"next" | "back">("next");
  const [drumPlaying, setDrumPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const touchStart = useRef<number | null>(null);
  const current = storyPages[page];

  const turnTo = (next: number) => {
    const target = Math.max(0, Math.min(storyPages.length - 1, next));
    if (target === page) return;
    setTurnDirection(target > page ? "next" : "back");
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
        if (page === storyPages.length - 1) onFinish();
        else turnTo(page + 1);
      }
      if (event.key === "ArrowLeft") turnTo(page - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [page, onFinish]);

  return (
    <main className="story-shell">
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
          if (distance < -55) turnTo(page + 1);
          if (distance > 55) turnTo(page - 1);
          touchStart.current = null;
        }}
      >
        <div className="book-shadow" aria-hidden="true" />
        <article key={page} className={`storybook-spread ${current.cover ? "story-cover" : ""} turn-${turnDirection}`} aria-live="polite">
          {current.cover ? (
            <>
              <img className="story-cover-image" src={current.image} alt={current.alt} />
              <div className="story-cover-scrim" />
              <div className="story-cover-copy">
                <span>{current.kicker}</span>
                <h1>{current.title}</h1>
                <p>{current.text}</p>
                <button onClick={() => turnTo(1)}>Mở truyện&nbsp; →</button>
              </div>
            </>
          ) : (
            <>
              <div className="storybook-paper">
                <span className="story-number">{String(page).padStart(2, "0")}</span>
                <div>
                  <p className="story-kicker">{current.kicker}</p>
                  <h1>{current.title}</h1>
                  <p className="story-text">{current.text}</p>
                </div>
                <small>Trang {page} / {storyPages.length - 1}</small>
              </div>
              <figure className="storybook-art">
                <img src={current.image} alt={current.alt} />
              </figure>
            </>
          )}
        </article>

        {page > 0 && (
          <nav className="story-controls" aria-label="Điều khiển sách truyện">
            <button onClick={() => turnTo(page - 1)} aria-label="Trang trước">←</button>
            {page === storyPages.length - 1 ? (
              <button className="enter-lesson" onClick={onFinish}>Bước vào thử thách&nbsp; →</button>
            ) : (
              <button onClick={() => turnTo(page + 1)} aria-label="Trang tiếp">Lật trang&nbsp; →</button>
            )}
          </nav>
        )}
        <p className="story-hint">Dùng phím ← → hoặc vuốt để lật trang</p>
      </section>
    </main>
  );
}
