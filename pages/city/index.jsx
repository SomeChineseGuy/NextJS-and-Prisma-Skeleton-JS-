import { PrismaClient } from "@prisma/client";

export default function City({ destinations }) {
  console.log(destinations);
  return (
    <div className="pt-48">
      <h1>List of cities</h1>
      <ul>
        {destinations.map((destination) => (
          <li>{destination["city"]}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const destinations = await prisma.destination.findMany();
  return {
    props: { destinations },
  };
}
