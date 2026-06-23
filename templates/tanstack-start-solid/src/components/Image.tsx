type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  class?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
};

export function Image(props: ImageProps) {
  return (
    <img
      src={buildImageUrl(props)}
      alt={props.alt}
      width={props.width}
      height={props.height}
      loading={props.loading ?? 'lazy'}
      decoding="async"
      class={props.class}
      sizes={props.sizes}
    />
  );
}

function buildImageUrl(props: ImageProps) {
  if (/^https?:\/\//.test(props.src)) {
    return props.src;
  }

  const modifiers = [props.width ? `w_${props.width}` : undefined, `f_${props.format ?? 'auto'}`].filter(Boolean).join(',');
  return `/ipx/${modifiers || '_'}/${props.src.replace(/^\//, '')}`;
}
