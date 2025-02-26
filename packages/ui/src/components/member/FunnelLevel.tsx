export default function FunnelLevel({ level = 0 }: { level?: number }) {
  return (
    <div
      className="w-full my-3"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={4}
      aria-valuenow={level}
    >
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1 flex-1 rounded-full transition-colors ${
              step <= level ? 'bg-[#FFD700]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
