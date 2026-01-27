import neuronaLogo from '@/assets/neurona-logo-completo.png';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
}

const LoadingSpinner = ({ size = 'md', message }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="relative">
        <img 
          src={neuronaLogo} 
          alt="Neurona" 
          className={`${sizeClasses[size]} object-contain animate-pulse`}
        />
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin`}></div>
      </div>
      {message && (
        <p className="text-white/70 text-sm text-center max-w-xs">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
