'use client'

import { useState } from 'react'
import { useProfile } from '@/contexts/ProfileContext'

const experienceLevels = ['Entry-level', 'Mid-level', 'Senior', 'Lead', 'Executive']
const skillsList = ['Java', 'Spring Boot', 'MongoDB', 'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'AWS', 'Docker']

export default function ProfessionalInfoStep() {
    const { profileData, updateProfileData, nextStep, prevStep } = useProfile()
    const [newSkill, setNewSkill] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        nextStep()
    }

    const getSafeValue = (value: string | null | undefined): string => {
        return value || ''
    }

    // Safe skills array getter
    const getSafeSkills = (): string[] => {
        return profileData.skills || []
    }

    const addSkill = (skill?: string) => {
        const skillToAdd = skill || newSkill
        const currentSkills = getSafeSkills()

        if (skillToAdd && !currentSkills.includes(skillToAdd)) {
            updateProfileData({ skills: [...currentSkills, skillToAdd] })
            setNewSkill('')
        }
    }

    const removeSkill = (skillToRemove: string) => {
        const currentSkills = getSafeSkills()
        updateProfileData({
            skills: currentSkills.filter(skill => skill !== skillToRemove)
        })
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>

            <div>
                <label htmlFor="headline" className="block text-sm font-medium text-gray-700">
                    Professional Headline *
                </label>
                <input
                    type="text"
                    id="headline"
                    value={getSafeValue(profileData.headline)}
                    onChange={(e) => updateProfileData({ headline: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="e.g., Full-Stack Developer"
                    required
                />
            </div>

            <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
                    Experience Level *
                </label>
                <select
                    id="experienceLevel"
                    value={getSafeValue(profileData.experienceLevel)}
                    onChange={(e) => updateProfileData({ experienceLevel: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    required
                >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="currentPosition" className="block text-sm font-medium text-gray-700">
                        Current Position
                    </label>
                    <input
                        type="text"
                        id="currentPosition"
                        value={getSafeValue(profileData.currentPosition)}
                        onChange={(e) => updateProfileData({ currentPosition: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Company
                    </label>
                    <input
                        type="text"
                        id="company"
                        value={getSafeValue(profileData.company)}
                        onChange={(e) => updateProfileData({ company: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills *
                </label>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="Add a skill"
                    />
                    <button
                        type="button"
                        onClick={() => addSkill()}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                        Add
                    </button>
                </div>

                {/* Skills display */}
                <div className="flex flex-wrap gap-2">
                    {getSafeSkills().map((skill, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>

                <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Suggested skills:</p>
                    <div className="flex flex-wrap gap-1">
                        {skillsList.map(skill => (
                            <button
                                key={skill}
                                type="button"
                                onClick={() => addSkill(skill)}
                                disabled={getSafeSkills().includes(skill)}
                                className={`px-2 py-1 text-xs rounded ${
                                    getSafeSkills().includes(skill)
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>
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
                    Next: Education
                </button>
            </div>
        </form>
    )
}