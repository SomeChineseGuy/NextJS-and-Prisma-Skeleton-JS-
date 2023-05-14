import Image from "next/image";
import Gallery from "../components/Gallery";
import { data } from "../components/mockData";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

export default function CityId({ destinations }) {
  const router = useRouter();
  const city = destinations[router.query.id];

  return (
    <section className="pt-48 sm:pt-36 w-full h-[860px]  bg-orange-100">
      <section className="flex flex-col sm:flex-row justify-evenly">
        <div className="basis-1/2 lg:px-16">
          <div className="h-[558] w-[525] object-contain">
            <Image
              src={city["photo"]}
              width="525"
              height="558"
              alt="City Photo"
              className="ml-16 object-contain rounded-[20%]"
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
      <Gallery data={data} />
    </section>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const destinations = await prisma.destination.findMany();
  return {
    props: { destinations },
  };
}
