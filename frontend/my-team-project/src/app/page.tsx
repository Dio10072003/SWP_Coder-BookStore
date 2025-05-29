import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-mono font-bold mb-4 text-accent">
        CodeCrafters: Dev Squadron
      </h1>
      <p className="text-lg text-foreground mb-8 max-w-lg text-center font-mono">
        &gt; Initializing team matrix... Meet our elite coders hacking the web&apos;s future!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/member1">
          <div className="card">
            <h2 className="text-2xl font-mono font-semibold text-foreground">CyberSmith</h2>
            <p className="text-highlight">Full-stack wizard; conjures TypeScript spells</p>
          </div>
        </Link>
        <Link href="/member2">
          <div className="card">
            <h2 className="text-2xl font-mono font-semibold text-foreground">PixelNinja</h2>
            <p className="text-highlight">Frontend sensei; crafts pixel-perfect UIs</p>
          </div>
        </Link>
        <Link href="/member3">
          <div className="card">
            <h2 className="text-2xl font-mono font-semibold text-foreground">DataHawk</h2>
            <p className="text-highlight">Backend alchemist; masters APIs & databases</p>
          </div>
        </Link>
        <Link href="/member4">
          <div className="card">
            <h2 className="text-2xl font-mono font-semibold text-foreground">CloudRider</h2>
            <p className="text-highlight">DevOps guru; deploys with zero downtime</p>
          </div>
        </Link>
      </div>
    </div>
  );
}