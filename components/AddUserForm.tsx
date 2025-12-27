'use client';

import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUserStore } from '@/store/userStore';
import { User } from '@/types/user';

const addUserSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  companyName: z.string().min(1, 'Company name is required'),
  phone: z.string().optional(),
  website: z.string().url('Invalid URL format').optional().or(z.literal('')),
  city: z.string().optional(),
});

type AddUserFormData = z.infer<typeof addUserSchema>;

interface AddUserFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AddUserForm = ({ onClose, onSuccess }: AddUserFormProps) => {
  const { addUser, users } = useUserStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      website: '',
      companyName: '',
      city: '',
    },
  });

  const generateId = () => Math.max(0, ...users.map(u => u.id)) + 1;

  const onSubmit = (data: AddUserFormData) => {
    const newUser: User = {
      id: generateId(),
      name: data.name,
      username: data.name.toLowerCase().replace(/\s+/g, '.'),
      email: data.email,
      phone: data.phone || 'N/A',
      website: data.website || 'N/A',
      address: { street: '', suite: '', city: data.city || '', zipcode: '' },
      company: { name: data.companyName, catchPhrase: '', bs: '' },
    };

    addUser(newUser);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add New Member</h2>
            <p className="text-sm text-gray-500 mt-0.5">Fill in the details below</p>
          </div>
          <button title='close' onClick={onClose} className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="John Doe"
                {...register('name')}
                className={`w-full px-4 py-2.5 text-gray-900 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all ${
                  errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="john@company.com"
                {...register('email')}
                className={`w-full px-4 py-2.5 text-gray-900 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all ${
                  errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Company <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Acme Inc."
                {...register('companyName')}
                className={`w-full px-4 py-2.5 text-gray-900 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all ${
                  errors.companyName ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.companyName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input
                type="number"
                placeholder="+977 1234567890"
                {...register('phone')}
                className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
              <input
                type="url"
                placeholder="https://example.com"
                {...register('website')}
                className={`w-full px-4 py-2.5 text-gray-900 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all ${
                  errors.website ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.website && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.website.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
              <input
                type="text"
                placeholder="New York"
                {...register('city')}
                className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 cursor-pointer text-gray-700 font-medium bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Adding...
                </span>
              ) : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};