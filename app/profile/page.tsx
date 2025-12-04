"use client";
import { useSearchParams } from "next/navigation";

export default function Profile() {
  //Read query parameters passed from callback route
  const params = useSearchParams();
  const login = params.get("login");
  const avatar = params.get("avatar");
  const url = params.get("url");
  const repos = params.get("repos");
  const followers = params.get("followers");

  return (
    //Centered card with gradient background
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md text-center">
        {/* User avatar */}
        {avatar && (
          <img
            src={avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
          />
        )}
        {/* Username */}
        <h2 className="mt-4 text-2xl font-extrabold text-gray-900">{login}</h2>

        {/* Link to GitHub profile */}
        {url && (
          <p className="mt-2">
            <a
              href={url}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              View GitHub Profile
            </a>
          </p>
        )}

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium">Public Repos</p>
            <p className="text-xl font-semibold">{repos}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium">Followers</p>
            <p className="text-xl font-semibold">{followers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
