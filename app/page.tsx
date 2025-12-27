'use client';

import { useState, useMemo } from 'react';
import { Plus, User as UserIcon, AlertCircle } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useFetchUsers } from '@/hooks/useFetchUsers';
import { SearchBar } from '@/components/SearchBar';
import { UserCard } from '@/components/UserCard';
import { UserDetailPanel } from '@/components/UserDetailPanel';
import { AddUserForm } from '@/components/AddUserForm';
import { User } from '@/types/user';

export default function TeamDashboard() {
  useFetchUsers();
  
  const { users, loading, error } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  // console.log("filtered User", filteredUsers)

  const handleAddSuccess = () => {
    setSuccessMessage('User added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Error Loading Users</h3>
          </div>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Team Management Dashboard</h1>
          <p className="text-gray-600">Manage your team members and their information</p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center cursor-pointer justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Member
          </button>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No users found</p>
            <p className="text-gray-400">Try adjusting your search query</p>
          </div>
        )}

        {selectedUser && (
          <UserDetailPanel
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}

        {showAddForm && (
          <AddUserForm
            onClose={() => setShowAddForm(false)}
            onSuccess={handleAddSuccess}
          />
        )}
      </div>
    </div>
  );
}