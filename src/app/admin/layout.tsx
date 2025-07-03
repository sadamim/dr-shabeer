// src/app/admin/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('adminAuth')?.value === 'true';

    if (!isAuthenticated) {
        redirect('/login'); // ← bas yeh line galat jagah thi
    }

    return <>{children}</>;
}