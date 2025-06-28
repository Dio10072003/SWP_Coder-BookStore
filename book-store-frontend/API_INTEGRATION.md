# Hướng dẫn tích hợp API vào Frontend

## Tổng quan

Dự án đã được cập nhật để sử dụng API thực tế thay vì mock data hardcode. API hiện có 20 sách với thông tin chi tiết và đa dạng thể loại.

## Cấu trúc API

### Endpoint chính: `/api/books`

#### GET `/api/books`
- **Mô tả**: Lấy danh sách tất cả sách
- **Query parameters**:
  - `category`: Lọc theo thể loại (ví dụ: "Programming", "Design", "Data Science", "Architecture", "DevOps", "Security", "Mobile", "Database", "Game Development", "Blockchain", "Cloud", "Project Management")
  - `search`: Tìm kiếm theo tên sách, tác giả hoặc mô tả
  - `id`: Lấy sách theo ID cụ thể
  - `year`: Lọc theo năm xuất bản
  - `minRating`: Lọc theo đánh giá tối thiểu
  - `maxPrice`: Lọc theo giá tối đa

#### Ví dụ sử dụng:
```javascript
// Lấy tất cả sách
fetch('/api/books')

// Lọc theo thể loại
fetch('/api/books?category=Programming')

// Tìm kiếm
fetch('/api/books?search=javascript')

// Lấy sách theo ID
fetch('/api/books?id=1')

// Lọc theo năm xuất bản
fetch('/api/books?year=2023')

// Lọc theo đánh giá tối thiểu
fetch('/api/books?minRating=4.5')

// Lọc theo giá tối đa
fetch('/api/books?maxPrice=150000')

// Kết hợp nhiều filter
fetch('/api/books?category=Programming&minRating=4.0&year=2023')
```

## Cấu trúc dữ liệu Book

```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  img: string;
  rating: number;
  description: string;
  category: string;
  publishYear: number;
  pages: number;
  language: string;
  isbn: string;
}
```

## Service Layer

### BookService (`src/app/services/bookService.ts`)

Service layer cung cấp các method để tương tác với API:

```typescript
// Lấy tất cả sách với filter
bookService.getAllBooks({ 
  category: 'Programming', 
  search: 'javascript',
  year: 2023,
  minRating: 4.5,
  maxPrice: 150000
})

// Lấy sách theo ID
bookService.getBookById(1)

// Lấy sách nổi bật
bookService.getFeaturedBooks(6)

// Lọc theo thể loại
bookService.getBooksByCategory('Programming')

// Tìm kiếm sách
bookService.searchBooks('javascript')

// Lọc theo năm xuất bản
bookService.getBooksByYear(2023)

// Lọc theo đánh giá tối thiểu
bookService.getBooksByRating(4.5)

// Lọc theo giá tối đa
bookService.getBooksByPriceRange(150000)

// Lấy danh sách thể loại
bookService.getCategories()

// Lấy danh sách năm xuất bản
bookService.getYears()
```

## Custom Hooks

### useBooks Hook (`src/app/hooks/useBooks.ts`)

Cung cấp state management cho danh sách sách:

```typescript
const { books, loading, error } = useBooks({ 
  category: 'Programming', 
  search: 'javascript',
  year: 2023,
  minRating: 4.5,
  maxPrice: 150000
});
```

### useBook Hook

Cung cấp state management cho chi tiết sách:

```typescript
const { book, loading, error } = useBook(1);
```

### useFeaturedBooks Hook

Cung cấp state management cho sách nổi bật:

```typescript
const { books, loading, error } = useFeaturedBooks(6);
```

### useBookSearch Hook

Cung cấp chức năng tìm kiếm:

```typescript
const { searchResults, loading, error, searchBooks } = useBookSearch();
searchBooks('javascript');
```

## Components

### Loading Component (`src/app/components/Loading.tsx`)

Component hiển thị trạng thái loading:

```typescript
<Loading 
  message="Đang tải sách..." 
  size="md" 
  color="purple" 
/>
```

### Error Component (`src/app/components/Error.tsx`)

Component hiển thị lỗi:

```typescript
<Error 
  message="Lỗi khi tải dữ liệu" 
  onRetry={() => refetch()} 
/>
```

## Cách sử dụng trong Components

### Trang chính (Homepage)
```typescript
import { useFeaturedBooks } from './hooks/useBooks';
import Loading from './components/Loading';
import Error from './components/Error';

export default function Home() {
  const { books, loading, error } = useFeaturedBooks(6);

  if (loading) return <Loading message="Đang tải sách..." />;
  if (error) return <Error message={`Lỗi: ${error}`} />;

  return (
    // Render books
  );
}
```

### Trang danh sách sách với filter nâng cao
```typescript
import { useBooks } from '../hooks/useBooks';

export default function BooksPage() {
  const [filters, setFilters] = useState({ 
    category: undefined, 
    search: '', 
    year: undefined,
    minRating: undefined,
    maxPrice: undefined
  });
  const { books, loading, error } = useBooks(filters);

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleSearch = (search) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleYearChange = (year) => {
    setFilters(prev => ({ ...prev, year }));
  };

  const handleRatingChange = (minRating) => {
    setFilters(prev => ({ ...prev, minRating }));
  };

  const handlePriceChange = (maxPrice) => {
    setFilters(prev => ({ ...prev, maxPrice }));
  };

  // Render with advanced filters
}
```

### Trang chi tiết sách với thông tin đầy đủ
```typescript
import { useBook } from '../../hooks/useBooks';

export default function BookDetailPage() {
  const { id } = useParams();
  const { book, loading, error } = useBook(Number(id));

  if (loading) return <Loading message="Đang tải thông tin sách..." />;
  if (error) return <Error message={`Lỗi: ${error}`} />;
  if (!book) return <Error message="Không tìm thấy sách!" />;

  // Render book details with full information
  // - Title, author, rating, price
  // - Description
  // - Publish year, pages, language, ISBN
  // - Category
  // - Action buttons
}
```

## Tính năng mới

### 1. Dữ liệu mở rộng
- **20 sách** với thông tin chi tiết
- **12 thể loại** đa dạng
- **Thông tin bổ sung**: năm xuất bản, số trang, ngôn ngữ, ISBN

### 2. Filter nâng cao
- **Category Filter**: Lọc theo thể loại sách
- **Year Filter**: Lọc theo năm xuất bản
- **Rating Filter**: Lọc theo đánh giá tối thiểu
- **Price Filter**: Lọc theo giá tối đa
- **Search Enhancement**: Tìm kiếm trong title, author, description

### 3. UI/UX cải thiện
- **Responsive Design**: Tương thích mobile và desktop
- **Loading States**: Hiển thị trạng thái loading
- **Error Handling**: Xử lý lỗi gracefully
- **Clear Filters**: Nút xóa tất cả filter
- **Results Count**: Hiển thị số lượng kết quả

## Lợi ích của việc sử dụng API

1. **Dữ liệu động**: Có thể cập nhật dữ liệu mà không cần deploy lại frontend
2. **Tính linh hoạt**: Dễ dàng thêm/sửa/xóa sách thông qua API
3. **Tái sử dụng**: API có thể được sử dụng bởi nhiều client khác nhau
4. **Bảo mật**: Có thể thêm authentication và authorization
5. **Performance**: Có thể implement caching và pagination
6. **Scalability**: Dễ dàng mở rộng thêm tính năng

## Các bước tiếp theo

1. **Database Integration**: Kết nối API với database thực tế
2. **Authentication**: Thêm hệ thống đăng nhập/đăng ký
3. **Admin Panel**: Tạo giao diện quản lý sách
4. **Caching**: Implement Redis hoặc in-memory caching
5. **Pagination**: Thêm phân trang cho danh sách sách
6. **Search Enhancement**: Cải thiện chức năng tìm kiếm với full-text search
7. **Shopping Cart**: Thêm chức năng giỏ hàng
8. **User Reviews**: Thêm hệ thống đánh giá và bình luận
9. **Wishlist**: Thêm chức năng danh sách yêu thích
10. **Recommendations**: Hệ thống gợi ý sách dựa trên lịch sử 