const Header = () => {
  const pathName = location.pathname;

  return (
    <>
      <header className="flex items-center justify-center p-5">
        <h1 className="text-2xl font-semibold uppercase">
          {pathName == "/dashboard/users" ? "Users" : "Dashboard"}
        </h1>
      </header>
    </>
  );
};

export default Header;
