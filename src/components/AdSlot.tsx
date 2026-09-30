interface AdSlotProps {
  slot: 'header' | 'sidebar' | 'in-content' | 'footer';
}

export default function AdSlot({ slot }: AdSlotProps) {
  const isLarge = slot === 'sidebar' || slot === 'in-content';
  return (
    <div className={`w-full flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 ${isLarge ? 'min-h-[250px]' : 'min-h-[90px]'}`}>
      <span className="text-xs text-slate-400 dark:text-slate-500">Advertisement</span>
      {/* Google AdSense ad unit — replace data-ad-slot */}
      <div
        className="hidden"
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="1234567890"
        data-ad-format={isLarge ? 'rectangle' : 'horizontal'}
      />
    </div>
  );
}
