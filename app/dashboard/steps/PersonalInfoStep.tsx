'use client'

import { useProfile } from '@/contexts/ProfileContext'

export default function PersonalInfoStep() {
    const { profileData, updateProfileData, nextStep } = useProfile()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        nextStep()
    }

    // Safe value getter to handle null values
    const getSafeValue = (value: string | null | undefined): string => {
        return value || ''
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name *
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        value={getSafeValue(profileData.firstName)}
                        onChange={(e) => updateProfileData({ firstName: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name *
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        value={getSafeValue(profileData.lastName)}
                        onChange={(e) => updateProfileData({ lastName: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={getSafeValue(profileData.phone)}
                    onChange={(e) => updateProfileData({ phone: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Current Location *
                </label>
                <input
                    type="text"
                    id="location"
                    value={getSafeValue(profileData.location)}
                    onChange={(e) => updateProfileData({ location: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Professional Bio *
                </label>
                <textarea
                    id="bio"
                    rows={4}
                    value={getSafeValue(profileData.bio)}
                    onChange={(e) => updateProfileData({ bio: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    required
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Next: Professional Info
                </button>
            </div>
        </form>
    )
}