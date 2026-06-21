import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const navLinks = [
  { id: 1, label: "Dashboard", path: "/dashboard" },
  { id: 2, label: "Settings", path: "/dashboard/settings" },
  { id: 3, label: "Go to home", path: "/" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <section className="min-h-screen max-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b h-21 flex justify-between items-center px-10 fixed w-full left-0 right-0 z-40">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          Logo
        </div>
        <div className="flex gap-3 md:gap-4 items-center">
          <button className="w-9 md:w-10 h-9 md:h-10 rounded-full grid place-items-center cursor-pointer border border-[#ECEEF0]">
            N
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden w-9 md:w-10 h-8.5 md:h-9.5 cursor-pointer grid place-items-center rounded text-white bg-blue-500"
          >
            <FaBars className="text-xl md:text-2xl" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex overflow-x-hidden mt-21 h-[calc(100vh-84px)]">
        {/* Sidebar */}
        <aside
          className={`${
            open ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
          } fixed top-0 left-0 z-999 2xl:static max-2xl:h-screen w-72 duration-500 transition-transform border-r bg-white p-5 shrink-0 overflow-y-auto`}
        >
          <p
            onClick={() => navigate("/")}
            className="2xl:hidden cursor-pointer"
          >
            Logo
          </p>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1">
            {navLinks?.map(item => (
              <NavLink
                key={item.id}
                to={item.path}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Outlet */}
        <section className="flex-1 p-5 bg-gray-100 overflow-y-auto">
          <Outlet />
        </section>

        {/* Blur Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-black/30 backdrop-blur-[3px] transition-opacity duration-300 2xl:hidden z-50 ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      </main>
    </section>
  );
}
