"use client";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "@/components/animations/loading";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { IoOptionsOutline } from "react-icons/io5";
import { TbDeviceHeartMonitorFilled } from "react-icons/tb";
import Devices from "@/components/admin/devices";

// import GoogleMap from "@/components/googleMap";
import dynamic from "next/dynamic";
const GoogleMapCustom = dynamic(() => import("@/components/googleMap"), {
  ssr: false,
  // You can also pass loading component here if needed
});

export default function Page() {
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1); // Track the current page

  const { data: session, status } = useSession();
  const tempDevices = [
    {
      _id: "1",
      location: { lat: 18.463476689982436, long: 73.86833394029176 },
      active: true,
    },
    {
      _id: "2",
      location: { lat: 18.463591812469396, long: 73.86804560282783 },
      active: false,
    },
    // ... other
  ];

  const fetchDevices = () => {
    setLoading(true);
    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    const searchInput = document.getElementById("search-input");

    window.addEventListener("keydown", (event) => {
      if (event.key === "/") {
        event.preventDefault();
        searchInput.focus();
      }
      if (event.key === "Escape") {
        window.location.reload();
        // searchInput.blur();
      }
    });
  }, []); // Remove 'sort' from dependencies

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  return (
    <div className=" min-h-screen">
      <div className="md:flex md:justify-between py-4">
        <div className="md:w-1/2 w-full">
          <h1 className="flex flex-row text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
            Admin Portal
          </h1>
          <p className="text-sm flex text-gray-500 dark:text-gray-400">
            Create, edit, and manage devices.
          </p>
        </div>
        <br />

        <form className="md:w-1/3 w-full ">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              tabIndex="-1"
              type="search"
              id="search-input"
              className="block rounded p-3 pl-10 w-full text-sm text-gray-900 bg-gray-200 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="press '/' to search"
              required
            />
            <button
              type="submit"
              className="text-white absolute rounded right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium text-sm px-2 py-1 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="rounded-lg mx-auto mb-4 w-full px-4 py-2 bg-gray-200 relative overflow-hidden">
        <div className="w-full h-full block">
          <div className="md:flex items-center md:justify-between justify-normal">
            <div className="flex gap-x-4">
              <div className="font-medium text-gray-700 sm:text-base text-sm">
                {/* <IoOptionsOutline className="inline-block mr-2 text-xl" /> */}
                Active Devices
                <span className="px-1 ml-1 text-sm bg-gray-700 rounded text-gray-100">
                  {/* count length of active devices */}
                  {
                    devices.filter((device) => device.status === "active")
                      .length
                  }
                </span>
              </div>
              <div className="font-medium text-gray-700 sm:text-base text-sm">
                {/* <IoOptionsOutline className="inline-block mr-2 text-xl" /> */}
                Inactive Devices
                <span className="px-1 ml-1 text-sm bg-gray-700 rounded text-gray-100">
                  {
                    devices.filter((device) => device.status === "inactive")
                      .length
                  }
                </span>
              </div>
            </div>

            {/* <div className="flex w-1/2">
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-license"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="horizontal-list-radio-license"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Type 1
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-id"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="horizontal-list-radio-id"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Type 2
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-military"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="horizontal-list-radio-military"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Type 3
                    </label>
                  </div>
                </li>
                <li className="w-full dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-passport"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="horizontal-list-radio-passport"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Type 4
                    </label>
                  </div>
                </li>
              </ul>
            </div> */}

            {/* <div className="flex">
              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              >
                <option selected>Choose a Location</option>
                <option value="US">Location 1</option>
                <option value="DE">Location 2</option>
                <option value="FR">Location 3</option>
                <option value="CA">Location 4</option>
              </select>
            </div> */}

            {/* create device button here */}
            <div className="flex">
              <Link
                href="/admin/create"
                className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-2 rounded"
              >
                <TbDeviceHeartMonitorFilled className="inline-block mr-2 " />
                Create Device
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="rounded-lg mx-auto mb-4 w-full p-4 bg-gray-200 relative overflow-hidden">
        <div className="w-full h-full block">
          <div className="md:flex items-center md:justify-between justify-normal">
            <div className="flex">
              <img
                alt="User avatar"
                className="sm:w-10 sm:h-10 h-8 w-8 object-cover bg-gray-50 p-1 rounded-full"
                // src="./logo.png"
                // className="w-12 h-12 mb-3 me-3 rounded-full bg-red-400 sm:mb-0"
                src="https://images.ctfassets.net/o7xu9whrs0u9/1mpMDYVC8k7iFgFzM99SnS/c2dfa0df9cb6d6c8643c60b0657326fe/technology-hl.svg"
              />
              <div className="pl-3">
                <div className="font-medium bg-gray-500 w-fit px-1 rounded text-gray-100 sm:text-base text-sm">
                  No device selected
                </div>
                <div className="text-gray-600 sm:text-sm text-xs">
                  View status, location, and manage settings.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 mb-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {devices.map((deviceDetails) => (
          <Devices
            key={deviceDetails._id}
            deviceDetails={deviceDetails}
            onUpdate={fetchDevices} // Pass fetchDevices as a prop
          />
        ))}
      </div>

      {loading ? <Loading /> : <GoogleMapCustom devices={devices} />}
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
