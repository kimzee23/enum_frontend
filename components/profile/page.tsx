import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileStats from '@/components/profile/ProfileStats'
import ProfileForm from '@/components/profile/ProfileForm'


export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProfileStats />
                <ProfileForm />
            </div>
        </div>
    )
}