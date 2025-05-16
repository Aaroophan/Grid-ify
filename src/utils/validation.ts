import { z } from 'zod';

export const pointSchema = z.object({
  x: z.coerce.number(),
  y: z.coerce.number(),
  z: z.coerce.number(),
});

export type PointInput = z.infer<typeof pointSchema>;

export const validatePoint = (point: unknown): { success: boolean; error?: string } => {
  try {
    pointSchema.parse(point);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => `${e.path}: ${e.message}`).join(', ')
      };
    }
    return { success: false, error: 'Invalid point data' };
  }
};