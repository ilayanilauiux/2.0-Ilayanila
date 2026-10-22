type IconProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
};

export function Icon({ src, width, height, alt = "", className }: IconProps) {
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      draggable={false}
      className={className ? `block shrink-0 ${className}` : "block shrink-0"}
    />
  );
}
