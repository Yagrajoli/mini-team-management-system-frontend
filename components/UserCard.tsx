import { memo } from 'react';
import { Mail, Building2 } from 'lucide-react';
import { User } from '@/types/user';

interface UserCardProps {
  user: User;
  onClick: () => void;
}

export const UserCard = memo<UserCardProps>(({ user, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className="flex items-start gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
        {user.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
        <p className="text-sm text-gray-600 truncate flex items-center gap-1">
          <Mail className="w-3 h-3" />
          {user.email}
        </p>
        <p className="text-sm text-gray-500 truncate flex items-center gap-1 mt-1">
          <Building2 className="w-3 h-3" />
          {user.company.name}
        </p>
      </div>
    </div>
  </div>
));

UserCard.displayName = 'UserCard';