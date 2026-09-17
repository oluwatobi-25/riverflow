import { Client } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_HOST_URL;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_APPWRITE_HOST_URL or NEXT_PUBLIC_APPWRITE_PROJECT_ID",
  );
}

const client = new Client().setEndpoint(endpoint).setProject(projectId);

export { client };
