"use client";

import { useEffect, useRef, useState } from "react";
import StoryBook from "./StoryBook";

const TOTAL_SLIDES = 13;

const battleBeats = [
  ["Mất lương", "Buộc phải rút"],
  ["Vào cửa sông", "Triều còn cao"],
  ["Nhử sâu", "Thuyền nhẹ giả lui"],
  ["Nước rút", "Cọc nhô lên"],
  ["Khép vòng vây", "Ô Mã Nhi bị bắt"],
];

const enemyMission = [
  {
    kicker: "01 · CỬA SÔNG",
    title: "Mặt sông hoàn toàn yên",
    text: "Từ boong tàu địch, em chỉ thấy nước lớn, luồng sông rộng và vài thuyền nhẹ ở rất xa. Không một đầu cọc nào lộ ra.",
    sight: "Không thấy nguy hiểm",
    tide: "Triều cao",
  },
  {
    kicker: "02 · MỒI NHỬ",
    title: "Họ đánh rồi quay đầu",
    text: "Thuyền Đại Việt áp sát trong chốc lát rồi rút nhanh. Từ xa, cảnh ấy rất dễ bị hiểu thành một đội quân đang yếu thế và bỏ chạy.",
    sight: "Đối phương đang lui",
    tide: "Triều vẫn cao",
  },
  {
    kicker: "03 · TRUY ĐUỔI",
    title: "Đội hình đi quá sâu",
    text: "Chiến thuyền lớn tăng tốc. Mọi ánh mắt đều hướng về những chiếc thuyền trước mặt, nên không ai nhận ra đường rút phía sau đang dần bị khóa.",
    sight: "Chỉ nhìn về phía trước",
    tide: "Bắt đầu đổi chiều",
  },
  {
    kicker: "04 · NƯỚC RÚT",
    title: "Chiếc bẫy bỗng xuất hiện",
    text: "Mực nước hạ xuống. Hàng trăm đầu cọc nhô lên ngay giữa đội hình. Thuyền lớn không thể quay đầu, còn luồng nước an toàn đã biến mất.",
    sight: "Cọc ở khắp phía trước",
    tide: "Rút rất nhanh",
  },
  {
    kicker: "05 · PHỤC BINH",
    title: "Tiếng trống nổi bốn phía",
    text: "Thuyền Đại Việt đồng loạt quay lại, quân mai phục xuất hiện từ hai bờ. Điều tưởng là một cuộc truy đuổi dễ dàng hóa thành vòng vây đã chuẩn bị sẵn.",
    sight: "Không còn đường thoát",
    tide: "Cọc đã lộ",
  },
];

export default function LessonDeck() {
  const [storyDone, setStoryDone] = useState(false);
  const [slide, setSlide] = useState(0);
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const [clues, setClues] = useState<string[]>([]);
  const [tide, setTide] = useState(100);
  const [decision, setDecision] = useState<string | null>(null);
  const [battleBeat, setBattleBeat] = useState(0);
  const [keys, setKeys] = useState<string[]>([]);
  const [drumPlaying, setDrumPlaying] = useState(false);
  const [enemyPhase, setEnemyPhase] = useState(0);
  const [enemyPlaying, setEnemyPlaying] = useState(false);
  const [armyFocus, setArmyFocus] = useState<"dai-viet" | "nguyen" | null>(null);
  const [heroReveal, setHeroReveal] = useState(false);
  const [impactFocus, setImpactFocus] = useState<"ket-thuc" | "bao-ve" | "di-san" | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const goTo = (next: number) => setSlide(Math.max(0, Math.min(TOTAL_SLIDES - 1, next)));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, button, a")) return;
      if (event.key === "ArrowRight" || event.key === " ") goTo(slide + 1);
      if (event.key === "ArrowLeft") goTo(slide - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [slide]);

  useEffect(() => {
    if (slide !== 5 || !enemyPlaying) return;
    if (enemyPhase === 1 || enemyPhase >= enemyMission.length - 1) {
      setEnemyPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setEnemyPhase((current) => Math.min(enemyMission.length - 1, current + 1));
    }, enemyPhase === 0 ? 3200 : 2800);
    return () => window.clearTimeout(timer);
  }, [slide, enemyPhase, enemyPlaying]);

  const playEnemyMission = () => {
    if (enemyPhase >= enemyMission.length - 1) {
      setEnemyPhase(0);
      setVote(null);
    }
    setEnemyPlaying(true);
  };

  const chooseEnemyOrder = (order: "yes" | "no") => {
    setVote(order);
    setEnemyPhase(2);
    setEnemyPlaying(true);
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

  const toggleClue = (clue: string) => {
    setClues((current) =>
      current.includes(clue) ? current.filter((item) => item !== clue) : [...current, clue],
    );
  };

  const toggleKey = (key: string) => {
    setKeys((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  };

  if (!storyDone) {
    return <StoryBook onFinish={() => setStoryDone(true)} />;
  }

  return (
    <main className={drumPlaying ? "deck-shell drum-active" : "deck-shell"}>
      <audio
        ref={audioRef}
        src="/audio/trong-tran-hao-hung.mp3"
        preload="auto"
        onEnded={() => setDrumPlaying(false)}
      />

      <header className="deck-topbar">
        <button className="deck-brand" onClick={() => goTo(0)} aria-label="Về trang bìa">
          <span>1288</span>
          <b>Bạch Đằng</b>
        </button>
        <div className="deck-progress" aria-label={`Slide ${slide + 1} trên ${TOTAL_SLIDES}`}>
          {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
            <button
              key={index}
              className={index === slide ? "active" : index < slide ? "seen" : ""}
              onClick={() => goTo(index)}
              aria-label={`Đi tới slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="deck-tools">
          <button onClick={() => setStoryDone(false)}>Đọc truyện</button>
          <button className={drumPlaying ? "sound-button playing" : "sound-button"} onClick={playDrum}>
            <span>●</span> Trống trận
          </button>
          <a href="/teacher" target="_blank" rel="noreferrer">Kế hoạch GV</a>
        </div>
      </header>

      <div className="slide-stage" aria-live="polite">
        {slide === 0 && (
          <section className="lesson-slide cover-slide">
            <img className="slide-image cover-image" src="/og.png" alt="Minh họa trận Bạch Đằng năm 1288" />
            <div className="slide-scrim cover-scrim" />
            <div className="cover-actions">
              <button className="round-action" onClick={playDrum} aria-label="Phát tiếng trống">
                <span className={drumPlaying ? "pulse-ring active" : "pulse-ring"}>●</span>
                Nghe trống
              </button>
              <button className="start-mission" onClick={() => goTo(1)}>Bắt đầu nhiệm vụ →</button>
            </div>
          </section>
        )}

        {slide === 1 && (
          <section className="lesson-slide fact-slide fact-date-slide">
            <img className="slide-image" src="/images/song-bach-dang-trieu-cao.png" alt="Sông Bạch Đằng lúc thủy triều lên" />
            <div className="slide-scrim fact-date-scrim" />
            <div className="fact-date-layout">
              <div className="fact-heading">
                <span className="fact-number">01</span>
                <span className="slide-kicker">HỒ SƠ TRẬN ĐÁNH</span>
              </div>
              <h1 className="giant-date"><span>09 · 04</span><strong>1288</strong></h1>
              <div className="fact-date-rail">
                <article><small>Ở đâu?</small><b>Sông Bạch Đằng</b></article>
                <article><small>Khi nào?</small><b>Sáng sớm → chiều tối</b></article>
                <article><small>Toàn chiến dịch</small><b>30/3 → 9/4/1288</b></article>
              </div>
            </div>
          </section>
        )}

        {slide === 2 && (
          <section className="lesson-slide fact-slide forces-slide">
            <img className="slide-image" src="/images/ban-do-chien-thuat.png" alt="Bản đồ minh họa chiến trường Bạch Đằng" />
            <div className="slide-scrim full-scrim strong" />
            <div className="forces-layout">
              <div className="forces-title">
                <span className="slide-kicker">HỒ SƠ TRẬN ĐÁNH · 02</span>
                <h1>Ai đối đầu?</h1>
                <p>Chạm vào từng phía để gặp những người chủ chốt.</p>
              </div>
              <div className="forces-cards">
                <button
                  className={`force-card dai-viet ${armyFocus === "dai-viet" ? "open" : ""}`}
                  onClick={() => setArmyFocus(armyFocus === "dai-viet" ? null : "dai-viet")}
                  aria-expanded={armyFocus === "dai-viet"}
                >
                  <span>NHÀ TRẦN</span>
                  <h2>Đại Việt</h2>
                  <small>Bảo vệ đất nước</small>
                  <div className="force-people">
                    <b>Trần Nhân Tông <em>Nhà vua</em></b>
                    <b>Trần Quốc Tuấn <em>Tổng chỉ huy</em></b>
                    <b>Nguyễn Khoái <em>Đánh nhử ở Bạch Đằng</em></b>
                    <b>Trần Khánh Dư <em>Đánh thuyền lương</em></b>
                  </div>
                </button>
                <div className="versus-mark">ĐỐI ĐẦU</div>
                <button
                  className={`force-card nguyen ${armyFocus === "nguyen" ? "open" : ""}`}
                  onClick={() => setArmyFocus(armyFocus === "nguyen" ? null : "nguyen")}
                  aria-expanded={armyFocus === "nguyen"}
                >
                  <span>ĐẾ QUỐC NGUYÊN</span>
                  <h2>Nguyên–Mông</h2>
                  <small>Rút quân theo đường thủy</small>
                  <div className="force-people">
                    <b>Thoát Hoan <em>Tổng chỉ huy xâm lược</em></b>
                    <b>Ô Mã Nhi <em>Chỉ huy thủy quân</em></b>
                    <b>Phàn Tiếp <em>Tướng thủy quân</em></b>
                  </div>
                </button>
              </div>
            </div>
          </section>
        )}

        {slide === 3 && (
          <section className="lesson-slide fact-slide hero-fact-slide">
            <img className="slide-image hero-fact-image" src="/images/tran-hung-dao-hero.png" alt="Minh họa Trần Hưng Đạo chỉ huy trên sông Bạch Đằng" />
            <div className="slide-scrim hero-fact-scrim" />
            <div className="hero-fact-copy">
              <span className="slide-kicker">NGƯỜI HÙNG TRUNG TÂM · 03</span>
              <h1>Trần<br />Hưng Đạo</h1>
              <p className="hero-real-name">Trần Quốc Tuấn · Tổng chỉ huy</p>
              <div className="hero-deeds">
                <span>Đoán đúng đường rút</span>
                <span>Chọn đúng chiến trường</span>
                <span>Chờ đúng con nước</span>
              </div>
              <button className="hero-reveal-button" onClick={() => setHeroReveal((value) => !value)}>
                {heroReveal ? "Thu gọn" : "Ai cùng ông làm nên chiến thắng?"}
              </button>
              {heroReveal && (
                <div className="collective-hero">
                  <b>Quân dân Đại Việt</b>
                  <span>Đóng cọc · chèo thuyền · mai phục · hiệp đồng</span>
                </div>
              )}
            </div>
          </section>
        )}

        {slide === 4 && (
          <section className="lesson-slide fact-slide impact-slide">
            <img className="slide-image" src="/images/bach-dang-cao-trao.png" alt="Cao trào chiến thắng Bạch Đằng năm 1288" />
            <div className="slide-scrim full-scrim strong" />
            <div className="impact-layout">
              <span className="slide-kicker">VÌ SAO QUAN TRỌNG? · 04</span>
              <h1>Một trận đánh.<br />Định đoạt cuộc chiến.</h1>
              <div className="impact-cards">
                <button className={impactFocus === "ket-thuc" ? "active" : ""} onClick={() => setImpactFocus("ket-thuc")}>
                  <span>01</span><b>Kết thúc</b><small>Cuộc xâm lược lần thứ ba</small>
                </button>
                <button className={impactFocus === "bao-ve" ? "active" : ""} onClick={() => setImpactFocus("bao-ve")}>
                  <span>02</span><b>Bảo vệ</b><small>Nền độc lập Đại Việt</small>
                </button>
                <button className={impactFocus === "di-san" ? "active" : ""} onClick={() => setImpactFocus("di-san")}>
                  <span>03</span><b>Để lại</b><small>Đỉnh cao nghệ thuật thủy chiến</small>
                </button>
              </div>
              <p className="impact-line">
                {impactFocus === "ket-thuc" && "Đòn quyết chiến góp phần kết thúc thắng lợi cuộc kháng chiến năm 1287–1288."}
                {impactFocus === "bao-ve" && "Đại Việt giữ vững chủ quyền trước một đế quốc hùng mạnh bậc nhất thời đó."}
                {impactFocus === "di-san" && "Trí tuệ, địa hình, thời cơ và sức dân được kết hợp trong một kế hoạch thống nhất."}
                {!impactFocus && "Chạm vào 3 dấu mốc để giải mã ý nghĩa chiến thắng."}
              </p>
            </div>
          </section>
        )}

        {slide === 5 && (
          <section className={`lesson-slide enemy-pov-slide enemy-phase-${enemyPhase} ${enemyPlaying ? "is-playing" : ""}`}>
            <div className="enemy-world" aria-label="Góc nhìn từ boong chiến thuyền địch trên sông Bạch Đằng">
              <img className="enemy-pov-frame enemy-high-frame" src="/images/enemy-pov-high-tide.png" alt="Góc nhìn quân địch khi nước triều còn cao và bãi cọc bị che kín" />
              <img className="enemy-pov-frame enemy-low-frame" src="/images/enemy-pov-low-tide.png" alt="Cùng góc nhìn khi nước rút làm bãi cọc bất ngờ xuất hiện" />
              <div className="enemy-target-lock" aria-hidden="true"><span /></div>
              <div className="enemy-speed-lines" aria-hidden="true" />
              <div className="enemy-ambush enemy-ambush-left" aria-hidden="true">Phục binh</div>
              <div className="enemy-ambush enemy-ambush-right" aria-hidden="true">Phục binh</div>
              <div className="enemy-impact-flash" aria-hidden="true" />
            </div>
            <div className="enemy-vignette" />

            <div className="enemy-hud">
              <span>BẠN ĐANG Ở TRÊN THUYỀN ĐỊCH</span>
              <div><b>{enemyMission[enemyPhase].sight}</b><small>{enemyMission[enemyPhase].tide}</small></div>
            </div>

            <div className="enemy-mission-panel">
              <div key={enemyPhase} className="enemy-phase-copy">
                <span>{enemyMission[enemyPhase].kicker}</span>
                <h1>{enemyMission[enemyPhase].title}</h1>
                <p>{enemyMission[enemyPhase].text}</p>
              </div>

              {enemyPhase === 1 ? (
                <div className="enemy-decision">
                  <b>Em ra lệnh thế nào?</b>
                  <div>
                    <button className={vote === "yes" ? "selected" : ""} onClick={() => chooseEnemyOrder("yes")}>Đuổi theo!</button>
                    <button className={vote === "no" ? "selected" : ""} onClick={() => chooseEnemyOrder("no")}>Dừng quan sát</button>
                  </div>
                  {vote === "no" && <small>Em đã cảnh giác. Nhưng Ô Mã Nhi trong lịch sử đã chọn truy đuổi.</small>}
                </div>
              ) : (
                <button
                  className="enemy-play-button"
                  onClick={() => enemyPlaying ? setEnemyPlaying(false) : playEnemyMission()}
                >
                  {enemyPlaying ? "Tạm dừng" : enemyPhase === enemyMission.length - 1 ? "Xem lại từ đầu" : enemyPhase === 0 ? "Bắt đầu hành trình" : "Tiếp tục"}
                </button>
              )}

              {enemyPhase >= 2 && vote === "no" && (
                <small className="enemy-history-choice">Em chọn dừng lại. Trong lịch sử, Ô Mã Nhi vẫn thúc quân truy đuổi — hãy xem điều xảy ra.</small>
              )}

              {enemyPhase === enemyMission.length - 1 && (
                <div className="enemy-surprise">
                  <b>Vì sao bị bất ngờ?</b>
                  <span>Triều cao che bãi cọc</span>
                  <span>Thuyền nhẹ giả lui</span>
                  <span>Đội hình bị nhử sâu</span>
                  <span>Phục binh chờ đúng lúc</span>
                </div>
              )}
            </div>

            <div className="enemy-timeline" aria-label="Các giai đoạn của hành trình">
              {enemyMission.map((phase, index) => (
                <button
                  key={phase.kicker}
                  className={index === enemyPhase ? "active" : index < enemyPhase ? "seen" : ""}
                  onClick={() => { setEnemyPlaying(false); setEnemyPhase(index); }}
                  aria-label={`Xem giai đoạn ${index + 1}`}
                >{index + 1}</button>
              ))}
            </div>
          </section>
        )}

        {slide === 6 && (
          <section className="lesson-slide video-slide">
            <img className="slide-image" src="/images/song-bach-dang-trieu-cao.png" alt="Sông Bạch Đằng trong màn sương" />
            <div className="slide-scrim full-scrim" />
            <div className="video-layout">
              <div>
                <span className="slide-kicker">ĐOẠN PHIM GỢI MỞ</span>
                <h1>Chỉ xem<br />2 phút 30 giây</h1>
              </div>
              <div className="watch-card">
                <span className="watch-time">00:40 — 03:10</span>
                <p>Dừng trước khi phim kể hết kết quả.</p>
                <a
                  href="https://vtv.vn/video/hao-khi-ngan-nam-dai-chien-bach-dang-giang-nam-1288-phan-1-248127.htm"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mở phim VTV ↗
                </a>
              </div>
            </div>
            <div className="bottom-question">Dòng sông trở thành “vũ khí” bằng cách nào?</div>
          </section>
        )}

        {slide === 7 && (
          <section className="lesson-slide map-slide">
            <img className="slide-image contain-image" src="/images/ban-do-chien-thuat.png" alt="Bản đồ minh họa chiến thuật Bạch Đằng" />
            <div className="map-title">
              <span className="slide-kicker">MỞ 3 MANH MỐI</span>
              <h1>Chiếc bẫy<br />hoạt động ra sao?</h1>
            </div>
            <button
              className={`map-clue clue-one ${clues.includes("Lương") ? "open" : ""}`}
              onClick={() => toggleClue("Lương")}
            ><span>1</span><b>{clues.includes("Lương") ? "Cắt lương" : "?"}</b></button>
            <button
              className={`map-clue clue-two ${clues.includes("Cọc") ? "open" : ""}`}
              onClick={() => toggleClue("Cọc")}
            ><span>2</span><b>{clues.includes("Cọc") ? "Giấu cọc" : "?"}</b></button>
            <button
              className={`map-clue clue-three ${clues.includes("Phục") ? "open" : ""}`}
              onClick={() => toggleClue("Phục")}
            ><span>3</span><b>{clues.includes("Phục") ? "Phục binh" : "?"}</b></button>
            {clues.length === 3 && <div className="map-reveal">Ba mắt xích. Một kế hoạch.</div>}
          </section>
        )}

        {slide === 8 && (
          <section className="lesson-slide tide-slide">
            <div className="tide-images" aria-label="Mô phỏng triều cao và triều rút">
              <img src="/images/song-bach-dang-trieu-rut.png" alt="Bãi cọc xuất hiện khi triều rút" />
              <img
                src="/images/song-bach-dang-trieu-cao.png"
                alt="Bãi cọc bị che kín khi triều cao"
                style={{ opacity: tide / 100 }}
              />
            </div>
            <div className="slide-scrim left-scrim" />
            <div className="slide-copy tide-copy">
              <span className="slide-kicker">THÍ NGHIỆM CON NƯỚC</span>
              <h1>{tide > 58 ? "Nhử địch" : tide > 28 ? "Chờ đúng lúc" : "Khép vòng vây"}</h1>
              <p className="tide-state">{tide > 58 ? "Cọc đang ẩn" : tide > 28 ? "Nước đang rút" : "Cọc đã lộ"}</p>
            </div>
            <div className="tide-control">
              <span>Nước rút</span>
              <input
                type="range"
                min="0"
                max="100"
                value={tide}
                onChange={(event) => setTide(Number(event.target.value))}
                aria-label="Điều chỉnh mực thủy triều"
              />
              <span>Triều cao</span>
            </div>
          </section>
        )}

        {slide === 9 && (
          <section className="lesson-slide council-slide">
            <img className="slide-image" src="/images/song-bach-dang-trieu-cao.png" alt="Đoàn thuyền trên sông lúc triều cao" />
            <div className="slide-scrim full-scrim" />
            <div className="council-layout">
              <div>
                <span className="slide-kicker">HỘI ĐỒNG TÁC CHIẾN</span>
                <h1>Em phát lệnh nào?</h1>
              </div>
              <div className="choice-row">
                {[
                  ["A", "Đánh ngoài cửa sông"],
                  ["B", "Chờ nước cạn hẳn"],
                  ["C", "Nhử lúc nước cao"],
                ].map(([letter, label]) => (
                  <button
                    key={letter}
                    className={`${decision === letter ? "selected" : ""} ${decision && letter === "C" ? "correct" : ""}`}
                    onClick={() => setDecision(letter)}
                  >
                    <span>{letter}</span><b>{label}</b>
                  </button>
                ))}
              </div>
              {decision && (
                <div className={decision === "C" ? "choice-feedback success" : "choice-feedback"}>
                  {decision === "C" ? "Đúng thời cơ!" : "Chưa dùng hết lợi thế."}
                </div>
              )}
            </div>
          </section>
        )}

        {slide === 10 && (
          <section className="lesson-slide battle-slide">
            <img className="slide-image" src="/images/bach-dang-cao-trao.png" alt="Cao trào trận Bạch Đằng khi cọc xuất hiện" />
            <div className="slide-scrim battle-scrim" />
            <div key={battleBeat} className="battle-headline">
              <span>0{battleBeat + 1}</span>
              <div><small>{battleBeats[battleBeat][0]}</small><h1>{battleBeats[battleBeat][1]}</h1></div>
            </div>
            <div className="beat-row">
              {battleBeats.map(([title], index) => (
                <button key={title} className={battleBeat === index ? "active" : ""} onClick={() => setBattleBeat(index)}>
                  <span>{index + 1}</span><b>{title}</b>
                </button>
              ))}
            </div>
          </section>
        )}

        {slide === 11 && (
          <section className="lesson-slide keys-slide">
            <img className="slide-image" src="/images/ban-do-chien-thuat.png" alt="Bản đồ chiến trường Bạch Đằng" />
            <div className="slide-scrim full-scrim strong" />
            <div className="keys-layout">
              <span className="slide-kicker">GIẢI MÃ CHIẾN THẮNG</span>
              <h1>Ba chìa khóa</h1>
              <div className="key-row">
                {["Con người", "Địa hình", "Thời cơ"].map((key, index) => (
                  <button key={key} className={keys.includes(key) ? "open" : ""} onClick={() => toggleKey(key)}>
                    <span>0{index + 1}</span><b>{keys.includes(key) ? key : "Mở khóa"}</b>
                  </button>
                ))}
              </div>
              {keys.length === 3 && <div className="final-key">Hào khí Đông A</div>}
            </div>
          </section>
        )}

        {slide === 12 && (
          <section className="lesson-slide exit-slide">
            <img className="slide-image" src="/images/bach-dang-cao-trao.png" alt="Quân dân Đại Việt phối hợp trong trận Bạch Đằng" />
            <div className="slide-scrim full-scrim strong" />
            <div className="exit-layout">
              <span className="slide-kicker">VÉ RỜI LỚP · 60 GIÂY</span>
              <h1>Điều khiến em<br />tự hào nhất là…</h1>
              <textarea aria-label="Câu trả lời của học sinh" rows={3} placeholder="Viết một câu của riêng em" />
            </div>
          </section>
        )}
      </div>

      {slide > 0 && (
        <nav className="slide-controls" aria-label="Điều khiển slide">
          <button onClick={() => goTo(slide - 1)} disabled={slide === 0} aria-label="Slide trước">←</button>
          <span><b>{String(slide + 1).padStart(2, "0")}</b> / 13</span>
          <button onClick={() => goTo(slide + 1)} disabled={slide === TOTAL_SLIDES - 1} aria-label="Slide tiếp">→</button>
        </nav>
      )}
    </main>
  );
}
