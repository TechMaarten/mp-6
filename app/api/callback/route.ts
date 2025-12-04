import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  //If no code is returned from GitHub, show error
  if (!code) return NextResponse.json({ error: "No code provided" });

  //Exchange authorization code for access token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: process.env.OAUTH_REDIRECT_URI,
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  // Fetch user info from GitHub API
  const userRes = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const user = await userRes.json();

  console.log("Token data:", tokenData);
  console.log("User data:", user);
  
  //Redirect to profile page with user data in query params
  return NextResponse.redirect(
    new URL(
      `/profile?login=${user.login}&avatar=${user.avatar_url}&url=${user.html_url}&repos=${user.public_repos}&followers=${user.followers}`,
      req.url
    )
  );
}
