import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Helper function for authentication
const handleAuth = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user) throw new UploadThingError("Unauthorized");
  
  return { userId: user.id };
};

export const ourFileRouter = {
  // Regular image uploader route - allows multiple images
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      return await handleAuth();
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Multiple images upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { uploadedBy: metadata.userId };
    }),

  // Banner image uploader route - allows only one image
  bannerImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      // Only admin can upload banner
      if (!user || user.email !== "razathedream3@gmail.com") {
        throw new UploadThingError("Unauthorized - Admin only");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Banner upload complete for userId:", metadata.userId);
      console.log("Banner URL:", file.url);

      return { 
        uploadedBy: metadata.userId,
        bannerUrl: file.url 
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
