import { Separator } from "@/components/docsComponents/ui/separator"
import { AccountForm } from "@/app/profile/account/account-form"
import { NotificationsForm } from "@/app/profile/notifications/notifications-form"

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  )
}
