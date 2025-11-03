'use client'

import { useProfile } from '@/contexts/ProfileContext'

const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Professional' },
    { number: 3, label: 'Education' },
    { number: 4, label: 'Documents' },
    { number: 5, label: 'Preferences' }
]

export default function ProgressBar() {
    const { currentStep } = useProfile()

    return (
        <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                    {/* Step circle and label */}
                    <div className="flex flex-col items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                            step.number <= currentStep
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : step.number === currentStep + 1
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-gray-300 text-gray-500'
                        }`}>
                            {step.number < currentStep ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                step.number
                            )}
                        </div>
                        <span className={`mt-2 text-xs font-medium ${
                            step.number <= currentStep ? 'text-blue-600' : 'text-gray-500'
                        }`}>
              {step.label}
            </span>
                    </div>

                    {/* Connector line */}
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 ${
                            step.number < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                        }`} />
                    )}
                </div>
            ))}
        </div>
    )
}