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
          <h2>left side picture of city with id {city["city"]}</h2>

          <Image
            src={city["photo"]}
            width="200"
            height="200"
            alt="city photo"
            priority
          />
        </div>
        <div className="basis-1/2 mx-auto">
          <h2>right side</h2>
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
