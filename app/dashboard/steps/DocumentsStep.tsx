'use client'

import { useState } from 'react'
import { useProfile } from '@/contexts/ProfileContext'

export default function DocumentsStep() {
    const { profileData, updateProfileData, nextStep, prevStep } = useProfile()
    const [isUploading, setIsUploading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        nextStep()
    }

    const handleFileUpload = async (file: File, type: 'resume' | 'transcript') => {
        setIsUploading(true)
        try {

            await new Promise(resolve => setTimeout(resolve, 2000))

            // In a real app, is meant to upload to cloud storage and get the URL
            const fakeUrl = `https://example.com/${type}s/${file.name}`

            if (type === 'resume') {
                updateProfileData({ resumeUrl: fakeUrl })
            } else {
                updateProfileData({ transcript: fakeUrl })
            }

            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`)
        } catch (error) {
            alert(`Failed to upload ${type}. Please try again.`)
        } finally {
            setIsUploading(false)
        }
    }

    const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileUpload(file, 'resume')
        }
    }

    const handleTranscriptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileUpload(file, 'transcript')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Documents & Files</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Resume</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Upload your CV or resume (PDF, DOC, DOCX). Max file size: 5MB.
                    </p>

                    {profileData.resumeUrl ? (
                        <div className="bg-green-50 border border-green-200 rounded-md p-3 w-full">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-green-800 font-medium">Resume uploaded</span>
                                </div>
                                <a
                                    href={profileData.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    View
                                </a>
                            </div>
                        </div>
                    ) : (
                        <label className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                            {isUploading ? 'Uploading...' : 'Choose File'}
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeUpload}
                                disabled={isUploading}
                            />
                        </label>
                    )}
                </div>
            </div>


            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Transcript (Optional)</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Upload your academic transcript or certificates.
                    </p>

                    {profileData.transcript ? (
                        <div className="bg-green-50 border border-green-200 rounded-md p-3 w-full">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-green-800 font-medium">Transcript uploaded</span>
                                </div>
                                <a
                                    href={profileData.transcript}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    View
                                </a>
                            </div>
                        </div>
                    ) : (
                        <label className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors cursor-pointer">
                            {isUploading ? 'Uploading...' : 'Choose File'}
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={handleTranscriptUpload}
                                disabled={isUploading}
                            />
                        </label>
                    )}
                </div>
            </div>


            <div>
                <label htmlFor="statementOfPurpose" className="block text-sm font-medium text-gray-700">
                    Statement of Purpose/Cover Letter
                </label>
                <textarea
                    id="statementOfPurpose"
                    rows={6}
                    value={profileData.statementOfPurpose}
                    onChange={(e) => updateProfileData({ statementOfPurpose: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your career goals, why you're looking for new opportunities, and what makes you a great candidate..."
                />
                <p className="mt-1 text-sm text-gray-500">
                    This will be included in your job applications
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
                    Next: Preferences
                </button>
            </div>
        </form>
    )
}