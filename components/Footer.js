export function Footer() {
  return (
    <>
      <footer className="text-center py-4 max-w-xl mx-auto border-t-[1px] border-t-slate-200">
        <a
          href="https://xkcd.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#191819] hover:text-slate-400 hover:underline hover:decoration-wavy hover:decoration-slate-400"
        >
          All comics by <span className="font-bold">XKCD</span>
        </a>
      </footer>
    </>
  );
}
