import UploadFile from "@/components/UploadFile";

export default function Home() {
  return (
    <>
      <nav className="py-4 px-20 border-b">Hello</nav>

      <main className="py-4 px-20 space-y-4">
        <UploadFile />
      </main>
    </>
  );
}
