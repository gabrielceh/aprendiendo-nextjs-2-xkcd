import React from 'react';
import { readFile, stat, readdir } from 'fs/promises';
import { basename } from 'path';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Layout from 'components/Layout';

export default function Comic({
  id,
  img,
  alt,
  safe_title,
  width,
  height,
  prevId,
  nextId,
  hasPrev,
  hasNext,
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <section className="max-w-lg mx-auto px-4">
          <h2 className="font-bold text-2xl text-center mb-4">{safe_title}</h2>
          <div className="max-w-xs mx-auto mb-4">
            <Image src={img} alt={alt} layout="responsive" width={width} height={height} />
          </div>
          <p className="text-sm">{alt}</p>
          {/* Create a pagination */}
          <div className="flex justify-between mt-4">
            {hasPrev && (
              <Link href={`/comic/[id]`} as={`/comic/${prevId}`}>
                <a className="text-gray-900 cursor-pointer hover:underline hover:decoration-wavy hover:decoration-slate-500">
                  ⇐ Previous
                </a>
              </Link>
            )}

            {hasNext && (
              <Link href={`/comic/[id]`} as={`/comic/${nextId}`}>
                <a className="self-end text-gray-900 cursor-pointer hover:underline hover:decoration-wavy hover:decoration-slate-500">
                  Next ⇒
                </a>
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}

// usamos locales en caso de querer traducciones
export async function getStaticPaths({ locales }) {
  // paginas sin traduccion
  // const files = await readdir('./comics');
  // const paths = files.map((file) => {
  //   const id = basename(file, '.json');
  //   return { params: { id } };
  // });

  // return {
  //   paths,
  //   fallback: false,
  // };

  const files = await readdir('./comics');
  let paths = [];

  locales.forEach((locale) => {
    const pathsForLocale = files.map((file) => {
      const id = basename(file, '.json');
      return { params: { id }, locale };
    });
    paths = [...paths, ...pathsForLocale];
  });
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  const content = await readFile(`./comics/${id}.json`, 'utf-8');
  const comic = await JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  // Validamos si existen los archivos para poder hacer la navegacion
  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrev = prevResult.status === 'fulfilled';
  const hasNext = nextResult.status === 'fulfilled';

  return {
    props: {
      ...comic,
      hasPrev,
      hasNext,
      nextId: hasNext ? nextId : null,
      prevId: hasPrev ? prevId : null,
    },
  };
}
