export default function Avatar({ user }) {
    return (
        <img
            src={user.role === 'Company' ? '/company.svg' : '/hacker.png'}
            alt={user.role === 'Company' ? 'Company' : 'Hacker'}
            className="w-full h-full object-cover"
        />
    )
}
