'use client'
import { useEffect, useState } from 'react';
import StaffTable from '../admin/StaffManagement/Components/StaffTable';
import NotificationModal from '../admin/StaffManagement/Components/NotificationModal';
import Loading from '../components/Loading';
import { userService } from '../services/userService';

const emptyUser = {
  name: '',
  email: '',
  role: 'User',
  avatar: '',
  status: 'active',
};

export default function StaffPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailUser, setDetailUser] = useState(null);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyUser, setNotifyUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [form, setForm] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (!userStr) {
      setAccessDenied(true);
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'Admin' && user.role !== 'Staff') {
        setAccessDenied(true);
      }
      if (user.role === 'Admin') setIsAdmin(true);
    } catch {
      setAccessDenied(true);
    }
  }, []);

  useEffect(() => {
    if (!accessDenied) fetchUsers();
  }, [accessDenied]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await userService.getAllUsers();
      setUsers(users);
      setLoading(false);
    } catch {
      setUsers([]);
      setLoading(false);
    }
  };

  // CRUD
  const openCreateModal = () => {
    setForm(emptyUser);
    setModalType('create');
    setShowModal(true);
    setEditingId(null);
    setFormError(null);
  };
  const openEditModal = (user) => {
    setForm({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'User',
      avatar: user.avatar || '',
      status: user.status || 'active',
    });
    setModalType('edit');
    setShowModal(true);
    setEditingId(user.id);
    setFormError(null);
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      if (modalType === 'create') {
        await userService.createUser(form);
        setSuccessMsg('Đã thêm user!');
      } else if (modalType === 'edit' && editingId) {
        await userService.updateUser(editingId, form);
        setSuccessMsg('Đã cập nhật user!');
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    }
  };
  const handleDelete = async (user) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa user này?')) return;
    setDeleteLoading(true);
    try {
      await userService.deleteUser(user.id);
      setSuccessMsg('Đã xóa user!');
      fetchUsers();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Xem chi tiết user
  const handleDetail = (user) => {
    setDetailUser(user);
    setShowDetail(true);
  };

  // Gửi thông báo
  const handleNotify = (user) => {
    setNotifyUser(user);
    setShowNotifyModal(true);
  };
  const confirmNotify = (message) => {
    setShowNotifyModal(false);
    // Mockup gửi thông báo
  };

  if (accessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Bạn không có quyền truy cập trang này</h2>
          <a href="/" className="text-blue-600 underline">Quay về trang chủ</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-cyan-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-green-700 text-center">Staff Panel</h1>
          {isAdmin && <button onClick={openCreateModal} className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-cyan-500 hover:to-green-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition">+ Thêm user</button>}
        </div>
        <p className="text-center text-gray-600 mb-6">Chào mừng bạn đến với bảng điều khiển dành cho Staff.<br/>Bạn có thể xem danh sách người dùng, xem chi tiết và gửi thông báo.</p>
        {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
        {formError && <div className="text-red-500 mb-2">{formError}</div>}
        {loading ? <Loading /> : (
          <StaffTable
            users={users}
            onDetail={handleDetail}
            onDelete={isAdmin ? handleDelete : undefined}
            onRoleChange={isAdmin ? async (user, newRole) => { await userService.updateUser(user.id, { role: newRole }); fetchUsers(); } : undefined}
            onResetPassword={isAdmin ? (user) => alert('Chức năng reset mật khẩu đang phát triển!') : undefined}
            onLockToggle={isAdmin ? async (user) => { await userService.updateUser(user.id, { status: user.status === 'locked' ? 'active' : 'locked' }); fetchUsers(); } : undefined}
            onNotify={handleNotify}
            isAdmin={isAdmin}
          />
        )}
      </div>
      {/* Modal gửi thông báo */}
      <NotificationModal open={showNotifyModal} user={notifyUser} onSend={confirmNotify} onCancel={() => setShowNotifyModal(false)} />
      {/* Modal chi tiết user */}
      {showDetail && detailUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowDetail(false)}>&times;</button>
            <div className="flex flex-col items-center gap-2">
              {detailUser.avatar ? (
                <img src={detailUser.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover border-4 border-blue-200" />
              ) : (
                <span className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">?</span>
              )}
              <div className="text-xl font-bold mt-2">{detailUser.name}</div>
              <div className="text-gray-600">{detailUser.email}</div>
              <div className="text-blue-700 font-semibold">Vai trò: {detailUser.role}</div>
              <div className="text-xs mt-2">Trạng thái: {detailUser.status === 'locked' ? 'Đã khóa' : 'Hoạt động'}</div>
              {/* Mockup log hoạt động */}
              <div className="w-full mt-4">
                <div className="font-bold mb-2 text-gray-700">Lịch sử hoạt động (mockup):</div>
                <ul className="text-xs text-gray-500 list-disc pl-5">
                  <li>Đăng nhập gần nhất: 2024-06-01 09:00</li>
                  <li>Đổi mật khẩu: 2024-05-28 14:22</li>
                  <li>Được tạo bởi Admin: 2024-05-01 10:00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal thêm/sửa user */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">{modalType === 'create' ? 'Thêm user' : 'Sửa user'}</h2>
            <label className="block mb-2">Tên
              <input name="name" value={form.name} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Email
              <input name="email" value={form.email} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Vai trò
              <select name="role" value={form.role} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2">
                <option value="User">User</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </select>
            </label>
            <label className="block mb-2">Avatar (URL)
              <input name="avatar" value={form.avatar} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">Trạng thái
              <select name="status" value={form.status} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2">
                <option value="active">Hoạt động</option>
                <option value="locked">Đã khóa</option>
              </select>
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Hủy</button>
              <button type="submit" className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-bold">Lưu</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 