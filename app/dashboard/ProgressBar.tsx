'use client'



import {useProfile} from "@/contexts/ProfileContext";

const steps = [
    'Personal Info',
    'Professional',
    'Education',
    'Documents',
    'Preferences'
]

export default function ProgressBar() {
    const { currentStep } = useProfile()

    return (
        <div className="flex justify-between items-center mb-8">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        index + 1 <= currentStep
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                    }`}>
                        {index + 1}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                        index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-500'
                    }`}>
            {step}
          </span>
                    {index < steps.length - 1 && (
                        <div className={`w-12 h-0.5 mx-4 ${
                            index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                    )}
                </div>
            ))}
        </div>
    )
}