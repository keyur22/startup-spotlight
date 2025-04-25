// import NextAuth from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';

// // const handler = NextAuth({
// //   providers: [
// //     GitHubProvider({
// //       clientId: process.env.GITHUB_ID as string,
// //       clientSecret: process.env.GITHUB_SECRET as string
// //     })
// //   ]
// // });

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string
//     })
//     // ...add more providers here
//   ]
// };

// export default NextAuth(authOptions);

// // export { handler as GET, handler as POST };
import { handlers } from '@/auth'; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
