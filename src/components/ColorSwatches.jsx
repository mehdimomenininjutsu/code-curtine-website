export function ColorSwatches({ colors, selected, onSelect, size = 18 }) {
  if (!colors || colors.length === 0) return null;
  return (
    <div className="product-swatches" role="group" aria-label="انتخاب رنگ">
      {colors.map((c, i) => (
        <button
          key={i}
          className={`swatch ${selected === i ? 'selected' : ''}`}
          style={{ width: size, height: size, background: c.hex }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSelect?.(i); }}
          aria-label={c.name}
          aria-pressed={selected === i}
          title={c.name}
        />
      ))}
    </div>
  );
}
