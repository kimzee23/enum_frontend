import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { JobsProvider } from '@/contexts/JobsContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Enum Talent - Connect, Grow, Succeed',
    description: 'Join thousands of professionals on Enum Talent. Build your profile, connect with opportunities, and accelerate your career growth.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider>
            <JobsProvider>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </div>
            </JobsProvider>
        </AuthProvider>
        </body>
        </html>
    )
}

function Navbar() {
    return (
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a href="/" className="flex items-center space-x-3 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Enum Talent
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="/features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Features
                        </a>
                        <a href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Pricing
                        </a>
                        <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            About
                        </a>
                        <a href="/jobs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Browse Jobs
                        </a>
                        <div className="flex items-center space-x-4">
                            <a href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Login
                            </a>
                            <a
                                href="/signup"
                                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Sign Up Free
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-blue-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">E</span>
                            </div>
                            <span className="text-xl font-bold">Enum Talent</span>
                        </div>
                        <p className="text-gray-400 max-w-md">
                            Empowering professionals worldwide to showcase their talent, connect with opportunities, and accelerate career growth.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="/case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
                            <li><a href="/jobs" className="hover:text-white transition-colors">Browse Jobs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Enum Talent. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}