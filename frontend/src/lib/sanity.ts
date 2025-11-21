import { createClient, type ClientConfig } from "@sanity/client";

// Validate required environment variables
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string;
if (!projectId) {
  throw new Error("PUBLIC_SANITY_PROJECT_ID environment variable is required");
}

// Build client configuration based on environment
const isDevelopment =
  import.meta.env.MODE === "development" || import.meta.env.DEV;
const token = import.meta.env.SANITY_API_READ_TOKEN;

if (isDevelopment && !token) {
  console.warn(
    "SANITY_API_READ_TOKEN not set - viewing published content only in development"
  );
}

const config: ClientConfig = {
  projectId: projectId,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || "2025-11-20",
  useCdn: !isDevelopment,
  perspective:
    isDevelopment && token ? ("drafts" as const) : ("published" as const),
  ...(token && { token }),
};

export default createClient(config);
