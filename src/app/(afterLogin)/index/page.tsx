// "use client";
import Button from "@/app/_component/Button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Link href={"/"}>
        <Button size="S" variant="bg-blue">
          Home
        </Button>
      </Link>

      <Button size="S" variant="bg-blue" disabled>
        Button
      </Button>

      <Button
        size="S"
        variant="bg-gray"
        containerStyles={"rounded-none py-3 px-5"}
      >
        Custom Button
      </Button>

      <Button size="S" variant="bg-transparent">
        Ghost Button
      </Button>
    </div>
  );
}
