'use client'

import {ProfileProvider, useProfile} from '@/contexts/ProfileContext'
import PreferencesStep from '@/app/dashboard/steps/PreferencesStep'
import ProgressBar from '@/app/dashboard/ProgressBar'
import PersonalInfoStep from "@/app/dashboard/steps/PersonalInfoStep";
import ProfessionalInfoStep from "@/app/dashboard/steps/ProfessionalInfoStep";
import EducationStep from "@/app/dashboard/steps/EducationStep";
import DocumentsStep from "@/app/dashboard/steps/DocumentsStep";

export default function DashboardPage() {
    const { currentStep } = useProfile()

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoStep />
            case 2:
                return <ProfessionalInfoStep />
            case 3:
                return <EducationStep />
            case 4:
                return <DocumentsStep />
            case 5:
                return <PreferencesStep />
            default:
                return <PersonalInfoStep />
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
                <p className="mt-2 text-gray-600">Help us match you with the best opportunities</p>
            </div>

            <ProgressBar />

            <div className="mt-8 bg-white shadow rounded-lg">
                {renderStep()}
            </div>
        </div>
    )
}