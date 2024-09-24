const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main
    className="min-h-screen relative min-w-max mx-auto w-full max-w-[400px]"
    style={{
      boxShadow: '0 14px 28px #0000001a, 0 10px 10px #0000001a',
    }}
  >
      {children}
    </main>
  );
};

export default AuthLayout;
