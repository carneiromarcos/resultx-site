/* Logomarca oficial do site (public/images/logo-resultx.svg), recortada por
   CSS em .rx-logo (ver global.css). A altura vem de --logo-h. */
export default function Logo({ className }: { className?: string }) {
  return (
    <span className={['rx-logo', className].filter(Boolean).join(' ')}>
      <img src="/images/logo-resultx.svg" alt="ResultX" width="400" height="400" />
    </span>
  )
}
