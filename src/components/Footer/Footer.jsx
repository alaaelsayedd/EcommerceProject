function Footer() {
  return (
    <>
      <div className="p-3  bg-gray-100 ">
        <div className="container mx-auto ">
          <div className=" p-3">
            <h3 className="text-xl">Get the Fresh Cart App</h3>
            <p className="text-gray-500">
              we will send you a link open it in your phone to download the app
            </p>
          </div>
          <div>
            <form>
              <div className="grid gap-4 mb-6 md:grid-cols-4 w-full ">
                <div className="mb-6 col-span-3">
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="john.doe@company.com"
                   
                  />
                </div>
                <div className="w-full">
                <button
                  type="button"
                  className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-ful sm:w-auto  p-2.5 px-16  text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                 Share App Link
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
