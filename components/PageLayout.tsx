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

    <main className="space-y-5 md:space-y-6 overflow-x-hidden">

      <Card className="p-5 md:p-7">

        <div
          className="
            flex flex-col gap-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div className="min-w-0">

            <h1
              className="
                text-2xl sm:text-3xl md:text-4xl
                font-extrabold tracking-tight
                wrap-break-word
              "
            >
              {title}
            </h1>

            {subtitle ? (

              <p className="mt-2 text-sm md:text-base text-gray-600 wrap-break-word">
                {subtitle}
              </p>

            ) : null}

          </div>

          {right ? (

            <div className="flex flex-wrap gap-2">
              {right}
            </div>

          ) : null}

        </div>

      </Card>

      {children}

    </main>

  );
}