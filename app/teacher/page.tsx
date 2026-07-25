"use client";

import { useEffect, useState } from "react";

const runSheet = [
  {
    time: "00–02′",
    slide: "Bìa truyện",
    title: "Mở màn bằng tiếng trống",
    teacher: "Tắt bớt đèn. Phát tiếng trống. Nói: “Trước khi giải mật lệnh, chúng ta sẽ bước vào một câu chuyện có thật.”",
    student: "Lắng nghe, quan sát, chưa ghi chép.",
  },
  {
    time: "02–11′",
    slide: "Trang 1–7",
    title: "Lật sách kể chuyện",
    teacher: "Mỗi trang mở bằng toàn cảnh. Dừng 5–8 giây để học sinh nhìn tranh và đọc mốc thời gian, hỏi một câu dự đoán thật ngắn, rồi bấm Hiện lời kể. Kể trong 45–60 giây và mới bấm tiếp để lật trang.",
    student: "Quan sát tranh trước, dự đoán diễn biến, rồi nghe lời kể để kiểm tra dự đoán.",
  },
  {
    time: "11–16′",
    slide: "Slide 02–05",
    title: "Hồ sơ lịch sử trong 5 phút",
    teacher: "Cho lớp đọc to ngày 9-4-1288. Bấm lần lượt hai đạo quân, gọi tên Trần Quốc Tuấn và Ô Mã Nhi. Ở slide người hùng, hỏi: “Một vị tướng có thể tự mình thắng trận không?” rồi mở đáp án Quân dân Đại Việt.",
    student: "Ghi nhớ ngày – hai phía – người chỉ huy – ý nghĩa bằng bốn câu thật ngắn.",
  },
  {
    time: "16–21′",
    slide: "06",
    title: "Nhập vai hạm đội địch",
    teacher: "Bấm Bắt đầu hành trình và để cảnh dừng ở Mồi nhử. Cho lớp ra lệnh Đuổi theo/Dừng quan sát, rồi chạy tiếp đến khi bãi cọc lộ ra. Chốt bằng câu hỏi: “Ta đã nhìn thấy gì, và điều gì đã bị che giấu?”",
    student: "Quan sát từ boong tàu địch, ra quyết định và giải thích vì sao mình bị bất ngờ.",
  },
  {
    time: "21–24′",
    slide: "07",
    title: "Xem đúng một đoạn phim",
    teacher: "Mở phim VTV từ 00:40 đến 03:10. Dừng lại và hỏi: “Dòng sông trở thành vũ khí bằng cách nào?”",
    student: "Ghi đúng ba từ khóa nghe được.",
  },
  {
    time: "24–31′",
    slide: "08",
    title: "Mở ba manh mối",
    teacher: "Chia lớp thành ba đội: Cắt lương – Giấu cọc – Phục binh. Mỗi đội giải thích vai trò của manh mối trong 30 giây.",
    student: "Thảo luận nhóm và nối ba mắt xích.",
  },
  {
    time: "31–39′",
    slide: "09",
    title: "Điều khiển con nước",
    teacher: "Kéo thanh thủy triều thật chậm. Khi học sinh thấy đúng thời cơ, cả lớp đứng dậy. Chốt: cọc chỉ hiệu quả khi kết hợp với thủy triều và nghi binh.",
    student: "Quan sát, dự đoán, hô “Thời cơ!”",
  },
  {
    time: "39–46′",
    slide: "10",
    title: "Hội đồng tác chiến",
    teacher: "Mỗi đội chọn A/B/C và đưa ra hai bằng chứng. Sau khi chọn, yêu cầu đội khác tìm một lỗ hổng trong phương án.",
    student: "Ra quyết định và phản biện.",
  },
  {
    time: "46–52′",
    slide: "11",
    title: "Kể trận đánh bằng năm nhịp",
    teacher: "Bấm từng nhịp. Cả lớp tạo âm thanh: xoa tay = nước; vỗ đùi = mái chèo; vỗ tay = tổng công kích.",
    student: "Kể lại năm bước bằng lời của mình.",
  },
  {
    time: "52–57′",
    slide: "12",
    title: "Mở ba chìa khóa",
    teacher: "Mời ba học sinh giải thích: Con người – Địa hình – Thời cơ. Nhấn mạnh đây là chiến thắng của sự phối hợp và sức dân.",
    student: "Mỗi em giải thích một chìa khóa.",
  },
  {
    time: "57–60′",
    slide: "13",
    title: "Tự hào có lý do",
    teacher: "Cho 60 giây viết. Mời hai em đọc. Kết: “Ta tự hào vì cha ông biết quan sát, đoàn kết và bảo vệ quê hương bằng trí tuệ.”",
    student: "Hoàn thành vé rời lớp.",
  },
];

function formatTime(value: number) {
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const seconds = (value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function TeacherPlan() {
  const [seconds, setSeconds] = useState(3600);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [running, seconds]);

  return (
    <main className="teacher-page">
      <nav className="teacher-nav">
        <a href="/">← Mở slide</a>
        <div className="teacher-timer">
          <strong>{formatTime(seconds)}</strong>
          <button onClick={() => setRunning((value) => !value)}>{running ? "Dừng" : "Chạy"}</button>
          <button onClick={() => { setRunning(false); setSeconds(3600); }}>Đặt lại</button>
        </div>
        <button onClick={() => window.print()}>In kế hoạch</button>
      </nav>

      <header className="teacher-hero">
        <p>KẾ HOẠCH DẠY HỌC</p>
        <h1>Mật lệnh<br />Bạch Đằng 1288</h1>
        <div className="teacher-meta"><span>60 phút</span><span>7 trang truyện + 13 slide</span><span>9–15 tuổi</span></div>
      </header>

      <section className="teacher-grid two-columns">
        <article>
          <p className="teacher-eyebrow">MỤC TIÊU</p>
          <h2>Sau buổi học, học sinh có thể…</h2>
          <ol className="goal-list">
            <li><span>01</span>Kể lại trận đánh bằng năm bước.</li>
            <li><span>02</span>Giải thích ba yếu tố: con người, địa hình, thời cơ.</li>
            <li><span>03</span>Phân biệt bằng chứng lịch sử với truyền thuyết.</li>
            <li><span>04</span>Thể hiện niềm tự hào dựa trên trí tuệ và đoàn kết.</li>
          </ol>
        </article>
        <article className="prep-card">
          <p className="teacher-eyebrow">CHUẨN BỊ TRƯỚC GIỜ</p>
          <h2>5 phút là đủ</h2>
          <ul>
            <li>Mở slide và trang kế hoạch ở hai tab.</li>
            <li>Lật thử một trang truyện bằng nút hoặc phím mũi tên.</li>
            <li>Thử nút <b>Trống trận</b> một lần.</li>
            <li>Mở sẵn phim VTV tại mốc <b>00:40</b>.</li>
            <li>Mỗi đội có một tờ A4 và bút.</li>
            <li>Trên bảng viết: <b>Con người – Địa hình – Thời cơ</b>.</li>
          </ul>
        </article>
      </section>

      <section className="video-plan">
        <div>
          <p className="teacher-eyebrow">ĐOẠN PHIM KHUYẾN NGHỊ</p>
          <h2>00:40 → 03:10</h2>
          <p>Chỉ xem 2 phút 30 giây. Dừng khi kế hoạch cọc – thủy triều vừa rõ, trước khi phim kể hết kết quả.</p>
          <small>Mốc có thể lệch vài giây nếu VTV thay phần mở đầu.</small>
        </div>
        <a href="https://vtv.vn/video/hao-khi-ngan-nam-dai-chien-bach-dang-giang-nam-1288-phan-1-248127.htm" target="_blank" rel="noreferrer">Mở phim VTV ↗</a>
      </section>

      <section className="run-sheet-section">
        <p className="teacher-eyebrow">KỊCH BẢN 60 PHÚT</p>
        <h2>Đi đúng nhịp, không sa vào đọc chữ</h2>
        <div className="run-sheet-table">
          {runSheet.map((row) => (
            <article key={row.time}>
              <div className="run-time"><strong>{row.time}</strong><span>{/^\d+$/.test(row.slide) ? `Slide ${row.slide}` : row.slide}</span></div>
              <div className="run-title"><h3>{row.title}</h3></div>
              <div><b>Giáo viên</b><p>{row.teacher}</p></div>
              <div><b>Học sinh</b><p>{row.student}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="teacher-grid two-columns">
        <article className="story-script-card">
          <p className="teacher-eyebrow">CÁCH KỂ FLIPBOOK</p>
          <h2>Nhìn học sinh, không nhìn màn hình</h2>
          <blockquote>
            “Đừng đọc đều giọng. Ở trang kế sách, nói chậm như đang tiết lộ một bí mật. Khi đoàn thuyền đuổi sâu, tăng nhịp. Đến lúc nước rút, hạ giọng rồi dừng hai giây trước câu ‘Một đầu cọc nhô lên’. Ở bình minh chiến thắng, chậm lại và hỏi học sinh điều gì làm các em tự hào.”
          </blockquote>
        </article>
        <article className="history-note-card">
          <p className="teacher-eyebrow">NÓI CHO CHÍNH XÁC</p>
          <h2>Ba lưu ý lịch sử</h2>
          <ul>
            <li>Trận quyết chiến diễn ra từ sáng đến chiều <b>9-4-1288</b>; toàn chiến dịch kéo dài từ 30-3 đến 9-4-1288.</li>
            <li>Trần Hưng Đạo là người chỉ huy trung tâm, nhưng chiến thắng thuộc về sự phối hợp của vua, tướng sĩ và nhân dân Đại Việt.</li>
            <li>Không dạy rằng chiến thắng “chỉ nhờ cọc”.</li>
            <li>Câu chuyện Vua Bà là <b>truyền thuyết địa phương</b>.</li>
            <li>Tập trung vào bảo vệ độc lập; không nuôi dưỡng thù ghét dân tộc.</li>
          </ul>
        </article>
      </section>

      <section className="teacher-sources">
        <h2>Nguồn và bản quyền</h2>
        <p>Nội dung lịch sử dựa trên tư liệu của Bảo tàng Lịch sử Quốc gia. Tiếng “Drums of war call” tải từ Mixkit, dùng theo Mixkit License.</p>
        <div>
          <a href="https://baotanglichsu.vn/vi/Articles/3096/18594/tim-hieu-ve-nhung-chiec-coc-bach-djang-nam-1288-hien-djang-trung-bay-o-bao-tang-lich-su-quoc-gia.html" target="_blank" rel="noreferrer">Cọc Bạch Đằng ↗</a>
          <a href="https://baotanglichsu.vn/VI/Articles/3096/71341/tran-thuy-chien-bach-djang-nhung-manh-ghep.html" target="_blank" rel="noreferrer">Những mảnh ghép trận đánh ↗</a>
          <a href="https://www.qdnd.vn/quoc-phong-an-ninh/xay-dung-quan-doi/tran-quyet-chien-chien-luoc-mau-muc-tren-song-bach-dang-439022" target="_blank" rel="noreferrer">Mốc 9-4-1288 ↗</a>
          <a href="https://www.qdnd.vn/quoc-phong-an-ninh/xay-dung-quan-doi/danh-vao-cho-yeu-cua-giac-trong-tran-bach-dang-4-1288-438616" target="_blank" rel="noreferrer">Nhân vật và diễn biến ↗</a>
          <a href="https://mixkit.co/free-sound-effects/war/" target="_blank" rel="noreferrer">Nguồn tiếng trống ↗</a>
        </div>
      </section>
    </main>
  );
}
