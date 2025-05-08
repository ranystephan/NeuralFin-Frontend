import { ReactNode } from "react"
import { Info, AlertCircle, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  type?: "info" | "warning" | "success"
  title?: string
  children?: ReactNode
  icon?: ReactNode
}

export function Callout({
  type = "info",
  title,
  children,
  icon,
  ...props
}: CalloutProps) {
  const IconComponent = {
    info: Info,
    warning: AlertCircle,
    success: Check,
  }[type]

  return (
    <div
      className={cn(
        "my-6 flex gap-4 rounded-lg border p-4",
        {
          "border-blue-500/20 bg-blue-500/10": type === "info",
          "border-amber-500/20 bg-amber-500/10": type === "warning",
          "border-green-500/20 bg-green-500/10": type === "success",
        }
      )}
      {...props}
    >
      <div className="mt-1 flex-shrink-0">
        {icon || (
          <IconComponent
            className={cn("h-5 w-5", {
              "text-blue-400": type === "info",
              "text-amber-400": type === "warning", 
              "text-green-400": type === "success",
            })}
          />
        )}
      </div>
      <div>
        {title && <h4 className="font-medium mb-1">{title}</h4>}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}
