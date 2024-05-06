import PageHeader from "@/components/PageHeader";
import RequireLogin from "@/components/RequireLogin";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireLogin>
      <div>
        <PageHeader />
        {children}
      </div>
    </RequireLogin>
  );
}
