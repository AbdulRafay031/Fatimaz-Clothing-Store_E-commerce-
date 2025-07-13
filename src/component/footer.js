import React from "react";

const footer = () => {
  return (
    <footer className="bg-black dark:bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
          <div>
            <h2 className="mb-6 text-xl font-bold uppercase dark:text-white  ">
              Company
            </h2>
            <ul className="-500 dark:-400 font-medium">
              <li className="mb-4">
                <a
                  href="/company/about"
                  className="hover:underline text-gray-300"
                >
                  About
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="/seller/Seller"
                  className="hover:underline text-gray-300"
                >
                  Careers
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="/company/brand-center"
                  className="hover:underline text-gray-300"
                >
                  Brand Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-xl font-bold uppercase dark:text-white ">
              Help center
            </h2>
            <ul className="-500 dark:-400 font-medium">
              <li className="mb-4">
                <a
                  href="/company/fatimaz-community"
                  className="hover:underline text-gray-300"
                >
                  Fatimaz Community
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-gray-300">
                  Twitter
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-gray-300">
                  Facebook
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="/company/contact"
                  className="hover:underline text-gray-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-xl font-bold uppercase dark:text-white ">
              Legal
            </h2>
            <ul className="-500 dark:-400 font-medium">
              <li className="mb-4">
                <a
                  href="/company/privacy-policy"
                  className="hover:underline text-gray-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="/company/terms-and-conditions"
                  className="hover:underline text-gray-300"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="px-4 py-6 bg-black-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm -500 dark:-300 sm:text-center">
            © 2011 <a href="https://flowbite.com/">Fatimaz</a>. All Rights
            Reserved.
          </span>

          <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            <a
              href="https://www.facebook.com/share/14E39V6MMie/"
              className="-400 hover:-900 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="/company/fatimaz-community"
              className="-400 hover:-900 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="https://www.instagram.com/fatimaz031?igsh=dzJmeTY4dHl6dWkw" 
              className="text-gray-400 hover:text-pink-500 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.403a4.902 4.902 0 0 1 1.675 1.093 4.902 4.902 0 0 1 1.093 1.675c.163.46.347 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.43a4.902 4.902 0 0 1-1.093 1.675 4.902 4.902 0 0 1-1.675 1.093c-.46.163-1.26.347-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.403a4.902 4.902 0 0 1-1.675-1.093 4.902 4.902 0 0 1-1.093-1.675c-.163-.46-.347-1.26-.403-2.43-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.43a4.902 4.902 0 0 1 1.093-1.675A4.902 4.902 0 0 1 4.72 2.636c.46-.163 1.26-.347 2.43-.403 1.266-.058 1.646-.07 4.85-.07zm0 1.837c-3.16 0-3.522.012-4.764.07-.987.046-1.524.215-1.877.36a3.066 3.066 0 0 0-1.115.73 3.066 3.066 0 0 0-.73 1.115c-.145.353-.314.89-.36 1.877-.058 1.242-.07 1.604-.07 4.764s.012 3.522.07 4.764c.046.987.215 1.524.36 1.877.174.417.423.8.73 1.115.315.308.698.557 1.115.73.353.145.89.314 1.877.36 1.242.058 1.604.07 4.764.07s3.522-.012 4.764-.07c.987-.046 1.524-.215 1.877-.36a3.066 3.066 0 0 0 1.115-.73 3.066 3.066 0 0 0 .73-1.115c.145-.353.314-.89.36-1.877.058-1.242.07-1.604.07-4.764s-.012-3.522-.07-4.764c-.046-.987-.215-1.524-.36-1.877a3.066 3.066 0 0 0-.73-1.115 3.066 3.066 0 0 0-1.115-.73c-.353-.145-.89-.314-1.877-.36-1.242-.058-1.604-.07-4.764-.07zm0 4.838a5.999 5.999 0 1 1 0 11.998 5.999 5.999 0 0 1 0-11.998zm0 9.9a3.901 3.901 0 1 0 0-7.802 3.901 3.901 0 0 0 0 7.802zm6.406-10.845a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z" />
              </svg>
              <span className="sr-only">Instagram page</span>
            </a>

            <a href="https://github.com/AbdulRafay031" className="-400 hover:-900 dark:hover:text-white">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="" className="-400 hover:-900 dark:hover:text-white">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
