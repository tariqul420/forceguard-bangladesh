'use server'; // Note: 'use server' is correct for Server Actions in Next.js 13+

import dbConnect from '@/lib/dbConnect';
import Police from '@/models/Police';

interface GetPolicesParams {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getPolice({ search = '', page = 1, limit = 4 }: GetPolicesParams) {
  try {
    await dbConnect();

    // Build the query
    const query: Partial<Record<string, unknown>> = {};
    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch police records with pagination
    const police = await Police.find(query).skip(skip).limit(limit).lean();

    // Get total count for pagination
    const total = await Police.estimatedDocumentCount();
    const hasNextPage = page * limit < total;

    return {
      police,
      total,
      hasNextPage,
    };
  } catch (error) {
    console.error('Failed to fetch police records:', error);
    return {
      police: [],
      total: 0,
      hasNextPage: false,
    };
  }
}
