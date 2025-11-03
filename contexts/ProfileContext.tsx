'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { profileAPI } from '@/lib/api'
import { ProfileContextType, ProfileData } from "@/types/profile"

const initialProfileData: ProfileData = {
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    bio: '',
    headline: '',
    skills: [],
    experienceLevel: '',
    currentPosition: '',
    company: '',
    highestDegree: '',
    institution: '',
    fieldOfStudy: '',
    graduationYear: null,
    transcript: '',
    statementOfPurpose: '',
    resumeUrl: '',
    preferredRoles: [],
    workMode: '',
    salaryExpectation: '',
    locationPreference: ''
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profileData, setProfileData] = useState<ProfileData>(initialProfileData)
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Load profile data on component mount
    useEffect(() => {
        loadProfileData()
    }, [])

    const loadProfileData = async () => {
        try {
            setIsLoading(true)
            if (typeof window !== 'undefined') {
                const userId = localStorage.getItem('userId')
                if (userId) {
                    const response = await profileAPI.getProfile(userId)
                    if (response.data) {
                        setProfileData(response.data)
                    }
                }
            }
        } catch (error) {
            console.error('Error loading profile:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const updateProfileData = (data: Partial<ProfileData>) => {
        setProfileData(prev => ({ ...prev, ...data }))
    }

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 5))
    }

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    const submitProfile = async () => {
        setIsSubmitting(true)
        try {
            if (typeof window !== 'undefined') {
                const userId = localStorage.getItem('userId')
                if (!userId) {
                    throw new Error('User ID not found')
                }

                const response = await profileAPI.createOrUpdateProfile(userId, profileData)

                if (response.data) {
                    console.log('Profile saved successfully:', response.data)
                    window.location.href = '/profile'
                }
            }
        } catch (error) {
            console.error('Error saving profile:', error)
            throw error
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <ProfileContext.Provider value={{
            profileData,
            updateProfileData,
            currentStep,
            nextStep,
            prevStep,
            isSubmitting,
            submitProfile
        }}>
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfile() {
    const context = useContext(ProfileContext)
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider')
    }
    return context
}