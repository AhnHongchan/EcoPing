const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen relative min-w-max px-4 pt-24 mx-auto w-11/12 max-w-[400px]">
      {children}
    </main>
  );
};

export default AuthLayout;
