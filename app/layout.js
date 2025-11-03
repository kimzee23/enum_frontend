import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'EnumTalent - Find Your Dream Opportunity',
    description: 'Connect with amazing opportunities and showcase your talent',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider>
            <div className="min-h-screen bg-gray-50">
                {children}
            </div>
        </AuthProvider>
        </body>
        </html>
    );
}