import React from 'react';

export default function AddBookModal({ visible, onClose, onSubmit, form, onFormChange, modalType, formError }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">{modalType === 'create' ? 'Thêm sách' : 'Sửa sách'}</h2>
        {formError && <div className="mb-2 text-red-500 font-semibold">{formError}</div>}
        <label className="block mb-2">Tên sách
          <input name="title" value={form.title} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
        </label>
        <label className="block mb-2">Tác giả
          <input name="author" value={form.author} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
        </label>
        <label className="block mb-2">Giá (VND)
          <input name="price" value={form.price} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
        </label>
        <label className="block mb-2">Ảnh bìa (URL)
          <input name="img" value={form.img} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" />
        </label>
        <label className="block mb-2">Đánh giá (0-5)
          <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" />
        </label>
        <label className="block mb-2">Mô tả
          <textarea name="description" value={form.description} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" />
        </label>
        <label className="block mb-2">Thể loại
          <input name="category" value={form.category} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
        </label>
        <label className="block mb-2">Năm xuất bản
          <input name="publishYear" type="number" value={form.publishYear} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" />
        </label>
        <label className="block mb-2">Số trang
          <input name="pages" type="number" value={form.pages} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" />
        </label>
        <label className="block mb-2">Ngôn ngữ
          <input name="language" value={form.language} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" />
        </label>
        <label className="block mb-2">ISBN
          <input name="isbn" value={form.isbn} onChange={onFormChange} className="w-full border rounded px-3 py-2 mb-2" />
        </label>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Hủy</button>
          <button type="submit" className="px-4 py-2 rounded bg-pink-500 hover:bg-pink-600 text-white font-bold">Lưu</button>
        </div>
      </form>
    </div>
  );
} 