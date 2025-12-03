//app/page.tsx
export default function Home() {
  const redirect = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&scope=read:user`;

  return (
    <main className="p-8">
      <a
        className="bg-black text-white px-4 py-2 rounded"
        href={redirect}
      >
        Sign in with GitHub
      </a>
    </main>
  );
}
