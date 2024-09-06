const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-green-50 min-h-screen relative min-w-max">
        <main className=" px-4 pt-24 mx-auto w-11/12 max-w-[400px]">{children}</main>
      </body>
    </html>
  );
}

export default AuthLayout;