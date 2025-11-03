export default function ProfileStats() {
    const stats = [
        { label: 'Posts', value: '24' },
        { label: 'Followers', value: '1.2K' },
        { label: 'Following', value: '356' },
        { label: 'Likes', value: '2.4K' },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
            ))}
        </div>
    )
}