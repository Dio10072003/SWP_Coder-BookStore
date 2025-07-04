import { useState, useMemo } from 'react';
import { FaLock, FaUnlock, FaInfoCircle, FaUserCircle, FaTrash } from 'react-icons/fa';

const PAGE_SIZE = 10;
const ROLES = ['User', 'Staff', 'Admin'];
const STATUS = ['active', 'locked'];

export default function StaffTable({ users, onDetail, onRoleChange, onResetPassword, onLockToggle, onDelete, onNotify, isAdmin }) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
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
    return data;
  }, [users, search, roleFilter, statusFilter, sortKey, sortDir]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tên hoặc email..."
          className="pl-3 pr-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-2 rounded border border-gray-300">
          <option value="">Tất cả vai trò</option>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded border border-gray-300">
          <option value="">Tất cả trạng thái</option>
          {STATUS.map(s => <option key={s} value={s}>{s === 'active' ? 'Hoạt động' : 'Đã khóa'}</option>)}
        </select>
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
            {paged.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">Không có user nào.</td></tr>
            ) : paged.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white cursor-pointer" onClick={() => onDetail(user)}>
                  {user.name}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{user.email}</td>
                <td className="px-4 py-3 text-blue-700 dark:text-blue-300 font-bold">
                  <select value={user.role} onChange={e => onRoleChange(user, e.target.value)} className="bg-transparent font-bold">
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-center">
                  {isAdmin && typeof onLockToggle === 'function' ? (
                    <button onClick={() => onLockToggle(user)} className={user.status === 'locked' ? 'text-red-600' : 'text-green-600'}>
                      {user.status === 'locked' ? <FaLock /> : <FaUnlock />}
                    </button>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover inline-block" />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-gray-400 inline-block" />
                  )}
                </td>
                <td className="px-4 py-3 text-center flex flex-wrap gap-2 justify-center">
                  <button className="p-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-700" title="Xem chi tiết" onClick={() => onDetail(user)}><FaInfoCircle /></button>
                  <button className="p-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700" title="Reset mật khẩu" onClick={() => onResetPassword(user)}>Reset</button>
                  <button className="p-2 rounded bg-red-100 hover:bg-red-200 text-red-700" title="Xóa user" onClick={() => onDelete(user)}><FaTrash /></button>
                  <button className="p-2 rounded bg-green-100 hover:bg-green-200 text-green-700" title="Gửi thông báo" onClick={() => onNotify(user)}>Gửi TB</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">&lt;</button>
        <span className="font-bold">{page} / {totalPages || 1}</span>
        <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)} className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">&gt;</button>
      </div>
    </div>
  );
} 