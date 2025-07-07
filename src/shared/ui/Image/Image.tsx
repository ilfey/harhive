import "./Image.scss"
import {clsx} from "clsx";
import {css} from "generated/css";
import {ComponentProps, useState} from "react"


type ImageProps = ComponentProps<"img"> & {
  src?: string | null
  fallbackSrc?: string | null
}

const pendingCn = css({
  animation: 'pulse',
  bgColor: 'neutral.900'
})

export const Image = ({className, src, fallbackSrc, alt, onError, ...props}: ImageProps) => {
  const [pending, setPending] = useState(true)
  const [error, setError] = useState(!src)

  if (error && fallbackSrc) {
    return (
      <img
        className={
          clsx({[pendingCn]: pending}, className)
        }
        src={fallbackSrc}
        onLoad={() => setPending(false)}
        onError={onError}
        alt={alt ?? ''}
        {...props}
      />
    )
  }

  return (
    <img
      className={
        clsx({[pendingCn]: pending}, className)
      }
      src={src!}
      onLoad={() => setPending(false)}
      onError={(event) => {
        onError?.(event)
        setError(true);
      }}
      alt={alt ?? ''}
      {...props}
    />
  )
}