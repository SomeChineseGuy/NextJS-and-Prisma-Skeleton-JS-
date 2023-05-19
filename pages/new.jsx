import { PrismaClient } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useFormik } from "formik";
import City from "./city";

export default function New({ destinations }) {
  // Auth0
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  // formik
  const formik = useFormik({
    initialValues: {
      user: user ? user.email : "Mario",
      country: "",
      city: "",
      gender: "Female",
      openToTravel: "Heck Yeah!",
    },
    //submit form
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // console.log(formik.city);
  return (
    <section className="pt-48 bg-orange-100 w-full h-[800px] flex items-center justify-center">
      <section className="flex border-solid border-blue-800 border-4 w-[1100px] h-[600px]">
        <article className="basis-1/2 px-4 ">
          <h2 className="font-extrabold text-3xl">New Adventure</h2>
          <div>
            <form onSubmit={formik.handleSubmit}>
              {/* <input type="text" className="hidden" value={user.email} /> */}
              <div className="mt-6">
                {/* Country Field */}
                <div className="pb-4">
                  <label className="block pb-2" htmlFor="country">
                    Country:
                  </label>
                  <select
                    className="border-2 border-blue-200 p-2 rounded-md focus:border-[#EE8162] focus:ring-blue-600 w-1/2 hover:shadow-sm hover:shadow-blue-800"
                    name="country"
                    onChange={formik.handleChange}
                  >
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
                    onChange={formik.handleChange}
                  >
                    {/* logic to filter city by country */}
                    {destinations
                      .filter(
                        (destination) =>
                          destination.country === formik.values.country
                      )
                      .map((destination) => (
                        <option>{destination.city}</option>
                      ))}
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
                      onChange={formik.handleChange}
                    >
                      <option>Female</option>
                      <option>Male</option>
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
                      onChange={formik.handleChange}
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
