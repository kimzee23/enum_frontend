import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const profileData = await request.json()

        const requiredFields = ['firstName', 'lastName', 'phone', 'location', 'bio', 'headline', 'skills']
        const missingFields = requiredFields.filter(field => !profileData[field])

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            )
        }

        console.log('Received profile data:', profileData)

        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.json(
            {
                message: 'Profile saved successfully',
                data: profileData
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error saving profile:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}