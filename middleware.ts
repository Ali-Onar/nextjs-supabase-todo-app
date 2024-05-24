import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/', '/todos',
]);

export default clerkMiddleware((auth, req) => {
    if (!auth().userId && isProtectedRoute(req)) {
        // Add custom logic to run before redirecting
        return auth().redirectToSignIn();
    }

    if (isProtectedRoute(req)) auth().protect();
});

export const config = { matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'] };
