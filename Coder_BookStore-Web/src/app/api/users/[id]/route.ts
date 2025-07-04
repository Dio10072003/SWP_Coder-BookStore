// ... existing code ...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, context: any) {
  return Response.json({
    message: 'Not implemented',
    method: request.method,
    id: context?.params?.id ?? null
  }, { status: 501 });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(request: Request, context: any) {
  return Response.json({
    message: 'Not implemented',
    method: request.method,
    id: context?.params?.id ?? null
  }, { status: 501 });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(request: Request, context: any) {
  return Response.json({
    message: 'Not implemented',
    method: request.method,
    id: context?.params?.id ?? null
  }, { status: 501 });
}
// ... existing code ... 