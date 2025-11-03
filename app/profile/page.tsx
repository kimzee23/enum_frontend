'use client'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileStats from '@/components/profile/ProfileStats'
import ProfileForm from '@/components/profile/ProfileForm'
import ProfileCompletion from '@/components/profile/ProfileCompletion'
import {ProfileProvider} from "@/contexts/ProfileContext";

export default function ProfilePage() {
    return (
        <ProfileProvider>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2 space-y-6">
                            <ProfileHeader />
                            <ProfileStats />
                            <ProfileForm />
                        </div>

                        <div className="space-y-6">
                            <ProfileCompletion />

                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => window.location.href = '/dashboard'}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                                    >
                                        Edit Full Profile
                                    </button>
                                    <button
                                        onClick={() => window.location.href = '/jobs'}
                                        className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                                    >
                                        Browse Jobs
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProfileProvider>
    )
}