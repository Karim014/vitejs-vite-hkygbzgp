export default function Avatar({ src, alt, size = 10 }) {
  const sizeClass = `w-${size} h-${size}`
  return (
    <div
      className={`${sizeClass} rounded-full overflow-hidden bg-[#F1EDEC] border border-border flex-shrink-0`}
      style={{ width: size * 4, height: size * 4 }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}
