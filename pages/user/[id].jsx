import { useRouter } from "next/router";

export default function UserId() {
  const router = useRouter();
  return (
    <div className="pt-48">
      <h1>Welcome to the profile of user {router.query.id}</h1>
      <div
        onClick={() => router.replace("/match")}
        className=" rounded-full bg-blue-500 w-10"
      >
        Back
      </div>
    </div>
  );
}
