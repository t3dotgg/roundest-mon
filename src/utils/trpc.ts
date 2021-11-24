import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@/backend/router";

export const trpc = createReactQueryHooks<AppRouter>();
