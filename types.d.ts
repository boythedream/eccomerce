// types.d.ts

// This declares global types for your Next.js app
declare global {
  namespace Next {
    export interface PageProps {
      params: {
        id: string;
      };
    }
  }
}
