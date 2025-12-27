import { X, Mail, Phone, Globe, Building2, User as UserIcon } from 'lucide-react';
import { User } from '@/types/user';

interface UserDetailPanelProps {
  user: User;
  onClose: () => void;
}

export const UserDetailPanel = ({ user, onClose }: UserDetailPanelProps) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
        <button
          title='close'
          onClick={onClose}
          className="p-2 hover:bg-gray-100 cursor-pointer  rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-black" />
        </button>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-semibold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">@{user.username}</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Website</p>
              <p className="text-gray-900">{user.website}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="text-gray-900 font-semibold">{user.company.name}</p>
              <p className="text-sm text-gray-600 italic">{user.company.catchPhrase}</p>
              <p className="text-sm text-gray-500">{user.company.bs}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <UserIcon className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              {
                user.address.suite && user.address.street && (
              
              <p className="text-gray-900">
                {user.address.suite}, {user.address.street}
              </p>
                ) }
              <p className="text-gray-900">
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);