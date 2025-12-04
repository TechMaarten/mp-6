"use client";

export default function Home() {
  // Function to redirect user to GitHub OAuth authorize URL
  const handleLogin = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI!,
      scope: "read:user user:email",
      response_type: "code",
    });
    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  };

  return (
    //Centered card with gradient background
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md text-center">
        {/* App title */}
        <h1 className="text-3xl font-extrabold text-gray-900">
          Welcome to Simple OAuth App
        </h1>
        {/* Subtitle */}
        <p className="mt-3 text-gray-600">
          Sign in with GitHub to view your profile details.
        </p>

        {/* Sign-in button */}
        <button
          onClick={handleLogin}
          className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Sign in with GitHub
        </button>

        {/* Small disclaimer */}
        <p className="mt-4 text-xs text-gray-400">
          Your information is only used for this demo.
        </p>
      </div>
    </div>
  );
}
