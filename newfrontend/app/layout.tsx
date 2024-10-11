export const metadata = {
  title: "EcoPing",
  description: "Eco-friendly card app",
  manifest: "/manifest.json",
  icons: {
    icon: "icons/icon.png",
  },
};

const GlobalLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-white"
        style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
};

export default GlobalLayout;
