import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

function Header() {
  const User = {
    name: "John",
  };
  const { cart } = useCart();
  const Logout = () => {
    // Log out logic goes here
    console.log("User logged out");
  };
  return (
    <div className=" font-quicksand border-b-2 border-[#e72929] flex justify-between ">
      <Link className=" font-bold p-[1rem]" to={"/"}>
        Food Mine!
      </Link>
      <nav className=" ">
        <ul className=" flex">
          {User ? (
            <li>
              <Link
                to={"/profile"}
                id="dropdownHoverButton"
                data-dropdown-toggle="dropdownHover"
                data-dropdown-trigger="hover"
                className=" hover:bg-[#e72929] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center "
                type="button"
              >
                {User.name}
              </Link>

              <div
                id="dropdownHover"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <Link
                      to="/proflie"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/orders"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      orders
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={Logout}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      logout
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Link to={"/login"}>Login</Link>
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
