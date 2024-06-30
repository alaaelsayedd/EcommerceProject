import { useContext } from "react";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../images/freshcart-logo.svg";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { ContContext } from "../../Context/CountCartItem";

const navigation = [
  { name: "Home", href: "/EcommerceProject", current: false },
  { name: `Carts`, href: "cart", current: false },
  { name: "Wishlist", href: "wishlist", current: false },
  { name: "Categories", href: "categories", current: false },
  { name: "Brands", href: "brands", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const { islogin, setLogin } = useContext(authContext);
  const { count } = useContext(ContContext);
  function signOut() {
    window.localStorage.removeItem("token");
    navigate("/EcommerceProject/login");
    setLogin(false);
  }

  return (
    <Disclosure as="nav" className="bg-green-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src={logo} alt="Your Company" />
                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    {islogin &&
                      navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? " text-gray-600 font-bold"
                              : "text-gray-400",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                {islogin ? (
                  <>
                    <button
                      type="button"
                      className="relative rounded-full p-1 ps-2 text-green-500 text-xl"
                      onClick={() => {
                        navigate("/EcommerceProject/cart");
                      }}
                    >
                      <i class="fa-solid fa-cart-shopping"></i>
                      <span>({count})</span>
                    </button>

                    <button
                      type="button"
                      className="relative rounded-full p-1 ps-2  font-bold text-gray-600 "
                      onClick={signOut}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="relative rounded-full p-1 ps-2  font-bold text-gray-600 "
                      onClick={() => {
                        navigate("login");
                      }}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="relative rounded-full p-1 ps-2  font-bold text-gray-600"
                      onClick={() => {
                        navigate("register");
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={classNames(
                    item.current ? " text-gray-600 font-bold" : "text-gray-400",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
