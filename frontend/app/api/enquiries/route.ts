import { NextRequest, NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validations/enquiry';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const validationResult = enquirySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // Check honeypot for bot detection
    if (validData.honeypot && validData.honeypot.length > 0) {
      return NextResponse.json(
        { error: 'Bot submission rejected' },
        { status: 400 }
      );
    }

    const referenceId = `BR-RFP-${Math.floor(100000 + Math.random() * 900000)}`;

    // Forward to NestJS backend if available
    try {
      const backendUrl = process.env.BACKEND_INTERNAL_URL || 'http://localhost:4001';
      await fetch(`${backendUrl}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validData,
          referenceId,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (backendErr) {
      // Graceful degradation: If backend is offline or in transition, log and still confirm receipt to client
      console.warn('Backend enquiry forward failed, handled gracefully:', backendErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Your technical project brief has been successfully registered.',
      referenceId,
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing enquiry' },
      { status: 500 }
    );
  }
}
