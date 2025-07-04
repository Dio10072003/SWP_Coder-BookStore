'use client'
import { useEffect, useState } from 'react';
import StaffTable from '../admin/StaffManagement/Components/StaffTable';
import NotificationModal from '../admin/StaffManagement/Components/NotificationModal';
import Loading from '../components/Loading';
import { userService } from '../services/userService';

export default function StaffPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailUser, setDetailUser] = useState(null);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyUser, setNotifyUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

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
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">Staff Panel</h1>
        <p className="text-center text-gray-600 mb-6">Chào mừng bạn đến với bảng điều khiển dành cho Staff.<br/>Bạn có thể xem danh sách người dùng, xem chi tiết và gửi thông báo.</p>
        {loading ? <Loading /> : (
          <StaffTable
            users={users}
            onDetail={handleDetail}
            onNotify={handleNotify}
            isAdmin={isAdmin}
            // Không truyền các callback thao tác nâng cao nếu không phải Admin
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
    </div>
  );
} 