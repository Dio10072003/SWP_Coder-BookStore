'use client';
import { useRouter } from 'next/navigation';

export default function CategoryDetailPage({ params }) {
  const router = useRouter();
  const { Category } = params;

  // Mô tả mẫu cho từng chủ đề (có thể mở rộng sau)
  const descriptions = {
    Biography: 'Khám phá những câu chuyện cuộc đời truyền cảm hứng từ các nhân vật nổi tiếng.',
    Fantasy: 'Thế giới kỳ ảo, phép thuật và những cuộc phiêu lưu không giới hạn.',
    Fiction: 'Những tác phẩm hư cấu đa dạng thể loại, từ lãng mạn đến trinh thám.',
    History: 'Tìm hiểu về các sự kiện, nhân vật và nền văn minh trong lịch sử.',
    Mystery: 'Những vụ án bí ẩn, câu chuyện ly kỳ chờ bạn khám phá.',
    Nonfiction: 'Kiến thức thực tế, kỹ năng sống, kinh doanh, khoa học và hơn thế nữa.',
    Romance: 'Thế giới của tình yêu, cảm xúc và những câu chuyện lãng mạn.',
    ScienceFiction: 'Công nghệ, vũ trụ, tương lai và những ý tưởng vượt ngoài trí tưởng tượng.',
    SelfHelp: 'Phát triển bản thân, kỹ năng sống, truyền cảm hứng và động lực.',
    Thriller: 'Hồi hộp, gay cấn, những câu chuyện khiến bạn không thể rời mắt.',
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full bg-blue-50 rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow">{Category}</h1>
        <p className="text-lg text-gray-700 mb-8">{descriptions[Category] || 'Chủ đề sách hấp dẫn đang chờ bạn khám phá!'}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-all"
        >
          ← Quay lại
        </button>
      </div>
    </div>
  );
} 