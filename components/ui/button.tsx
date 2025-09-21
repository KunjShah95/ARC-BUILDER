import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 group relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98] hover:from-primary/90 hover:to-primary',
        destructive:
          'bg-gradient-to-r from-destructive to-destructive/90 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98] hover:from-destructive/90 hover:to-destructive',
        outline:
          'border-2 border-border glass glass-strong hover:border-primary/50 shadow-md hover:shadow-lg hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98] bg-background/50 backdrop-blur-sm',
        secondary:
          'bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98]',
        ghost:
          'hover:bg-accent/20 hover:backdrop-blur-sm hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98] rounded-xl transition-all duration-300',
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors duration-300',
        premium: 'bg-gradient-to-r from-primary via-accent to-primary text-white shadow-2xl hover:shadow-3xl hover:scale-[1.05] focus:scale-[1.05] active:scale-[0.95] animate-shimmer bg-size-200 bg-pos-0 hover:bg-pos-100',
        glass: 'glass glass-strong border-2 border-white/20 text-foreground hover:border-primary/50 shadow-xl hover:shadow-2xl hover:scale-[1.02] backdrop-blur-xl',
      },
      size: {
        default: 'h-10 px-6 py-2 has-[>svg]:px-5 text-sm',
        sm: 'h-8 rounded-lg gap-1.5 px-4 has-[>svg]:px-3 text-xs font-semibold',
        lg: 'h-12 rounded-2xl px-8 has-[>svg]:px-6 text-base font-bold',
        xl: 'h-14 rounded-2xl px-10 has-[>svg]:px-8 text-lg font-bold',
        icon: 'size-10 rounded-xl',
        'icon-sm': 'size-8 rounded-lg',
        'icon-lg': 'size-12 rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
