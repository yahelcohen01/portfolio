export default function Chip({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 text-sm bg-gray-50 dark:bg-stone-700 text-gray-700 dark:text-gray-300 rounded-full ring-1 ring-gray-300">
      {label}
    </span>
  );
}
