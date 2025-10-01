import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated (you might want to add admin role check here)
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user analytics data
    const { data: userStats } = await supabaseAdmin
      .from('users')
      .select('auth_provider, job_title, company, industry, created_at')
      .order('created_at', { ascending: false });

    if (!userStats) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    // Process the data for insights
    const analytics = {
      totalUsers: userStats.length,
      authProviderBreakdown: userStats.reduce((acc: any, user: any) => {
        const provider = user.auth_provider || 'unknown';
        acc[provider] = (acc[provider] || 0) + 1;
        return acc;
      }, {}),
      topJobTitles: userStats
        .filter((user: any) => user.job_title)
        .reduce((acc: any, user: any) => {
          const title = user.job_title;
          acc[title] = (acc[title] || 0) + 1;
          return acc;
        }, {}),
      topCompanies: userStats
        .filter((user: any) => user.company)
        .reduce((acc: any, user: any) => {
          const company = user.company;
          acc[company] = (acc[company] || 0) + 1;
          return acc;
        }, {}),
      topIndustries: userStats
        .filter((user: any) => user.industry)
        .reduce((acc: any, user: any) => {
          const industry = user.industry;
          acc[industry] = (acc[industry] || 0) + 1;
          return acc;
        }, {}),
      recentSignups: userStats.slice(0, 10).map((user: any) => ({
        email: user.email,
        provider: user.auth_provider,
        jobTitle: user.job_title,
        company: user.company,
        industry: user.industry,
        createdAt: user.created_at,
      })),
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
