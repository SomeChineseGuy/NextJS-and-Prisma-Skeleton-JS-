import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function New() {
  // Auth0
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="pt-48 bg-orange-100 w-full h-[800px] flex items-center justify-center">
      <section className="flex border-solid border-blue-800 border-4 w-[1100px] h-[600px]">
        <article className="basis-1/2 px-4 ">
          <h2 className="font-extrabold text-3xl">New Adventure</h2>
          <div>
            <form>
              <div className="mt-6">
                {/* Country Field */}
                <div className="pb-4">
                  <label className="block pb-2" htmlFor="country">
                    Country:
                  </label>
                  <select
                    className="border-2 border-blue-200 p-2 rounded-md focus:border-[#EE8162] focus:ring-blue-600 w-1/2 hover:shadow-sm hover:shadow-blue-800"
                    name="country"
                  >
                    <option>Canada</option>
                    <option>United States</option>
                    <option>India</option>
                    <option>Thailand</option>
                  </select>
                </div>
                {/* City Field */}
                <div className="pb-4">
                  <label className="block pb-2" htmlFor="city">
                    City:
                  </label>
                  <select
                    className="border-2 border-blue-200 p-2 rounded-md focus:border-[#EE8162] focus:ring-blue-600 w-1/2 hover:shadow-sm hover:shadow-blue-800"
                    name="city"
                  >
                    <option>Toronto</option>
                    <option>Houston</option>
                    <option>Dehli</option>
                    <option>Phi Phi</option>
                  </select>
                </div>
                {/* Gender Field */}
                <div className="flex w-full">
                  <div className="pb-4">
                    <label className="block pb-2" htmlFor="Gender">
                      Gender:
                    </label>
                    <select
                      className="border-2 border-blue-200 p-2 rounded-md focus:border-[#EE8162] focus:ring-blue-600 w-5/6 hover:shadow-sm hover:shadow-blue-800"
                      name="city"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Non Binary</option>
                    </select>
                  </div>
                  {/* Open to Travel Field */}
                  <div className="pb-4 ml-[15px]">
                    <label className="block pb-2" htmlFor="openToTravel">
                      Open to Travel:
                    </label>
                    <select
                      className="border-2 border-blue-200 p-2 rounded-md focus:border-[#EE8162] focus:ring-blue-600 w-5/6 hover:shadow-sm hover:shadow-blue-800"
                      name="openToTravel"
                    >
                      <option>Heck Yeah!</option>
                      <option>Can't right now</option>
                    </select>
                  </div>
                </div>
                <button
                  className="bg-blue-600 text-white m-1 py-3 w-1/2 rounded-lg"
                  type="submit"
                >
                  let's travel!
                </button>
              </div>
            </form>
          </div>
        </article>
        <article className="basis-1/2 flex flex-col justify-center items-center">
          <h2 className=" font-extrabold text-3xl">Hot Destinations</h2>
          <div className="flex flex-wrap justify-center border-solid border-blue-800 border-4 ">
            <div className="border-solid border-red-700 border-2 h-[225px] w-[225px] m-4"></div>
            <div className="border-solid border-red-700 border-2 h-[225px] w-[225px] m-4"></div>
            <div className="border-solid border-red-700 border-2 h-[225px] w-[225px] m-4"></div>
            <div className="border-solid border-red-700 border-2 h-[225px] w-[225px] m-4"></div>
          </div>
        </article>
      </section>
    </section>
  );
}

{
  /* <div className="pb-4">
  <label className="block pb-2" htmlFor="city">
    City:{" "}
  </label>
  <input
    type="text"
    name="city"
    placeholder="Which city you want to visit?"
    className="border-2 border-blue-200 p-2 rounded-md focus:border-[#EE8162] focus:ring-blue-600 w-1/2 hover:shadow-sm hover:shadow-blue-800"
  />
</div>; */
}
