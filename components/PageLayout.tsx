import Card from "@/components/Card";

export default function PageLayout({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="space-y-6">
      <Card className="p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {title}
            </h1>
            {subtitle ? <p className="mt-2 text-gray-600">{subtitle}</p> : null}
          </div>
          {right ? <div className="flex gap-2">{right}</div> : null}
        </div>
      </Card>

      {children}
    </main>
  );
}
