import { PrismaClient } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/router";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

export default function New({ users, destinations }) {
  // Auth0
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  //router
  const router = useRouter();
  //state
  const [formValue, setFormValue] = useState({
    user: user ? users["id"] : "Mario", //to be removed?
  });
  // form handlers and states
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  //filtering for unique countries
  const mySet = new Set();
  const countries = [];
  destinations.map((destination) => mySet.add(destination["country"]));
  for (const item of mySet) {
    countries.push(item);
  }

  const hotDestinations = destinations.slice(0, 4);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objValidation = Object.keys(formValue).filter(
      (value) => !formValue[value]
    );
    if (objValidation.length === 0 && Object.keys(formValue).length === 4) {
      const { data } = await axios.post(
        "http://localhost:3000/api/new",
        formValue
      );
      router.push({
        pathname: "/match",
        query: {
          gender_preference: JSON.stringify(
            `${formValue["gender_preference"]}`
          ),
          adventure_info: JSON.stringify(data),
          user_1: JSON.stringify(formValue["user"]),
        },
      });
    }
  };

  return (
    <section className="pt-48 bg-orange-100 w-full h-[800px] flex items-center justify-center">
      <section className="flex items-start pt-5 shadow-2xl hover:shadow-inner bg-gradient-to-r from-[#FFD482] to-[#EE8162] rounded-2xl w-[1100px] h-[600px]">
        <article className="basis-1/2 px-4 text-center ">
          <h2 className="font-extrabold text-3xl">New Adventure</h2>
          <div>
            <form onSubmit={handleSubmit}>
              <input type="text" className="hidden" value={users.id} />
              <div className="mt-6">
                {/* Country Field */}
                <div className="pb-4">
                  <label className="block pb-2" htmlFor="country">
                    Country:
                  </label>
                  <select
                    className="border-2 border-blue-200 p-2 rounded-md focus:border-[#EE8162] focus:ring-blue-600 w-1/2 hover:shadow-sm hover:shadow-blue-800"
                    name="country"
                    onChange={handleChange}
                    value={formValue["country"]}
                  >
                    <option value={""}>-- select an option --</option>

                    {countries.map((destination) => (
                      <option>{destination}</option>
                    ))}
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
                    onChange={handleChange}
                    value={formValue["city"]}
                  >
                    <option value={""}> -- select an option --</option>

                    {/* logic to filter city by country */}
                    {destinations
                      .filter(
                        (destination) =>
                          destination.country === formValue["country"]
                      )
                      .map((destination) => (
                        <option
                          key={destination.id}
                          value={Number(destination["id"])}
                        >
                          {destination.city}
                        </option>
                      ))}
                  </select>
                </div>
                {/* Gender Field */}
                <div className="pb-4">
                  <label className="block pb-2" htmlFor="Gender">
                    Prefered Gender to Travel:
                  </label>
                  <select
                    className="border-2 border-blue-200 p-2 rounded-md focus:border-[#EE8162] focus:ring-blue-600 w-1/2 hover:shadow-sm hover:shadow-blue-800"
                    name="gender_preference"
                    onChange={handleChange}
                  >
                    <option value={""}>-- select an option --</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non Binary</option>
                    <option value="no_preference">No Preference</option>
                  </select>
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
          <div className="flex flex-wrap justify-center ">
            {hotDestinations.map((hotDestination) => (
              <div
                className="h-[225px] w-[225px] m-4 rounded-[25%] bg-cover bg-no-repeat cursor-pointer"
                style={{ backgroundImage: `url(${hotDestination["photo"]})` }}
                key={hotDestination["id"]}
                onClick={() => router.push(`/city/${hotDestination["id"]}`)}
              >
                <div className="shadow-md shadow-slate-950 h-[30px] w-[130px] rounded-md bg-white">
                  <span className="flex justify-center items-center font-bold">
                    <HiLocationMarker /> {hotDestination["city"]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </section>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = await getSession(context.req, context.res);
    const prisma = new PrismaClient();
    const users = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    const destinations = await prisma.destination.findMany({
      orderBy: {
        country: "asc",
      },
    });

    return {
      props: { users, destinations },
    };
  },
});
