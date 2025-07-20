import React from 'react';

export default function AddBookModal({ visible, onClose, onSubmit, form, onFormChange, modalType, formError, isSubmitting = false }) {
  console.log('AddBookModal render:', { visible, modalType, formError, isSubmitting });
  if (!visible) return null;
  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto min-h-screen"
      onClick={(e) => {
        console.log('Background clicked');
        onClose(e);
      }}
    >
      <div className="my-auto">
      <form
        onSubmit={(e) => {
          console.log('Form submitted');
          onSubmit(e);
        }}
        className="bg-white rounded-2xl shadow-2xl p-4 sm:p-5 w-full max-w-xs sm:max-w-sm md:max-w-md relative mx-4"
        style={{ minWidth: 0, maxWidth: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={(e) => {
            console.log('Close button clicked');
            onClose(e);
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-3 text-gray-800 text-center">
          {modalType === 'create' ? 'Thêm sách mới' : 'Sửa sách'}
        </h2>
        {formError && (
          <div className="mb-2 text-red-500 font-semibold text-center">{formError}</div>
        )}
        <div className="flex flex-col gap-3">
          {/* Tên sách */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">Tên sách *</label>
            <input
              name="title"
              value={form.title}
              onChange={(e) => {
                console.log('Title changed:', e.target.value);
                onFormChange(e);
              }}
              placeholder="Nhập tên sách"
              className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
              required
            />
          </div>
          {/* Tác giả */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">Tác giả *</label>
            <input
              name="author"
              value={form.author}
              onChange={(e) => {
                console.log('Author changed:', e.target.value);
                onFormChange(e);
              }}
              placeholder="Nhập tên tác giả"
              className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
              required
            />
          </div>
          {/* Giá & Thể loại */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1 text-gray-600">Giá (VND)</label>
                          <input
              name="price"
              value={form.price}
              onChange={(e) => {
                console.log('Price changed:', e.target.value);
                onFormChange(e);
              }}
              placeholder="100000"
              className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
              required
            />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1 text-gray-600">Thể loại</label>
              <input
                name="category"
                value={form.category}
                onChange={onFormChange}
                placeholder="Tiểu thuyết, Khoa học..."
                className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
                required
              />
            </div>
          </div>
          {/* Ảnh bìa */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">Ảnh bìa (URL)</label>
            <input
              name="img"
              value={form.img}
              onChange={onFormChange}
              placeholder="https://example.com/book.jpg"
              className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
            />
          </div>
          {/* Đánh giá & Năm xuất bản */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1 text-gray-600">Đánh giá (0-5)</label>
              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={onFormChange}
                placeholder="4.5"
                className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1 text-gray-600">Năm xuất bản</label>
              <input
                name="publishYear"
                type="number"
                value={form.publishYear || ''}
                onChange={onFormChange}
                placeholder="2024"
                className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
              />
            </div>
          </div>
          {/* Số trang & Ngôn ngữ */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1 text-gray-600">Số trang</label>
              <input
                name="pages"
                type="number"
                value={form.pages}
                onChange={onFormChange}
                placeholder="320"
                className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1 text-gray-600">Ngôn ngữ</label>
              <input
                name="language"
                value={form.language}
                onChange={onFormChange}
                placeholder="Tiếng Việt"
                className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
              />
            </div>
          </div>
          {/* ISBN */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">ISBN</label>
            <input
              name="isbn"
              value={form.isbn}
              onChange={onFormChange}
              placeholder="978-604-77-1234-5"
              className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
            />
          </div>
          {/* Mô tả */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">Mô tả</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onFormChange}
              placeholder="Mô tả ngắn về sách"
              className="w-full border rounded px-2 py-1.5 focus:ring-2 focus:ring-pink-400 outline-none text-sm transition"
              rows={2}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang lưu...
              </span>
            ) : (
              modalType === 'create' ? 'Thêm sách' : 'Lưu'
            )}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
} 