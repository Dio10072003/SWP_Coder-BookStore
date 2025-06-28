interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'purple' | 'yellow' | 'blue' | 'green';
}

export default function Loading({ 
  message = "Đang tải...", 
  size = 'md', 
  color = 'purple' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colorClasses = {
    purple: 'border-purple-600',
    yellow: 'border-yellow-400',
    blue: 'border-blue-600',
    green: 'border-green-600'
  };

  return (
    <div className="text-center py-10">
      <div 
        className={`inline-block animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
      ></div>
      <p className="mt-2 text-gray-600">{message}</p>
    </div>
  );
} 