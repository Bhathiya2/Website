import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getUsers, deleteUser } from "../api/userManagement";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

export default function ViewUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await getUsers();
      setUsers(userData);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please check your connection and try again.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    const user = users.find(u => u.id === id);
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "text-red-400";
      case "Manager":
        return "text-blue-400";
      default:
        return "text-zinc-400";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black">Users — Admin</h1>
          <Link
            to="/dashboard/users/new"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500 text-black rounded-md font-semibold"
          >
            + Add User
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="bg-accent/10 rounded-lg border border-white/5 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-accent/5">
                    <td className="px-6 py-4 text-sm text-zinc-300">#{user.id}</td>
                    <td className="px-6 py-4 text-sm text-white">{user.first_name} {user.last_name}</td>
                    <td className="px-6 py-4 text-sm text-white">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={getRoleColor(user.role)}>{user.role}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/dashboard/users/${user.id}/edit`}
                          className="px-3 py-1 bg-yellow-500 text-black rounded-md hover:opacity-90 text-xs font-semibold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:opacity-90 text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4 p-4">
            {users.map((user) => (
              <div key={user.id} className="bg-accent/5 rounded-lg p-4 border border-white/5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm text-zinc-300">#{user.id}</div>
                    <div className="text-white font-medium">{user.first_name} {user.last_name}</div>
                    <div className="text-sm text-zinc-300">{user.email}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/users/${user.id}/edit`}
                      className="px-3 py-1 bg-yellow-500 text-black rounded-md hover:opacity-90 text-xs font-semibold"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:opacity-90 text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-zinc-400">Role:</span>
                  <span className={`ml-2 ${getRoleColor(user.role)}`}>{user.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400">No users found.</p>
            <Link
              to="/dashboard/users/new"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-cyan-500 text-black rounded-md font-semibold"
            >
              + Add First User
            </Link>
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        user={userToDelete}
      />
    </AdminLayout>
  );
}
