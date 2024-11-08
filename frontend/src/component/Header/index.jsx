import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <div className=" font-quicksand border-b-2 border-[#e72929] flex justify-between ">
      <Link className=" font-bold p-[1rem]" to={"/"}>
        Food Mine!
      </Link>
      <nav className=" ">
        <ul className=" flex">
          {user ? (
            <li className="relative group">
              <Link
                to={"/dashboard"}
                id="dropdownHoverButton"
                className="hover:bg-[#e72929] hover:text-white  focus:outline-none font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center"
                type="button"
              >
                {user.name}
              </Link>

              <div
                id="dropdownHover"
                className="absolute hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-10"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/orders"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={logout}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Link
              className="hover:bg-[#e72929] hover:text-white  focus:outline-none font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center"
              to={"/login"}
            >
              Login
            </Link>
          )}
          <li className=" hover:bg-[#e72929] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center ">
            <Link to={"/cart"}>
              Cart
              {cart.TotalCount > 0 && (
                <span className="font-bold text-red-500 px-2 py-1 mx-1 rounded-lg bg-gray-100 text-sm">
                  {" "}
                  {cart.TotalCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
