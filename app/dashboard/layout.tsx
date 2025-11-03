import { ProfileProvider } from '@/contexts/ProfileContext'

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <ProfileProvider>
            <div className="min-h-screen bg-gray-50">
                {children}
            </div>
        </ProfileProvider>
    )
}