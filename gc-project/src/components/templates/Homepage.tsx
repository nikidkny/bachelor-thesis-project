import Link from "next/link";

export default function Homepage() {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <Link href="/cases">Go to Cases Page</Link>
    </div>
  );
}
