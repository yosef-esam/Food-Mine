import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAll } from "../../services/userServices";
import { toggleBlock } from "../../services/userServices";
import NotFound from "../../component/NotFound";
import Search from "../../component/Search";
import { toast } from "react-toastify";

function UsersAdminPage() {
  const { searchTerm } = useParams();
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers(searchTerm);
  }, [searchTerm]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const users = await getAll(searchTerm);
      setUsers(users);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handletoggleBlock = async (userId) => {
    try {
      const isBlocked = await toggleBlock(userId);
      setUsers((oldusers) =>
        oldusers.map((user) =>
          user._id === userId ? { ...user, isBlocked } : user
        )
      );
      toast.success(`User ${isBlocked ? 'blocked' : 'unblocked'} successfully`);
    } catch (error) {
      console.error("Error toggling user block:", error);
      toast.error("Failed to update user status");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Users</h1>
          <p className="text-gray-600">View and manage user accounts and permissions</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <Search
                SearchRoute={"/admin/users/"}
                defaultRoute={"/admin/users"}
                placeholder={"Search for users..."}
              />
            </div>
            <div className="text-sm text-gray-500">
              {users && (
                <span>Showing {users.length} user{users.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-white">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3">
                <h3 className="font-semibold">User</h3>
              </div>
              <div className="col-span-3">
                <h3 className="font-semibold">Email</h3>
              </div>
              <div className="col-span-3">
                <h3 className="font-semibold">Address</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold">Role</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="font-semibold">Actions</h3>
              </div>
            </div>
          </div>

          {/* Users Items */}
          <div className="divide-y divide-gray-100">
            {!users || users.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-500">
                  {searchTerm ? `No users match "${searchTerm}"` : "No users in the system"}
                </p>
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* User Info */}
                    <div className="col-span-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">ID: {user._id.slice(-6)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-3">
                      <p className="text-gray-900">{user.email}</p>
                    </div>

                    {/* Address */}
                    <div className="col-span-3">
                      <p className="text-gray-700 truncate" title={user.address}>
                        {user.address || 'No address'}
                      </p>
                    </div>

                    {/* Role */}
                    <div className="col-span-2 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.isAdmin 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/admin/editUser/${user._id}`}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                          title="Edit user"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        {!user.isAdmin && (
                          <button
                            onClick={() => handletoggleBlock(user._id)}
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded transition-colors ${
                              user.isBlocked
                                ? 'text-green-600 hover:text-green-800 hover:bg-green-50'
                                : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                            }`}
                            title={user.isBlocked ? 'Unblock user' : 'Block user'}
                          >
                            {user.isBlocked ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364" />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Summary Footer */}
        {users && users.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{users.length}</span> user{users.length !== 1 ? 's' : ''}
              </div>
              <div className="text-sm text-gray-600">
                Admins: <span className="font-semibold text-purple-600">
                  {users.filter(user => user.isAdmin).length}
                </span> • 
                Blocked: <span className="font-semibold text-red-600">
                  {users.filter(user => user.isBlocked).length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersAdminPage;
