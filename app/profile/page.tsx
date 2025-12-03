//app/profile/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type GitHubUser = {
  avatar_url?: string;
  name?: string;
  login?: string;
  email?: string;
};

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("access_token");

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //If there is no token in the URL, show a friendly message
  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError(
        "No access token was found in the URL. Please go back and sign in again."
      );
    }
  }, [token]);

  // Fetch GitHub user when we have a token
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch GitHub user");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("There was a problem fetching your GitHub profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-slate-700">Loading your GitHub profile...</p>
      </main>
    );
  }

  if (error || !token) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-xl font-semibold mb-4">Profile Error</h1>
          <p className="text-sm text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-900 hover:bg-slate-900 hover:text-white transition"
          >
            Go back home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        {user?.avatar_url && (
          <img
            src={user.avatar_url}
            alt="GitHub avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}

        <h1 className="text-2xl font-semibold mb-2">
          {user?.name || "No name provided"}
        </h1>
        {user?.login && (
          <p className="text-slate-700 mb-1">@{user.login}</p>
        )}
        {user?.email && (
          <p className="text-slate-700 mb-1">Email: {user.email}</p>
        )}

        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-900 hover:bg-slate-900 hover:text-white transition mt-4"
        >
          Sign out (go home)
        </button>
      </div>
    </main>
  );
}
