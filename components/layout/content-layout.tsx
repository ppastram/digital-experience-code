"use client"

export function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 min-h-0 flex-col">
      <div className="flex flex-1 min-h-0">
        <main className="flex-1 bg-uae-gray-50 p-3 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
