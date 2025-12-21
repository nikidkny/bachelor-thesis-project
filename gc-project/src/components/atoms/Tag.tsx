export default function Tag({
    label,
    }: {
    label: string | number;
    }) {
    return (
    <span className="backdrop-blur-220 text-gray-800 border text-[12px]  md:text-sm px-3 py-1 rounded-sm">
        {label}
    </span>
    );
}