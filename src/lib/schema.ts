import z from "zod";

export const CreateGroupSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters long"),
  category: z.string(),
  description: z.string().optional(),
  privacy: z.enum(["PUBLIC", "PRIVATE"]).default("PRIVATE"),
  thumbnail: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  domain: z.string().optional(),
});