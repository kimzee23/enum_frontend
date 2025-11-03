'use client'

import { useProfile } from '@/contexts/ProfileContext'

const degrees = [
    'High School',
    'Associate Degree',
    'Bachelor of Science',
    'Bachelor of Arts',
    "Bachelor",
    'Master of Science',
    'Master of Arts',
    'PhD',
    'MBA',
    'Other'
]

const fieldsOfStudy = [
    'Computer Science',
    'Engineering',
    'Business Administration',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Psychology',
    'Other'
]

export default function EducationStep() {
    const { profileData, updateProfileData, nextStep, prevStep } = useProfile()

    const currentYear = new Date().getFullYear()
    const graduationYears = Array.from({ length: 30 }, (_, i) => currentYear - i)

    // Safe value getter to handle null values
    const getSafeValue = (value: string | null | undefined): string => {
        return value || ''
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        nextStep()
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Education Background</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="highestDegree" className="block text-sm font-medium text-gray-700">
                        Highest Degree *
                    </label>
                    <select
                        id="highestDegree"
                        value={getSafeValue(profileData.highestDegree)}
                        onChange={(e) => updateProfileData({ highestDegree: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                    >
                        <option value="">Select highest degree</option>
                        {degrees.map(degree => (
                            <option key={degree} value={degree}>{degree}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                        Institution *
                    </label>
                    <input
                        type="text"
                        id="institution"
                        value={getSafeValue(profileData.institution)}
                        onChange={(e) => updateProfileData({ institution: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., University of Lagos"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700">
                        Field of Study *
                    </label>
                    <select
                        id="fieldOfStudy"
                        value={getSafeValue(profileData.fieldOfStudy)}
                        onChange={(e) => updateProfileData({ fieldOfStudy: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                    >
                        <option value="">Select field of study</option>
                        {fieldsOfStudy.map(field => (
                            <option key={field} value={field}>{field}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
                        Graduation Year *
                    </label>
                    <select
                        id="graduationYear"
                        value={profileData.graduationYear || ''}
                        onChange={(e) => updateProfileData({ graduationYear: e.target.value ? parseInt(e.target.value) : null })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                    >
                        <option value="">Select graduation year</option>
                        {graduationYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="transcript" className="block text-sm font-medium text-gray-700">
                    Transcript/Certificate URL (Optional)
                </label>
                <input
                    type="url"
                    id="transcript"
                    value={getSafeValue(profileData.transcript)}
                    onChange={(e) => updateProfileData({ transcript: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="https://example.com/transcript.pdf"
                />
                <p className="mt-1 text-sm text-gray-500">
                    Link to your academic transcript or certificate (Google Drive, Dropbox, etc.)
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
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Next: Documents
                </button>
            </div>
        </form>
    )
}