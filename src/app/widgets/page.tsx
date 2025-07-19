import { PageHeader } from "@/components/page-header";
import { WidgetPreview } from "@/components/widget-preview";
import { widgets } from "@/lib/data";

export default function WidgetsPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Embeddable Widgets"
        description="Add our radio players and station info to your website."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        {widgets.map((widget) => (
          <WidgetPreview key={widget.id} widget={widget} />
        ))}
      </div>
    </div>
  )
}
