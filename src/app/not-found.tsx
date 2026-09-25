import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-navy-900 px-5 pt-24 text-center text-white">
      <div>
        <p className="display text-8xl text-accent">404</p>
        <h1 className="display mt-4 text-4xl">Тази страница я няма.</h1>
        <Link href="/" className="btn-primary mt-8">Към началото →</Link>
      </div>
    </section>
  );
}
