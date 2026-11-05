import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { jwt, username } from "better-auth/plugins";
import { oauthProvider } from "@better-auth/oauth-provider";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

export const auth = betterAuth({
  appName: "EMP ID",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: new Pool({ connectionString, max: 5 }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
  },
  user: {
    additionalFields: {
      empId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  session: {
    storeSessionInDatabase: true,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  trustedOrigins: [
    "https://emp-id.vercel.app",
    "https://emp-id-emp-exclusive.vercel.app",
  ],
  disabledPaths: ["/token"],
  plugins: [
    nextCookies(),
    username({
      minUsernameLength: 3,
      maxUsernameLength: 24,
      immutableUsername: true,
      displayUsername: false,
      usernameValidator: (value) =>
        /^[a-zA-Z0-9._]{3,24}$/.test(value) &&
        !["admin", "administrator", "support", "security", "emp", "root"].includes(value.toLowerCase()),
    }),
    jwt(),
    oauthProvider({
      loginPage: "/",
      consentPage: "/consent",
      scopes: ["openid", "profile", "email", "offline_access"],
      customUserInfoClaims: ({ user }) => ({
        ...(user.username ? { preferred_username: user.username } : {}),
        ...(user.empId ? { "https://emp-exclusive.com/claims/emp_id": user.empId } : {}),
      }),
      advertisedMetadata: {
        scopes_supported: ["openid", "profile", "email", "offline_access"],
        claims_supported: [
          "sub", "iss", "aud", "exp", "iat", "sid", "scope", "azp",
          "name", "picture", "given_name", "family_name", "email", "email_verified",
          "preferred_username", "https://emp-exclusive.com/claims/emp_id",
        ],
      },
      clientPrivileges: () => false,
      resourcePrivileges: () => false,
    }),
  ],
});
