'use client'

import { useState } from 'react'
import { useProfile } from '@/contexts/ProfileContext'

const preferredRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full-Stack Developer',
    'Software Engineer',
    'DevOps Engineer',
    'Data Scientist',
    'Machine Learning Engineer',
    'Mobile Developer',
    'UI/UX Designer',
    'Product Manager',
    'Technical Lead',
    'System Architect'
]

const workModes = ['Remote', 'On-site', 'Hybrid']
const salaryRanges = [
    '₦100,000 - ₦300,000',
    '₦300,000 - ₦500,000',
    '₦500,000 - ₦1,000,000',
    '₦1,000,000 - ₦2,000,000',
    '₦2,000,000+',
    'Negotiable'
]

export default function PreferencesStep() {
    const { profileData, updateProfileData, prevStep, isSubmitting, submitProfile } = useProfile()
    const [newRole, setNewRole] = useState('')

    // Safe value getter to handle null values
    const getSafeValue = (value: string | null | undefined): string => {
        return value || ''
    }

    // Safe array getter
    const getSafePreferredRoles = (): string[] => {
        return profileData.preferredRoles || []
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await submitProfile()
    }

    const addPreferredRole = (role?: string) => {
        const roleToAdd = role || newRole
        const currentRoles = getSafePreferredRoles()

        if (roleToAdd && !currentRoles.includes(roleToAdd)) {
            updateProfileData({ preferredRoles: [...currentRoles, roleToAdd] })
            setNewRole('')
        }
    }

    const removePreferredRole = (roleToRemove: string) => {
        const currentRoles = getSafePreferredRoles()
        updateProfileData({
            preferredRoles: currentRoles.filter(role => role !== roleToRemove)
        })
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Job Preferences</h2>

            {/* Preferred Roles */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Roles *
                </label>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPreferredRole())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="Add a preferred role"
                    />
                    <button
                        type="button"
                        onClick={() => addPreferredRole()}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                        Add
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {getSafePreferredRoles().map((role, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                        >
              {role}
                            <button
                                type="button"
                                onClick={() => removePreferredRole(role)}
                                className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                ×
              </button>
            </span>
                    ))}
                </div>

                <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Suggested roles:</p>
                    <div className="flex flex-wrap gap-1">
                        {preferredRoles.map(role => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => addPreferredRole(role)}
                                disabled={getSafePreferredRoles().includes(role)}
                                className={`px-2 py-1 text-xs rounded ${
                                    getSafePreferredRoles().includes(role)
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Work Mode & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="workMode" className="block text-sm font-medium text-gray-700">
                        Preferred Work Mode *
                    </label>
                    <select
                        id="workMode"
                        value={getSafeValue(profileData.workMode)}
                        onChange={(e) => updateProfileData({ workMode: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                    >
                        <option value="">Select work mode</option>
                        {workModes.map(mode => (
                            <option key={mode} value={mode}>{mode}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="salaryExpectation" className="block text-sm font-medium text-gray-700">
                        Salary Expectation *
                    </label>
                    <select
                        id="salaryExpectation"
                        value={getSafeValue(profileData.salaryExpectation)}
                        onChange={(e) => updateProfileData({ salaryExpectation: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                    >
                        <option value="">Select salary range</option>
                        {salaryRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Location Preference */}
            <div>
                <label htmlFor="locationPreference" className="block text-sm font-medium text-gray-700">
                    Location Preference *
                </label>
                <input
                    type="text"
                    id="locationPreference"
                    value={getSafeValue(profileData.locationPreference)}
                    onChange={(e) => updateProfileData({ locationPreference: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="e.g., Lagos, Remote, Abuja, etc."
                    required
                />
                <p className="mt-1 text-sm text-gray-500">
                    Specify cities, regions, or "Remote" for remote work
                </p>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Almost Done! </h3>
                <p className="text-blue-800">
                    Your profile is looking great! Once you submit, employers will be able to find you
                    and you can start applying to jobs that match your preferences.
                </p>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Saving...' : 'Complete Profile'}
                </button>
            </div>
        </form>
    )
}