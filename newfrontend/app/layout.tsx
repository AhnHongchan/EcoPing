export const metadata = {
  title: 'My Web App',
  description: 'Generated by create next app',
  manifest: '/manifest.json',
};

const GlobalLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html>
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
}

export default GlobalLayout;
