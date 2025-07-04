import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaLock, FaUnlock, FaSearch, FaChevronLeft, FaChevronRight, FaUserCircle, FaInfoCircle } from 'react-icons/fa';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { userService, CreateUserData } from '../services/userService';
import StaffTable from './StaffManagement/Components/StaffTable';
import ConfirmModal from './StaffManagement/Components/ConfirmModal';
import RoleChangeModal from './StaffManagement/Components/RoleChangeModal';
import ResetPasswordModal from './StaffManagement/Components/ResetPasswordModal';
import NotificationModal from './StaffManagement/Components/NotificationModal';

const PAGE_SIZE = 10;
const ROLES = ['User', 'Staff', 'Admin'];
const STATUS = ['active', 'locked'];

export default function StaffManagement() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [detailUser, setDetailUser] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleUser, setRoleUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [roleError, setRoleError] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetUser, setResetUser] = useState(null);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyUser, setNotifyUser] = useState(null);

  useEffect(() => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (!userStr) {
      setAccessDenied(true);
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'Admin') {
        setAccessDenied(true);
      }
    } catch {
      setAccessDenied(true);
    }
  }, []);

  useEffect(() => {
    if (!accessDenied) fetchUsers();
    // eslint-disable-next-line
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

  useEffect(() => {
    let data = [...users];
    if (search) {
      data = data.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (roleFilter) {
      data = data.filter(u => u.role === roleFilter);
    }
    if (statusFilter) {
      data = data.filter(u => (u.status || 'active') === statusFilter);
    }
    data.sort((a, b) => {
      let v1 = a[sortKey] || '';
      let v2 = b[sortKey] || '';
      if (typeof v1 === 'string') v1 = v1.toLowerCase();
      if (typeof v2 === 'string') v2 = v2.toLowerCase();
      if (v1 < v2) return sortDir === 'asc' ? -1 : 1;
      if (v1 > v2) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    setFiltered(data);
    setPage(1);
    // eslint-disable-next-line
  }, [users, search, roleFilter, statusFilter, sortKey, sortDir]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  // Đổi vai trò
  const handleRoleChange = (user, role) => {
    if (user.role === role) return;
    setRoleUser(user);
    setNewRole(role);
    setRoleError('');
    setShowRoleModal(true);
  };
  const confirmRoleChange = async () => {
    // Kiểm tra giới hạn: chỉ 1 Admin, tối đa 20 Staff
    if (newRole === 'Admin' && users.filter(u => u.role === 'Admin').length >= 1) {
      setRoleError('Chỉ được phép có 1 Admin!');
      return;
    }
    if (newRole === 'Staff' && users.filter(u => u.role === 'Staff').length >= 20) {
      setRoleError('Tối đa 20 Staff!');
      return;
    }
    try {
      await userService.updateUser(roleUser.id, { ...roleUser, role: newRole });
      setShowRoleModal(false);
      fetchUsers();
    } catch (e) {
      setRoleError('Lỗi đổi vai trò!');
    }
  };

  // Reset mật khẩu
  const handleResetPassword = (user) => {
    setResetUser(user);
    setShowResetModal(true);
  };
  const confirmResetPassword = async (password) => {
    try {
      await userService.updateUser(resetUser.id, { ...resetUser, password });
      setShowResetModal(false);
      fetchUsers();
    } catch {
      // handle error
    }
  };

  // Khóa/mở tài khoản
  const handleLockToggle = (user) => {
    setConfirmAction(() => async () => {
      await userService.updateUser(user.id, { ...user, status: user.status === 'locked' ? 'active' : 'locked' });
      setShowConfirm(false);
      fetchUsers();
    });
    setConfirmMessage(user.status === 'locked' ? 'Mở khóa tài khoản này?' : 'Khóa tài khoản này?');
    setShowConfirm(true);
  };

  // Xóa user
  const handleDelete = (user) => {
    setConfirmAction(() => async () => {
      await userService.deleteUser(user.id);
      setShowConfirm(false);
      fetchUsers();
    });
    setConfirmMessage('Bạn có chắc chắn muốn xóa user này?');
    setShowConfirm(true);
  };

  // Gửi thông báo
  const handleNotify = (user) => {
    setNotifyUser(user);
    setShowNotifyModal(true);
  };
  const confirmNotify = (message) => {
    // Mockup gửi thông báo
    setShowNotifyModal(false);
    // Có thể show toast hoặc alert
  };

  // Xem chi tiết user
  const handleDetail = (user) => {
    setDetailUser(user);
    setShowDetail(true);
  };

  if (accessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Bạn không có phận sự để truy cập tính năng này</h2>
          <a href="/" className="text-blue-600 underline">Quay về trang chủ</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản lý Staff</h1>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm tên hoặc email..."
                className="pl-10 pr-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-2 rounded border border-gray-300">
              <option value="">Tất cả vai trò</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded border border-gray-300">
              <option value="">Tất cả trạng thái</option>
              {STATUS.map(s => <option key={s} value={s}>{s === 'active' ? 'Hoạt động' : 'Đã khóa'}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase cursor-pointer" onClick={() => { setSortKey('name'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }}>Tên</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase cursor-pointer" onClick={() => { setSortKey('email'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }}>Email</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase cursor-pointer" onClick={() => { setSortKey('role'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }}>Vai trò</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase cursor-pointer" onClick={() => { setSortKey('status'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }}>Trạng thái</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Avatar</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8"><Loading /></td></tr>
              ) : paged.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Không có user nào.</td></tr>
              ) : paged.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white cursor-pointer" onClick={() => { setDetailUser(user); setShowDetail(true); }}>
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{user.email}</td>
                  <td className="px-4 py-3 text-blue-700 dark:text-blue-300 font-bold">{user.role}</td>
                  <td className="px-4 py-3 text-center">
                    {user.status === 'locked' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold"><FaLock /> Đã khóa</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold"><FaUnlock /> Hoạt động</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover inline-block" />
                    ) : (
                      <FaUserCircle className="w-8 h-8 text-gray-400 inline-block" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center flex flex-wrap gap-2 justify-center">
                    <button className="p-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-700" title="Xem chi tiết" onClick={() => { setDetailUser(user); setShowDetail(true); }}><FaInfoCircle /></button>
                    {/* Các nút thao tác nâng cao sẽ bổ sung ở các bước tiếp theo */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"><FaChevronLeft /></button>
          <span className="font-bold">{page} / {totalPages || 1}</span>
          <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)} className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"><FaChevronRight /></button>
        </div>
      </div>
      {/* Modal xác nhận thao tác */}
      <ConfirmModal open={showConfirm} title="Xác nhận thao tác" message={confirmMessage} onConfirm={() => { if (confirmAction) confirmAction(); }} onCancel={() => setShowConfirm(false)} />
      {/* Modal đổi vai trò */}
      <RoleChangeModal open={showRoleModal} user={roleUser} newRole={newRole} onConfirm={confirmRoleChange} onCancel={() => setShowRoleModal(false)} errorMsg={roleError} />
      {/* Modal reset mật khẩu */}
      <ResetPasswordModal open={showResetModal} user={resetUser} onConfirm={confirmResetPassword} onCancel={() => setShowResetModal(false)} />
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
                <FaUserCircle className="w-20 h-20 text-gray-300" />
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
    </div>
  );
} 