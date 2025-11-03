'use client'

import { useProfile } from '@/contexts/ProfileContext'

export default function ProfileCompletion() {
    const { profileData } = useProfile()

    const getSafeValue = (value: string | null | undefined): string => {
        return value || ''
    }
    const getSafeSkills = (): string[] => {
        return profileData.skills || []
    }
    const getSafePreferredRoles = (): string[] => {
        return profileData.preferredRoles || []
    }

    const calculateCompletion = () => {
        const requiredFields = [
            'firstName', 'lastName', 'phone', 'location', 'bio',
            'headline', 'skills', 'experienceLevel', 'highestDegree',
            'institution', 'fieldOfStudy', 'graduationYear', 'resumeUrl',
            'preferredRoles', 'workMode', 'salaryExpectation', 'locationPreference'
        ]

        const completedFields = requiredFields.filter(field => {
            const value = profileData[field as keyof typeof profileData]

            if (Array.isArray(value)) {
                return value.length > 0
            }

            if (field === 'skills' || field === 'preferredRoles') {
                const arrayValue = field === 'skills' ? getSafeSkills() : getSafePreferredRoles()
                return arrayValue.length > 0
            }

            if (field === 'graduationYear') {
                return value !== null && value !== 0
            }

            return Boolean(getSafeValue(value as string))
        })

        return Math.round((completedFields.length / requiredFields.length) * 100)
    }

    const getCompletionLevel = (completion: number) => {
        if (completion >= 90) return { color: 'text-green-600', bg: 'bg-green-600', message: 'Excellent! Profile complete' }
        if (completion >= 70) return { color: 'text-blue-600', bg: 'bg-blue-600', message: 'Good job! Almost there' }
        if (completion >= 50) return { color: 'text-yellow-600', bg: 'bg-yellow-600', message: 'Halfway there!' }
        return { color: 'text-red-600', bg: 'bg-red-600', message: 'Getting started' }
    }

    const completion = calculateCompletion()
    const level = getCompletionLevel(completion)

    const getMissingFields = () => {
        const missing = []

        // Use safe getters for all fields
        if (!getSafeValue(profileData.firstName) || !getSafeValue(profileData.lastName)) missing.push('Name')
        if (!getSafeValue(profileData.phone)) missing.push('Phone')
        if (!getSafeValue(profileData.location)) missing.push('Location')
        if (!getSafeValue(profileData.bio)) missing.push('Bio')
        if (!getSafeValue(profileData.headline)) missing.push('Headline')
        if (getSafeSkills().length === 0) missing.push('Skills')
        if (!getSafeValue(profileData.experienceLevel)) missing.push('Experience Level')
        if (!getSafeValue(profileData.highestDegree)) missing.push('Highest Degree')
        if (!getSafeValue(profileData.institution)) missing.push('Institution')
        if (!getSafeValue(profileData.fieldOfStudy)) missing.push('Field of Study')
        if (!profileData.graduationYear) missing.push('Graduation Year')
        if (!getSafeValue(profileData.resumeUrl)) missing.push('Resume')
        if (getSafePreferredRoles().length === 0) missing.push('Preferred Roles')
        if (!getSafeValue(profileData.workMode)) missing.push('Work Mode')
        if (!getSafeValue(profileData.salaryExpectation)) missing.push('Salary Expectation')
        if (!getSafeValue(profileData.locationPreference)) missing.push('Location Preference')

        return missing
    }

    const missingFields = getMissingFields()

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
                <span className={`text-sm font-medium ${level.color}`}>
          {completion}%
        </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                    className={`h-3 rounded-full transition-all duration-500 ${level.bg}`}
                    style={{ width: `${completion}%` }}
                ></div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                {completion === 100 ? ' Your profile is complete and ready for employers!' : level.message}
            </p>

            {completion < 100 && (
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Complete these to improve your profile ({missingFields.length} remaining):
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                        {missingFields.slice(0, 6).map((field, index) => (
                            <li key={index} className="flex items-center">
                                <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {field}
                            </li>
                        ))}
                        {missingFields.length > 6 && (
                            <li className="text-gray-500 text-xs">
                                +{missingFields.length - 6} more fields to complete
                            </li>
                        )}
                    </ul>

                    {completion < 70 && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-800">
                                💡 <strong>Tip:</strong> Complete your profile to increase your chances of getting hired by 3x!
                            </p>
                        </div>
                    )}
                </div>
            )}

            {completion >= 70 && completion < 100 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                        ⚡ You're almost there! Complete your profile to unlock all features.
                    </p>
                </div>
            )}

            {completion === 100 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                        Your profile is complete! Employers can now find and contact you.
                    </p>
                </div>
            )}
        </div>
    )
}