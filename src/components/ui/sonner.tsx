import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: '!bg-primary/10 !text-primary !border-primary/20',
          error: '!bg-destructive/10 !text-destructive !border-destructive/20',
          warning: '!bg-yellow-500/10 !text-yellow-600 dark:!text-yellow-400 !border-yellow-500/20',
          info: '!bg-blue-500/10 !text-blue-600 dark:!text-blue-400 !border-blue-500/20',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
