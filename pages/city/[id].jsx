import Image from "next/image";
import Gallery from "../components/Gallery";
import { data } from "../components/mockData";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function CityId({ users, destinations }) {
  const router = useRouter();
  const myIndex = destinations.filter(
    (destination) => destination["id"] === Number(router.query.id)
  );
  const city = myIndex[0];

  // const city = destinations.filter(
  //   (destination) => destination["id"] === router.query.id
  // );
  console.log("router query", router.query.id);
  console.log("city", city);
  console.log("myIndex:", myIndex);

  return (
    <section className="pt-48 sm:pt-36 w-full h-[860px]  bg-orange-100">
      <section className="flex flex-col sm:flex-row justify-evenly">
        <div className="basis-1/2 lg:px-16 p-8 ml-[15px]">
          <div className="h-[558] w-[525] flex justify-center">
            <Image
              src={city["photo"]}
              width="525"
              height="558"
              alt="City Photo"
              className="object-fill rounded-[20%] h-[558] w-[525]"
            />
          </div>
        </div>
        <div className="basis-1/2 mx-auto">
          <h1 className="text-6xl text-black text-left px-16 pt-16 pb-4 font-bold">
            {city["city"]} <br />
            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5271ff] to-[#5271ee]">
              {city["country"]}
            </span>
          </h1>
          <p className="text-gray-500 px-16 text-lg">{city["description"]}</p>
        </div>
      </section>
      <Gallery data={destinations} />
    </section>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const destinations = await prisma.destination.findMany();
  const users = await prisma.user.findMany();
  return {
    props: { users, destinations },
  };
}
