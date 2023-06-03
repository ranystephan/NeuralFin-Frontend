import { Separator } from "@/components/docsComponents/ui/separator"
import { AssessmentForm } from "@/app/profile/assessment/assessment-form"

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Assessment</h3>
        <p className="text-sm text-muted-foreground">
          Let us know about your risk tolerance and investment goals so we can recommend the best portfolio for you.
        </p>
      </div>
      <Separator />
      <AssessmentForm />
    </div>
  )
}
