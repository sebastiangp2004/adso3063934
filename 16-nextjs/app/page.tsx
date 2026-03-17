import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col gap-2 p-4 items-center justify-center">
      <h2 className="text-4xl">Hello Next JS</h2>
      <p className="text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quae illo enim optio, aut, adipisci obcaecati quidem sapiente quod repellat voluptas numquam, amet provident! Blanditiis minima ullam neque illo nesciunt.
      </p>
      <Link href="/signin" className="btn btn-outline">
        Sign In
      </Link>
    </div>
  );
}