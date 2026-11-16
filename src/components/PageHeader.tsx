import type { ReactNode } from 'react'

/** The plain opening of an inner page: the title, an optional line under it. */
export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="px-gutter pt-[clamp(40px,6vw,88px)] pb-[clamp(28px,4vw,56px)]">
      <h1 className="font-display text-display">{title}</h1>
      {children && <div className="mt-4 max-w-[56ch] text-body">{children}</div>}
    </header>
  )
}
