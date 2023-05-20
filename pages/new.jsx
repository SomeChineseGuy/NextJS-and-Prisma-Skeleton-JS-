import { PrismaClient } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useFormik } from "formik";
import City from "./city";
import { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";

export default function New({ destinations }) {
  // Auth0
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const [formValue, setFormValue] = useState({
    user: user ? user.email : "Mario",
  });
  // form handlers and states
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  console.log("form value", formValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objValidation = Object.keys(formValue).filter(
      (value) => !formValue[value]
    );
    console.log(objValidation);
    if (objValidation.length === 0 && Object.keys(formValue).length === 4) {
      await fetch("/api/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValue),
      });
    }
  };

  const hotDestinations = destinations.slice(0, 4);

  // const formik = useFormik({
  //   initialValues: {
  //     user: user ? user.email : "Mario",
  //     country: "France",
  //     city: "Paris",
  //     gender: "Female",
  //     openToTravel: "true",
  //   },
  //   //submit form
  //   onSubmit: async (values) => {
  //     console.log(values);
  //     await fetch("/api/new", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(values),
  //     });
  //   },
  // });
  // console.log(formik.city);
  return (
    <section className="pt-48 bg-orange-100 w-full h-[800px] flex items-center justify-center">
      <section className="flex items-start pt-5 shadow-2xl bg-gradient-to-r from-slate-200 to-slate-500 rounded-2xl w-[1100px] h-[600px]">
        <article className="basis-1/2 px-4 text-center ">
          <h2 className="font-extrabold text-3xl">New Adventure</h2>
          <div>
            <form onSubmit={handleSubmit}>
              <input type="text" className="hidden" value={user} />
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

                    {destinations.map((destination) => (
                      <option>{destination.country}</option>
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
                        <option value={destination.id}>
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
                  </select>
                </div>
                <button
                  className="bg-blue-600 text-white m-1 py-3 w-1/2 rounded-lg"
                  type="submit"
                >
                  let's travel!
                </button>
                <button
                  className="bg-red-300 text-white m-1 py-3 w-1/2 rounded-lg"
                  onClick={() => setFormValue({})}
                >
                  Clear From
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
                className="h-[225px] w-[225px] m-4 bg-contain rounded-[25%]"
                style={{ backgroundImage: `url(${hotDestination["photo"]})` }}
              >
                <div className="shadow-md shadow-slate-950 h-[30px] w-[100px] rounded-md bg-white">
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

export async function getStaticProps() {
  const prisma = new PrismaClient();
  // const users = await prisma.user.findMany();
  const destinations = await prisma.destination.findMany({
    distinct: ["country"],
  });
  return {
    props: { destinations },
  };
}
