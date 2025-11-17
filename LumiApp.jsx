// LumiApp.jsx — default export React component (Tailwind optional)
import React from 'react'

export default function LumiApp(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05021a] to-[#030116] text-white font-sans">
      <header className="flex items-center justify-between p-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6f2bff] to-[#ca6cff] flex items-center justify-center font-bold">L</div>
          <div>
            <div className="font-bold text-xl">LUMI</div>
            <div className="text-sm text-gray-300">LumiVerse — Community Token</div>
          </div>
        </div>
        <nav className="space-x-6 text-sm text-gray-200">
          <a href="#about">About</a>
          <a href="#tokenomics">Tokenomics</a>
          <a href="#roadmap">Roadmap</a>
        </nav>
      </header>

      <main className="p-8 grid lg:grid-cols-2 gap-8">
        <section>
          <h1 className="text-4xl font-extrabold leading-tight">Welcome to LumiVerse</h1>
          <p className="mt-4 text-lg text-gray-300">Decentralized community token on Polygon — Fair-launch model: 17M circulating.</p>
          <div className="mt-6">
            <a className="inline-block px-4 py-2 border rounded-lg">Open Whitepaper</a>
          </div>
        </section>

        <aside className="bg-white/5 p-6 rounded-xl">
          <h3 className="font-semibold">Snapshot</h3>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="p-3 bg-white/3 rounded">Total Supply: 20,000,000</div>
            <div className="p-3 bg-white/3 rounded">Circulating: 17,000,000</div>
            <div className="p-3 bg-white/3 rounded">Example Price: 10 USDT = 17,000,000 LUMI</div>
          </div>
        </aside>
      </main>

      <section className="p-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#050224] to-[#05021a] p-6 rounded-xl">
          <h2 className="text-2xl">Roadmap</h2>
          <ol className="mt-4 list-decimal ml-6 text-gray-300">
            <li>Website & Whitepaper</li>
            <li>Community growth</li>
            <li>Prepare LP when funding available</li>
            <li>Submit to CMC & CG</li>
          </ol>
        </div>
      </section>

      <footer className="p-6 text-sm text-gray-400">&copy; LUMI — LumiVerse</footer>
    </div>
  )
}
