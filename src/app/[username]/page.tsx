import { getUserByUsername } from "@/lib/firebase/service";
import Link from "next/link";
import LayoutWrapper from "./LayoutWrapper";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const username = (await params).username;
  const user = await getUserByUsername(username);

  // if 404
  if (user && user.length === 0)
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

  return <>{user && user.length > 0 && <LayoutWrapper user={user[0]} />}</>;
}
