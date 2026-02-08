import { Link } from "react-router-dom";

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center text-white">
      <Link to="/dashboard" className="font-bold text-xl">AI Platform</Link>
      <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;
