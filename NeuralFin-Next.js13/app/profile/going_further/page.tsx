import { Separator } from "@/components/docsComponents/ui/separator"
import { GoingFurtherForm } from "@/app/profile/going_further/going-further-form"

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      
      <div>
        <h3 className="text-lg font-medium">Assessment</h3>
        <p className="text-sm text-muted-foreground">
          Let us go further into tailoring your portfolio to your needs.
        </p>
      </div>
      <Separator />
      <GoingFurtherForm />
    </div>
  )
}
