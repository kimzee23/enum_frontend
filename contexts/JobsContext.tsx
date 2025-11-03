'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { jobsAPI } from '@/lib/api';

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

interface JobsContextType {
    jobs: Job[];
    loading: boolean;
    filters: Record<string, any>;
    fetchJobs: (searchFilters?: Record<string, any>) => Promise<void>;
    searchJobs: (searchTerm: string, location: string, workMode: string, employmentType: string) => Promise<void>;
    getJobById: (jobId: string) => Promise<Job>;
}

interface JobsProviderProps {
    children: ReactNode;
}

// Create context with default value
const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const useJobs = (): JobsContextType => {
    const context = useContext(JobsContext);
    if (!context) {
        throw new Error('useJobs must be used within a JobsProvider');
    }
    return context;
};

export const JobsProvider = ({ children }: JobsProviderProps) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<Record<string, any>>({});

    const fetchJobs = async (searchFilters: Record<string, any> = {}): Promise<void> => {
        setLoading(true);
        try {
            const response = await jobsAPI.getAllJobs(searchFilters);
            setJobs(response.data);
            setFilters(searchFilters);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const searchJobs = async (
        searchTerm: string,
        location: string,
        workMode: string,
        employmentType: string
    ): Promise<void> => {
        await fetchJobs({ search: searchTerm, location, workMode, employmentType });
    };

    const getJobById = async (jobId: string): Promise<Job> => {
        try {
            const response = await jobsAPI.getJobById(jobId);
            return response.data;
        } catch (error) {
            console.error('Error fetching job:', error);
            throw error;
        }
    };

    const value: JobsContextType = {
        jobs,
        loading,
        filters,
        fetchJobs,
        searchJobs,
        getJobById,
    };

    return (
        <JobsContext.Provider value={value}>
            {children}
        </JobsContext.Provider>
    );
};