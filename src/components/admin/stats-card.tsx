interface StatsCardProps {
  label: string;
  value: string | number;
  description?: string;
}

export function StatsCard({ label, value, description }: StatsCardProps) {
  return (
    <div className="bg-white border border-[#e5e5e5] p-6">
      <p className="text-sm text-[#595959] mb-1">{label}</p>
      <p className="text-3xl font-semibold text-[#1b1b1b]">{value}</p>
      {description && (
        <p className="text-xs text-[#808080] mt-1">{description}</p>
      )}
    </div>
  );
}
