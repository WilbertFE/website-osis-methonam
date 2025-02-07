import { Hero, Info, Settings } from "./components";
import { getUserByUsername } from "@/lib/firebase/service";
import Link from "next/link";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const username = (await params).username;
  const user = await getUserByUsername(username);

  // if 404
  if (!user && user !== undefined)
    return (
      <div className="mt-16">
        <h1>User not found 404</h1>
        <Link
          href="/"
          className="text-sm underline text-blue-600 text-center block"
        >
          home
        </Link>
      </div>
    );

  return (
    <>
      {user && (
        <>
          <Hero user={user} />
          <Info user={user} />
          <Settings user={user} />
        </>
      )}
    </>
  );
}
