//app/api/callback/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Missing `code` parameter from GitHub." },
        { status: 400 }
      );
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      console.error("Missing env vars:", {
        clientId: !!clientId,
        clientSecret: !!clientSecret,
        redirectUri: !!redirectUri,
      });
      return NextResponse.json(
        { error: "Server is missing OAuth environment variables." },
        { status: 500 }
      );
    }

    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      }
    );

    const tokenData = await tokenRes.json();
    console.log("GitHub token response:", tokenData);

    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "GitHub did not return an access token.",
          details: tokenData,
        },
        { status: 500 }
      );
    }

    //NextResponse.redirect needs an absolute URL based on origin
    const redirectUrl = new URL("/profile", url.origin);
    redirectUrl.searchParams.set("access_token", accessToken);

    return NextResponse.redirect(redirectUrl.toString());
  } catch (err) {
    console.error("Unexpected error in /api/callback:", err);
    return NextResponse.json(
      { error: "Unexpected error in callback route." },
      { status: 500 }
    );
  }
}
