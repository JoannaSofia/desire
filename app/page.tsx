import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const starts = [
  {
    href: "/authentication",
    title: "Sign in",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto flex flex-col gap-6 content-center py-24 px-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">Welcome to desired</h1>
          <p>This is the place to learn how to take microsteps towards with you desire instead of working towards the wins that is determined by the outside world.</p>
        </div>
         <section className="flex flex-col items-end">
          
          {starts.map((start) => (
            <Link
              key={start.href}
              href={start.href}
              className="flex flex-col transition hover:-translate-y-1 hover:border-[#D98D82]"
            >
              <Button variant="default" className="bg-[#45214F] text-white">{start.title}</Button>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
