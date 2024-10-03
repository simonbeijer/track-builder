import FileInput from "./components/FileInput.jsx";
export default function Home() {
  return (
    <div className="flex flex-col flex-wrap gap-2 bg-black justify-between relative h-[100vh]">
      <header className="h-12" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
        Header
      </header>
      <main className="max-w-5xl mx-5 lg:mx-auto w-full min-h-[60vh] flex justify-center items-center" style={{ backgroundColor: 'var(--color-purple)' }}>
        <div className="h-48 w-full flex justify-center items-center" style={{ backgroundColor: 'var(--color-blue)' }}>
          <p className="text-white">Children</p>
          <FileInput label="FILE"></FileInput>
        </div>
      </main>
      <footer className="h-20" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
        Footer
      </footer>
    </div>
  );
}
