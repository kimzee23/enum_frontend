'use client'



import {useProfile} from "@/contexts/ProfileContext";

export default function ProfileHeader() {
    const { profileData } = useProfile()

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }

    const getJoinDate = () => {
        return new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        })
    }

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {getInitials(profileData.firstName, profileData.lastName)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {profileData.firstName} {profileData.lastName}
                            </h1>
                            <p className="text-gray-600">{profileData.headline || 'No headline set'}</p>
                            <p className="text-sm text-gray-500">
                                {profileData.location} • Member since {getJoinDate()}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    )
}