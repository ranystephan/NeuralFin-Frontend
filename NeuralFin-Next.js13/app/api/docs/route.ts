import { NextResponse } from 'next/server';
import { allDocs } from 'contentlayer/generated';

export async function GET() {
  const files = allDocs.map(doc => ({
    name: doc.slugAsParams,
    content: doc.body.raw
  }));

  return NextResponse.json(files);
} 