export default function Loading() {
  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div
        className="w-10 h-10 rounded-full"
        style={{
          border: '1px solid rgba(191,84,44,0.15)',
          borderTopColor: 'rgba(191,84,44,0.8)',
          animation: 'spin 0.9s linear infinite',
          boxShadow: '0 0 12px rgba(191,84,44,0.2)',
        }}
      />
    </div>
  );
}
