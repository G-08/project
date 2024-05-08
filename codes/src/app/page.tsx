import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>FitGym</h1>
      <Link href="/register">registrati</Link>
    </main>
  );
}
