"use client";

import { useEffect, useMemo, useState } from "react";

const battleSteps = [
  {
    time: "Trước trận",
    title: "Đoàn thuyền lương bị phá",
    text: "Sau thất bại ở Vân Đồn, quân Nguyên thiếu lương và buộc phải tính đường rút.",
  },
  {
    time: "Rạng sáng",
    title: "Đoàn chiến thuyền tiến vào sông",
    text: "Đạo thủy quân do Ô Mã Nhi chỉ huy xuôi về cửa biển qua vùng Bạch Đằng.",
  },
  {
    time: "Khi triều còn cao",
    title: "Thuyền nhẹ ra khiêu chiến",
    text: "Quân Đại Việt đánh rồi giả lui, kéo đội hình đối phương sâu vào khu vực mai phục.",
  },
  {
    time: "Nước bắt đầu rút",
    title: "Trận địa vô hình xuất hiện",
    text: "Cọc gỗ nhô lên, chiến thuyền lớn mắc kẹt và đội hình rối loạn.",
  },
  {
    time: "Tổng công kích",
    title: "Các cánh quân đồng loạt tiến đánh",
    text: "Quân dân nhà Trần khép vòng vây; Ô Mã Nhi bị bắt. Cuộc xâm lược lần thứ ba thất bại.",
  },
];

const quiz = [
  {
    question: "Nếu có bãi cọc nhưng tính sai giờ thủy triều, điều gì dễ xảy ra nhất?",
    answers: [
      "Kế hoạch có thể thất bại",
      "Cọc tự di chuyển",
      "Thuyền đối phương tự quay lại",
    ],
    correct: 0,
  },
  {
    question: "Ba chìa khóa của chiến thắng Bạch Đằng 1288 là gì?",
    answers: [
      "May mắn, gió mạnh, thuyền đẹp",
      "Con người, địa hình, thời cơ",
      "Chỉ riêng những chiếc cọc",
    ],
    correct: 1,
  },
  {
    question: "Câu chuyện bà bán nước chỉ lịch con nước nên được giới thiệu thế nào?",
    answers: [
      "Một mệnh lệnh quân sự còn nguyên bản",
      "Một sự thật đã được quay phim tại chỗ",
      "Một truyền thuyết địa phương giàu ý nghĩa",
    ],
    correct: 2,
  },
];

const hotspots = [
  {
    id: "van-don",
    label: "Vân Đồn",
    title: "Mắt xích bị cắt",
    text: "Đoàn thuyền lương của Trương Văn Hổ bị đánh phá. Một đạo quân lớn nhưng thiếu lương sẽ không thể ở lại lâu.",
    className: "hotspot-van-don",
  },
  {
    id: "stakes",
    label: "Bãi cọc",
    title: "Trận địa vô hình",
    text: "Những cọc gỗ được bố trí trong vùng sông. Khi triều cao, chúng bị nước che khuất; khi triều rút, chúng trở thành vật cản.",
    className: "hotspot-stakes",
  },
  {
    id: "ambush",
    label: "Mai phục",
    title: "Sức mạnh từ nhiều hướng",
    text: "Thuyền nhẹ, quân mai phục và lực lượng địa phương phối hợp. Đây không phải chiến thắng của một vật cản đơn lẻ.",
    className: "hotspot-ambush",
  },
];

function formatTime(total: number) {
  const minutes = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function Home() {
  const [teacherOpen, setTeacherOpen] = useState(false);
  const [seconds, setSeconds] = useState(60 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [tide, setTide] = useState(78);
  const [openedHotspots, setOpenedHotspots] = useState<string[]>([]);
  const [decision, setDecision] = useState<string | null>(null);
  const [battleStep, setBattleStep] = useState(0);
  const [battlePlaying, setBattlePlaying] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [drumActive, setDrumActive] = useState(false);

  useEffect(() => {
    if (!timerRunning || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [timerRunning, seconds]);

  useEffect(() => {
    if (!battlePlaying) return;
    const timer = window.setInterval(() => {
      setBattleStep((step) => {
        if (step >= battleSteps.length - 1) {
          setBattlePlaying(false);
          return step;
        }
        return step + 1;
      });
    }, 2200);
    return () => window.clearInterval(timer);
  }, [battlePlaying]);

  const score = useMemo(
    () =>
      quiz.reduce(
        (total, item, index) => total + (quizAnswers[index] === item.correct ? 1 : 0),
        0,
      ),
    [quizAnswers],
  );

  const tideMessage =
    tide > 62
      ? "Nước cao: bãi cọc gần như biến mất. Đây là lúc chiếc bẫy trông vô hại nhất."
      : tide > 28
        ? "Nước đang rút: thời cơ chuyển rất nhanh. Hãy sẵn sàng phát lệnh."
        : "Nước thấp: cọc lộ rõ, thuyền lớn khó xoay trở. Vòng vây có thể khép lại.";

  const playDrum = () => {
    setDrumActive(true);
    try {
      const audio = new AudioContext();
      [0, 0.42, 0.84].forEach((delay) => {
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(88, audio.currentTime + delay);
        gain.gain.setValueAtTime(0.55, audio.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + delay + 0.34);
        oscillator.connect(gain).connect(audio.destination);
        oscillator.start(audio.currentTime + delay);
        oscillator.stop(audio.currentTime + delay + 0.36);
      });
    } catch {
      // The visual drum animation still works when browser audio is unavailable.
    }
    window.setTimeout(() => setDrumActive(false), 1500);
  };

  const openHotspot = (id: string) => {
    setOpenedHotspots((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSeconds(60 * 60);
  };

  return (
    <main>
      <nav className="topbar" aria-label="Điều hướng bài học">
        <a className="brand" href="#top" aria-label="Về đầu trang">
          <span className="brand-mark">1288</span>
          <span>Mật lệnh Bạch Đằng</span>
        </a>
        <div className="top-actions">
          <div className="mini-timer" aria-label={`Thời gian còn lại ${formatTime(seconds)}`}>
            <span className={timerRunning ? "timer-dot live" : "timer-dot"} />
            <strong>{formatTime(seconds)}</strong>
            <button onClick={() => setTimerRunning((value) => !value)}>
              {timerRunning ? "Dừng" : "Chạy"}
            </button>
          </div>
          <button className="teacher-button" onClick={() => setTeacherOpen(true)}>
            Giáo án 60′
          </button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">HỒ SƠ NHIỆM VỤ · ĐẠI VIỆT · 1288</p>
          <h1>Mật lệnh<br />Bạch Đằng</h1>
          <p className="hero-kicker">Một con nước. Một trận địa vô hình. Một ngày đổi vận Đại Việt.</p>
          <p className="hero-intro">
            Đoàn chiến thuyền của Ô Mã Nhi đang tìm đường ra biển. Dòng sông trước mặt phẳng lặng —
            nhưng dưới làn nước là một bí mật. Em có đủ bình tĩnh để tìm đúng thời cơ không?
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#briefing">Nhận mật lệnh</a>
            <button className="drum-button" onClick={playDrum}>
              <span className={drumActive ? "drum beating" : "drum"}>●</span>
              Đánh trống xuất quân
            </button>
          </div>
          <div className="hero-facts" aria-label="Thông tin nhanh">
            <span><b>9.4.1288</b> ngày quyết chiến</span>
            <span><b>3</b> chìa khóa cần tìm</span>
            <span><b>60′</b> một nhiệm vụ</span>
          </div>
        </div>
        <div className="hero-poster" role="img" aria-label="Minh họa điện ảnh trận Bạch Đằng 1288">
          <div className="poster-glow" />
          <div className="poster-caption">Bình minh trên dòng Bạch Đằng</div>
        </div>
      </section>

      <section className="mission-rail" aria-label="Các chặng nhiệm vụ">
        {[
          ["01", "Mật thư"],
          ["02", "Thám sát"],
          ["03", "Con nước"],
          ["04", "Quyết định"],
          ["05", "Giải mã"],
        ].map(([number, label]) => (
          <div key={number} className="mission-node">
            <span>{number}</span>
            <b>{label}</b>
          </div>
        ))}
      </section>

      <section className="story-section parchment" id="briefing">
        <div className="section-heading">
          <p className="section-number">HỒI I · 0–12 PHÚT</p>
          <h2>Mật thư trong màn sương</h2>
          <p>Giáo viên đọc chậm, tắt bớt đèn và chỉ cho học sinh nghe tiếng trống trước khi nhìn màn hình.</p>
        </div>
        <div className="story-grid">
          <article className="story-card dark-card">
            <span className="seal">MẬT</span>
            <p className="story-time">Rạng sáng, tháng 4 năm 1288</p>
            <h3>“Dòng sông đang giấu điều gì?”</h3>
            <p>
              Đoàn thuyền lương đã bị đánh phá. Đạo thủy quân Nguyên phải rút về phía biển. Trước mắt họ,
              sông Bạch Đằng rộng và yên. Những chiếc thuyền nhẹ của Đại Việt xuất hiện, đánh vài hồi rồi quay đầu.
            </p>
            <p>
              Nhưng ở hai bên bờ, các cánh quân đang nín lặng. Dưới mặt nước, một “khu rừng” không có lá đang chờ.
              Và trên trời, Mặt Trăng đang kéo cả dòng sông xuống từng phút…
            </p>
            <div className="pause-question">
              <span>DỪNG CÂU CHUYỆN</span>
              <strong>Nếu em là Ô Mã Nhi, em có đuổi theo không? Vì sao?</strong>
            </div>
          </article>

          <aside className="video-card">
            <div className="video-screen">
              <span className="play-icon">▶</span>
              <div>
                <small>VIDEO GỢI MỞ · VTV</small>
                <strong>Đại chiến Bạch Đằng Giang 1288</strong>
              </div>
            </div>
            <p><b>Cách dùng:</b> xem khoảng 2–3 phút đầu, rồi dừng trước khi video tiết lộ toàn bộ kế hoạch.</p>
            <a
              className="video-link"
              href="https://vtv.vn/video/hao-khi-ngan-nam-dai-chien-bach-dang-giang-nam-1288-phan-1-248127.htm"
              target="_blank"
              rel="noreferrer"
            >
              Mở video VTV ↗
            </a>
            <a
              className="backup-link"
              href="https://www.youtube.com/results?search_query=B%E1%BA%A1ch+%C4%90%E1%BA%B1ng+1288+ho%E1%BA%A1t+h%C3%ACnh+l%E1%BB%8Bch+s%E1%BB%AD"
              target="_blank"
              rel="noreferrer"
            >
              Tìm bản hoạt hình trên YouTube
            </a>
            <p className="teacher-note">Chuẩn bị video trước giờ học; đường truyền lớp học có thể không ổn định.</p>
          </aside>
        </div>
      </section>

      <section className="map-section" id="map">
        <div className="section-heading light-heading">
          <p className="section-number">HỒI II · 12–22 PHÚT</p>
          <h2>Thám sát chiến trường</h2>
          <p>Chia lớp thành ba đội. Mỗi đội chọn một dấu đỏ, đọc manh mối và nói nó ảnh hưởng đến kế hoạch ra sao.</p>
        </div>
        <div className="map-layout">
          <div className="battle-map" aria-label="Bản đồ tương tác chiến trường Bạch Đằng dạng mô phỏng">
            <div className="map-land land-a" />
            <div className="map-land land-b" />
            <div className="river-label">SÔNG BẠCH ĐẰNG</div>
            <div className="fleet fleet-a"><span>◁</span><span>◁</span><span>◁</span></div>
            <div className="fleet fleet-b"><span>▷</span><span>▷</span></div>
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                className={`map-hotspot ${spot.className} ${openedHotspots.includes(spot.id) ? "opened" : ""}`}
                onClick={() => openHotspot(spot.id)}
                aria-expanded={openedHotspots.includes(spot.id)}
              >
                <span>+</span>{spot.label}
              </button>
            ))}
            <div className="map-compass">BẮC<br /><span>↑</span></div>
          </div>
          <div className="clue-stack" aria-live="polite">
            {hotspots.map((spot) => (
              <article key={spot.id} className={openedHotspots.includes(spot.id) ? "clue revealed" : "clue"}>
                <small>{spot.label}</small>
                <h3>{openedHotspots.includes(spot.id) ? spot.title : "Manh mối đang niêm phong"}</h3>
                <p>{openedHotspots.includes(spot.id) ? spot.text : "Chạm vào vị trí tương ứng trên bản đồ để mở."}</p>
              </article>
            ))}
            <div className="clue-progress">
              <span style={{ width: `${(openedHotspots.length / hotspots.length) * 100}%` }} />
            </div>
            <b>{openedHotspots.length}/3 manh mối đã mở</b>
          </div>
        </div>
      </section>

      <section className="tide-section parchment" id="tide">
        <div className="section-heading">
          <p className="section-number">HỒI III · 22–34 PHÚT</p>
          <h2>Phòng thí nghiệm con nước</h2>
          <p>Kéo thanh thủy triều. Nhiệm vụ của cả lớp là tìm ra lúc nên nhử địch và lúc nên tổng công kích.</p>
        </div>
        <div className="tide-lab">
          <div className="river-tank">
            <div className="sky-sun" />
            <div className="distant-shore" />
            <div className="ship" style={{ bottom: `calc(${Math.max(tide, 18)}% - 7px)` }}>
              <div className="ship-sail">ĐẠO THỦY QUÂN</div>
              <div className="ship-hull" />
            </div>
            <div className="stakes" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, index) => (
                <i key={index} style={{ height: `${68 + (index % 4) * 10}px` }} />
              ))}
            </div>
            <div className="water" style={{ height: `${tide}%` }}>
              <div className="water-line" />
            </div>
            <span className="tide-label high">TRIỀU CAO</span>
            <span className="tide-label low">TRIỀU THẤP</span>
          </div>
          <div className="tide-controls">
            <div className="gauge-value"><span>Mực nước</span><strong>{tide}%</strong></div>
            <input
              aria-label="Điều chỉnh mực thủy triều"
              type="range"
              min="10"
              max="92"
              value={tide}
              onChange={(event) => setTide(Number(event.target.value))}
            />
            <div className="range-labels"><span>Nước rút</span><span>Nước lên</span></div>
            <p className="tide-message">{tideMessage}</p>
            <div className="think-pair-share">
              <small>THỬ THÁCH 60 GIÂY</small>
              <strong>Vì sao cọc gỗ chỉ hiệu quả khi đi cùng sự hiểu biết về thủy triều?</strong>
              <p>Nghĩ một mình → nói với bạn bên cạnh → một bạn trình bày trước lớp.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="decision-section" id="decision">
        <div className="section-heading light-heading">
          <p className="section-number">HỒI IV · 34–45 PHÚT</p>
          <h2>Hội đồng tác chiến</h2>
          <p>Mỗi đội có 45 giây hội ý. Chọn một phương án và phải bảo vệ quyết định bằng hai manh mối.</p>
        </div>
        <div className="decision-brief">
          <span className="brief-icon">!</span>
          <p><b>Tình báo báo về:</b> đoàn thuyền đang tới, triều còn cao nhưng sẽ rút nhanh. Em phát lệnh nào?</p>
        </div>
        <div className="decision-grid">
          {[
            ["A", "Đánh ngay khi địch còn ngoài cửa sông", "Bất ngờ, nhưng chưa tận dụng được trận địa và có thể để đội hình đối phương quay ra biển."],
            ["B", "Ẩn quân và chờ đến khi nước cạn hẳn", "Khi ấy bãi cọc đã lộ rõ; đối phương có thể nhận ra nguy hiểm từ xa."],
            ["C", "Nhử vào lúc triều cao, đánh khi nước rút", "Kết hợp được ngụy trang, thời cơ, bãi cọc và lực lượng mai phục."],
          ].map(([letter, title, text]) => (
            <button
              key={letter}
              className={`decision-card ${decision === letter ? "selected" : ""} ${decision && letter === "C" ? "correct" : ""}`}
              onClick={() => setDecision(letter)}
            >
              <span>{letter}</span>
              <strong>{title}</strong>
              <p>{decision === letter ? text : "Chạm để trình phương án"}</p>
            </button>
          ))}
        </div>
        {decision && (
          <div className={decision === "C" ? "decision-result success" : "decision-result try-again"} role="status">
            <strong>{decision === "C" ? "Mệnh lệnh đã khớp với ba manh mối!" : "Phương án này còn một lỗ hổng."}</strong>
            <p>{decision === "C" ? "Em đã kết hợp con người + địa hình + thời cơ." : "Hãy quay lại bản đồ và phòng thí nghiệm con nước, rồi thử lại."}</p>
          </div>
        )}
      </section>

      <section className="battle-section parchment" id="battle">
        <div className="section-heading">
          <p className="section-number">TRẬN ĐÁNH ĐƯỢC MỞ KHÓA</p>
          <h2>Bạch Đằng chuyển mình</h2>
          <p>Nhấn phát để kể lại diễn biến theo năm khung hình. Cả lớp tạo âm thanh bằng bàn tay: nước – mái chèo – trống trận.</p>
        </div>
        <div className="battle-player">
          <div className="battle-stage">
            <div className={`battle-visual step-${battleStep}`}>
              <div className="battle-sky" />
              <div className="battle-water" />
              <div className="battle-stakes">{Array.from({ length: 9 }).map((_, index) => <i key={index} />)}</div>
              <div className="ship-group enemy-ships"><span>▰</span><span>▰</span><span>▰</span></div>
              <div className="ship-group dai-viet-ships"><span>▰</span><span>▰</span></div>
              <div className="battle-burst">THỜI CƠ!</div>
            </div>
            <div className="battle-copy">
              <small>{battleSteps[battleStep].time}</small>
              <h3>{battleSteps[battleStep].title}</h3>
              <p>{battleSteps[battleStep].text}</p>
            </div>
          </div>
          <div className="battle-controls">
            <button onClick={() => setBattleStep(Math.max(0, battleStep - 1))} aria-label="Bước trước">←</button>
            <button className="play-battle" onClick={() => {
              if (battleStep === battleSteps.length - 1) setBattleStep(0);
              setBattlePlaying((value) => !value);
            }}>
              {battlePlaying ? "Tạm dừng" : battleStep === battleSteps.length - 1 ? "Xem lại" : "Phát diễn biến"}
            </button>
            <button onClick={() => setBattleStep(Math.min(battleSteps.length - 1, battleStep + 1))} aria-label="Bước tiếp">→</button>
          </div>
          <div className="battle-timeline">
            {battleSteps.map((step, index) => (
              <button key={step.title} className={index <= battleStep ? "active" : ""} onClick={() => setBattleStep(index)}>
                <span>{index + 1}</span><b>{step.time}</b>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="quiz-section" id="unlock">
        <div className="section-heading light-heading">
          <p className="section-number">HỒI V · 45–56 PHÚT</p>
          <h2>Giải mã chiến thắng</h2>
          <p>Không cần nhớ thật nhiều. Chỉ cần giải thích được vì sao kế hoạch hoạt động.</p>
        </div>
        <div className="quiz-grid">
          {quiz.map((item, questionIndex) => (
            <article className="quiz-card" key={item.question}>
              <div className="quiz-index">0{questionIndex + 1}</div>
              <h3>{item.question}</h3>
              <div className="answer-list">
                {item.answers.map((answer, answerIndex) => {
                  const selected = quizAnswers[questionIndex] === answerIndex;
                  const correct = selected && answerIndex === item.correct;
                  return (
                    <button
                      key={answer}
                      className={`${selected ? "selected" : ""} ${correct ? "correct" : selected ? "wrong" : ""}`}
                      onClick={() => setQuizAnswers((current) => ({ ...current, [questionIndex]: answerIndex }))}
                    >
                      <span>{String.fromCharCode(65 + answerIndex)}</span>{answer}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
        <div className={`unlock-panel ${score === 3 ? "unlocked" : ""}`}>
          <div className="medal">{score === 3 ? "✦" : "?"}</div>
          <div>
            <small>HUY HIỆU NHÀ CHIẾN LƯỢC</small>
            <h3>{score === 3 ? "Đã mở khóa: Hào khí Đông A" : `${score}/3 chìa khóa đã khớp`}</h3>
            <p>
              {score === 3
                ? "Chiến thắng đến từ trí tuệ, sự đoàn kết và khả năng biến hiểu biết về quê hương thành sức mạnh bảo vệ đất nước."
                : "Thử lại câu chưa đúng. Mỗi câu trả lời đều nằm trong một hoạt động em vừa hoàn thành."}
            </p>
          </div>
        </div>
      </section>

      <section className="reflection-section parchment">
        <div className="section-heading">
          <p className="section-number">56–60 PHÚT · LỜI NHẮN GỬI TƯƠNG LAI</p>
          <h2>Lịch sử không chỉ là tên một vị tướng</h2>
        </div>
        <div className="reflection-grid">
          <div className="big-idea">
            <blockquote>“Một dòng sông chỉ trở thành chiến lũy khi con người hiểu nó, tin nhau và cùng hành động.”</blockquote>
            <p>Thông điệp tổng kết của bài học — không phải trích dẫn lịch sử.</p>
          </div>
          <div className="exit-ticket">
            <small>VÉ RỜI LỚP · VIẾT TRONG 60 GIÂY</small>
            <label>Điều khiến em tự hào nhất trong câu chuyện hôm nay là…</label>
            <textarea rows={3} placeholder="Viết một câu của riêng em…" />
            <label>Một câu hỏi em vẫn muốn khám phá là…</label>
            <input placeholder="Lịch sử còn điều gì đang chờ em?" />
          </div>
        </div>
      </section>

      <section className="evidence-section">
        <div>
          <p className="section-number">GÓC NHÀ SỬ HỌC</p>
          <h2>Sử liệu, hiện vật và truyền thuyết</h2>
        </div>
        <div className="evidence-cards">
          <article>
            <span className="evidence-tag fact">SỬ LIỆU & HIỆN VẬT</span>
            <h3>Bãi cọc và diễn biến trận đánh</h3>
            <p>Dấu tích bãi cọc, tư liệu sử học và nghiên cứu khảo cổ giúp tái dựng chiến trường — nhưng nhiều chi tiết vẫn tiếp tục được nghiên cứu.</p>
          </article>
          <article>
            <span className="evidence-tag legend">TRUYỀN THUYẾT ĐỊA PHƯƠNG</span>
            <h3>Câu chuyện Vua Bà</h3>
            <p>Chuyện bà bán nước chỉ lịch con nước thể hiện cách cộng đồng ghi nhớ vai trò của người dân. Hãy kể như truyền thuyết, không khẳng định là sự kiện đã kiểm chứng.</p>
          </article>
        </div>
        <div className="sources">
          <b>Nguồn chuẩn bị cho giáo viên:</b>
          <a href="https://baotanglichsu.vn/vi/Articles/3096/18594/tim-hieu-ve-nhung-chiec-coc-bach-djang-nam-1288-hien-djang-trung-bay-o-bao-tang-lich-su-quoc-gia.html" target="_blank" rel="noreferrer">Bảo tàng Lịch sử Quốc gia: cọc Bạch Đằng ↗</a>
          <a href="https://baotanglichsu.vn/VI/Articles/3096/71341/tran-thuy-chien-bach-djang-nhung-manh-ghep.html" target="_blank" rel="noreferrer">Bảo tàng Lịch sử Quốc gia: những mảnh ghép ↗</a>
          <a href="https://vtv.vn/video/hao-khi-ngan-nam-dai-chien-bach-dang-giang-nam-1288-phan-1-248127.htm" target="_blank" rel="noreferrer">VTV: Hào khí ngàn năm ↗</a>
        </div>
      </section>

      <footer>
        <div><b>MẬT LỆNH BẠCH ĐẰNG 1288</b><span>Trải nghiệm học lịch sử tương tác · Lesson 1</span></div>
        <button onClick={() => setTeacherOpen(true)}>Mở giáo án 60 phút</button>
      </footer>

      {teacherOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setTeacherOpen(false)}>
          <aside className="teacher-panel" role="dialog" aria-modal="true" aria-label="Giáo án 60 phút" onMouseDown={(event) => event.stopPropagation()}>
            <div className="panel-header">
              <div><small>CHẾ ĐỘ GIÁO VIÊN</small><h2>Giáo án 60 phút</h2></div>
              <button onClick={() => setTeacherOpen(false)} aria-label="Đóng giáo án">×</button>
            </div>

            <div className="teacher-tools">
              <div><small>ĐỒNG HỒ LỚP</small><strong>{formatTime(seconds)}</strong></div>
              <button onClick={() => setTimerRunning((value) => !value)}>{timerRunning ? "Tạm dừng" : "Bắt đầu"}</button>
              <button onClick={resetTimer}>Đặt lại</button>
              <button onClick={() => window.print()}>In giáo án</button>
            </div>

            <section className="teacher-section">
              <h3>Mục tiêu cuối buổi</h3>
              <ul>
                <li>Kể lại diễn biến trận Bạch Đằng 1288 bằng 5 khung hình.</li>
                <li>Giải thích được ba yếu tố: con người – địa hình – thời cơ.</li>
                <li>Phân biệt được sử liệu/hiện vật với truyền thuyết địa phương.</li>
                <li>Thể hiện niềm tự hào dựa trên trí tuệ, đoàn kết và ý chí bảo vệ quê hương.</li>
              </ul>
            </section>

            <section className="teacher-section">
              <h3>Chuẩn bị tối giản</h3>
              <p>Máy chiếu, loa, video mở sẵn; mỗi đội một tờ A4 và bút. Nếu có: cốc nước trong, đất nặn và 6 que gỗ để mô phỏng cọc.</p>
            </section>

            <section className="run-sheet">
              {[
                ["00–05", "Mở màn bí ẩn", "Tắt bớt đèn, đánh 3 tiếng trống. Đọc hai đoạn mật thư. Cho học sinh giơ tay: đuổi theo hay không? Không tiết lộ đáp án."],
                ["05–12", "Video & câu hỏi lớn", "Xem 2–3 phút video VTV. Dừng và hỏi: Dòng sông có thể trở thành vũ khí bằng cách nào? Ghi mọi giả thuyết lên bảng."],
                ["12–22", "Thám sát theo đội", "Ba đội mở ba điểm trên bản đồ. Mỗi đội có 60 giây giải thích manh mối của mình; đội khác được chất vấn một câu."],
                ["22–34", "Thí nghiệm thủy triều", "Cả lớp điều khiển thanh mực nước. Cho học sinh đứng lên khi thấy thời cơ đánh. Chốt: cọc không tự tạo nên chiến thắng."],
                ["34–45", "Hội đồng tác chiến", "Đội chọn A/B/C, viết hai bằng chứng. Mở diễn biến 5 bước và tạo âm thanh tập thể: xoa tay = nước, vỗ đùi = mái chèo, vỗ tay = tổng công kích."],
                ["45–56", "Giải mã & sử gia", "Làm 3 câu mở khóa. Dành 2 phút phân biệt câu chuyện Vua Bà với bằng chứng khảo cổ. Nhấn mạnh lịch sử luôn cần bằng chứng."],
                ["56–60", "Tự hào có lý do", "Học sinh hoàn thành vé rời lớp. Mời 2 em đọc. Kết bằng câu: tự hào không chỉ vì thắng, mà vì cha ông biết quan sát, đoàn kết và bảo vệ quê hương."],
              ].map(([time, title, detail]) => (
                <article key={time}>
                  <time>{time}</time>
                  <div><h4>{title}</h4><p>{detail}</p></div>
                </article>
              ))}
            </section>

            <section className="teacher-section story-script">
              <h3>Lời kể gợi ý cho cao trào</h3>
              <p>
                “Nước rút. Một đầu cọc nhô lên, rồi mười, rồi hàng trăm. Những chiến thuyền lớn không còn khoảng trống để quay đầu.
                Từ các nhánh sông và hai bên bờ, quân Đại Việt đồng loạt xuất hiện. Chiếc bẫy không đóng lại bằng phép màu — nó đóng lại bằng
                hàng tháng chuẩn bị, bằng người hiểu từng con nước, người đóng từng cọc, người chèo từng mái chèo và người biết chờ đúng một khoảnh khắc.”
              </p>
            </section>

            <section className="teacher-section caution-box">
              <h3>Hai lưu ý quan trọng</h3>
              <p><b>Đừng dạy “chỉ nhờ cọc”.</b> Hãy luôn nối bãi cọc với việc cắt lương, nghi binh, thủy triều, mai phục và sức dân.</p>
              <p><b>Nuôi dưỡng lòng tự hào lành mạnh.</b> Tập trung vào tinh thần bảo vệ độc lập, trí tuệ và đoàn kết; không kích động thái độ thù ghét với bất kỳ dân tộc nào.</p>
            </section>
          </aside>
        </div>
      )}
    </main>
  );
}
