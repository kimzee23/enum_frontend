'use client';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useJobs } from '@/contexts/JobsContext';
import { Search, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface Job {
    id: string;
    title: string;
    company: string;
    description: string;
    location: string;
    workMode: string;
    employmentType: string;
    requiredSkills: string[];
    preferredSkills: string[];
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string;
    experienceLevel: number;
    applicationUrl: string;
    contactEmail: string;
    isActive: boolean;
    createdAt: string;
    postedBy: string;
}

export default function JobsPage() {
    const { jobs, loading, searchJobs } = useJobs();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [workMode, setWorkMode] = useState<string>('');
    const [employmentType, setEmploymentType] = useState<string>('');

    useEffect(() => {
        searchJobs(searchTerm, location, workMode, employmentType);
    }, []);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchJobs(searchTerm, location, workMode, employmentType);
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setter(e.target.value);
        };

    const formatSalary = (min: number | null, max: number | null, currency: string): string => {
        if (!min && !max) return 'Salary not specified';
        const format = (amount: number) => new Intl.NumberFormat('en-US').format(amount);
        if (min && max) return `${currency}${format(min)} - ${currency}${format(max)}`;
        if (min) return `From ${currency}${format(min)}`;
        if (max) return `Up to ${currency}${format(max)}`;
        return 'Salary not specified';
    };

    const getExperienceLevel = (level: number): string => {
        const levels = ['Entry', 'Junior', 'Mid-level', 'Senior', 'Lead'];
        return levels[level] || 'Not specified';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            EnumTalent
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-gray-700 hover:text-gray-900">
                                Home
                            </Link>
                            <Link href="/profile" className="text-gray-700 hover:text-gray-900">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Dream Job</h1>

                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Job title, company, or keywords"
                                    value={searchTerm}
                                    onChange={handleInputChange(setSearchTerm)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Location */}
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={location}
                                    onChange={handleInputChange(setLocation)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Work Mode */}
                            <select
                                value={workMode}
                                onChange={handleInputChange(setWorkMode)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Work Mode</option>
                                <option value="REMOTE">Remote</option>
                                <option value="ONSITE">On-site</option>
                                <option value="HYBRID">Hybrid</option>
                            </select>

                            {/* Employment Type */}
                            <select
                                value={employmentType}
                                onChange={handleInputChange(setEmploymentType)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Employment Type</option>
                                <option value="FULL_TIME">Full-time</option>
                                <option value="PART_TIME">Part-time</option>
                                <option value="CONTRACT">Contract</option>
                                <option value="INTERNSHIP">Internship</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Search Jobs
                        </button>
                    </form>
                </div>
            </div>

            {/* Jobs List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="text-lg text-gray-600">Loading jobs...</div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-12">
                        <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
                        <p className="mt-2 text-gray-500">
                            Try adjusting your search criteria or check back later for new opportunities.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {jobs.map((job: Job) => (
                            <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {job.title}
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-3">{job.company}</p>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center">
                                                <Briefcase className="h-4 w-4 mr-1" />
                                                {job.workMode}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {job.employmentType}
                                            </div>
                                            {job.salaryMin && (
                                                <div className="flex items-center">
                                                    <DollarSign className="h-4 w-4 mr-1" />
                                                    {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <span className="text-sm font-medium text-gray-700">Experience: </span>
                                            <span className="text-sm text-gray-600">{getExperienceLevel(job.experienceLevel)}</span>
                                        </div>

                                        {job.requiredSkills && job.requiredSkills.length > 0 && (
                                            <div className="mb-4">
                                                <span className="text-sm font-medium text-gray-700">Skills: </span>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {job.requiredSkills.slice(0, 5).map((skill: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {job.requiredSkills.length > 5 && (
                                                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                            +{job.requiredSkills.length - 5} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <p className="text-gray-600 line-clamp-2 mb-4">
                                            {job.description}
                                        </p>
                                    </div>

                                    <div className="ml-6 flex flex-col space-y-2">
                                        {job.applicationUrl ? (
                                            <a
                                                href={job.applicationUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
                                            >
                                                Apply Now
                                            </a>
                                        ) : (
                                            <a
                                                href={`mailto:${job.contactEmail}?subject=Application for ${job.title}`}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
                                            >
                                                Apply via Email
                                            </a>
                                        )}
                                        <Link
                                            href={`/jobs/${job.id}`}
                                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-center hover:bg-gray-50 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}