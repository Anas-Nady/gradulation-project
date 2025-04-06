import TrendsSidebar from "./../../../components/TrendsSidebar";
import { Metadata } from "next";
import SearchResults from "./SearchResults";

interface PageProps {
  searchParams: Promise<{ q: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const q = (await searchParams).q;
  return {
    title: `نتائج البحث عن "${decodeURIComponent(q)}"`,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const q = await (await searchParams).q;
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
            نتائج البحث عن &quot;{decodeURIComponent(q)}&quot;
          </h1>
        </div>
        <SearchResults query={decodeURIComponent(q)} />
      </div>
      <TrendsSidebar />
    </main>
  );
}
