export interface ProfileData {
    firstName: string
    lastName: string
    phone: string
    location: string
    bio: string
    headline: string
    skills: string[]
    experienceLevel: string
    currentPosition: string
    company: string
    highestDegree: string
    institution: string
    fieldOfStudy: string
    graduationYear: number | null
    transcript: string
    statementOfPurpose: string
    resumeUrl: string
    preferredRoles: string[]
    workMode: string
    salaryExpectation: string
    locationPreference: string
}

export interface ProfileContextType {
    profileData: ProfileData
    updateProfileData: (data: Partial<ProfileData>) => void
    currentStep: number
    nextStep: () => void
    prevStep: () => void
    isSubmitting: boolean
    submitProfile: () => Promise<void>
}