import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mật lệnh Bạch Đằng 1288 | Lịch sử tương tác",
  description: "Một lesson 60 phút giàu tương tác giúp trẻ khám phá chiến thắng Bạch Đằng năm 1288 qua câu chuyện, bản đồ, thủy triều và quyết định chiến thuật.",
  openGraph: {
    title: "Mật lệnh Bạch Đằng 1288",
    description: "Một con nước. Một trận địa vô hình. Một trải nghiệm lịch sử tương tác.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Mật lệnh Bạch Đằng 1288" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mật lệnh Bạch Đằng 1288",
    description: "Một trải nghiệm lịch sử tương tác dành cho lớp học.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
