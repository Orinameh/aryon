export default function Score({ score }: { score: number }) {
  const total = 5;
  const full = Math.floor((score / 100) * total);
  return (
    <div className="flex gap-1">
      {[...Array(full)].map((_, index) => (
        <div data-testid="full" key={index} className={`w-2 h-3 bg-primary`} />
      ))}
      {[...Array(total - full)].map((_, index) => (
        <div data-testid="empty" key={index} className={`w-2 h-3 bg-slate-200`} />
      ))}
    </div>
  );
}
