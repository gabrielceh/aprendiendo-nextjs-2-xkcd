import { useRef, useState } from 'react';

import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const router = useRouter();

  const { locale, locales } = useRouter();

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();

    if (!q) return setResults([]);

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const q = getValue();
    if (!q) return;

    router.push(`/search?q=${searchRef.current.value}`);
  };

  const restOfLocales = locales.filter((l) => l !== locale);

  return (
    <div className="flex justify-between items-center max-w-xl h-14 mx-auto mb-4 p-4 border-b-[1px]">
      <h1 className="font-bold">
        <NextLink href="/">
          <a>
            Next <span className="font-light">xkcd</span>
          </a>
        </NextLink>
      </h1>

      <nav>
        <ul className="flex felx-row gap-3 items-center">
          <li className="text-sm font-bold">
            <NextLink href="/">
              <a>Home</a>
            </NextLink>
          </li>

          {/* Boton para cambiar la url del idioma */}
          <li className="text-sm font-bold">
            <NextLink href="/" locale={restOfLocales[0]}>
              <a>{restOfLocales[0]}</a>
            </NextLink>
          </li>

          <li>
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                ref={searchRef}
                onChange={handleChange}
                placeholder="Buscar"
                className="border-slate-200 border-[1px] px-2 rounded-lg"
                autoComplete="off"
              />
            </form>

            <div className="relative z-10 ">
              {Boolean(results.length) /*&& searchRef.current.value*/ && (
                <div className="backdrop-blur-md bg-white/30 absolute top-2 left-0 w-full rounded-md max-h-80 overflow-hidden overflow-y-auto shadow-md">
                  <ul>
                    <li className="text-sm font-semibold mb-2 p-1 text-slate-500 hover:bg-zinc-900 hover:text-slate-50">
                      <NextLink href={`/search?q=${getValue()}`}>
                        <a className="flex justify-start items-center ">
                          Ver {results.length} resultados
                        </a>
                      </NextLink>
                    </li>
                    {results.map((result) => (
                      <li
                        key={result.id}
                        className="text-sm font-semibold mb-2 p-1 hover:bg-zinc-900 hover:text-white"
                      >
                        <NextLink href={`/comic/${result.id}`}>
                          <a className="flex justify-start items-center">
                            <Image src={result.img} alt={result.alt} width="40" height="40" />
                            <div className="ml-2">
                              <span>{result.title}</span>
                            </div>
                          </a>
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
