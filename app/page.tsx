import Image from "next/image";
import DashboardPage from "./Dashboard/page";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex w-full max-w-5xl flex-col">
        <DashboardPage />
      </div>
    </main>
  );
}
