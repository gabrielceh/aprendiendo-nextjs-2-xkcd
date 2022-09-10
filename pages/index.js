import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import fs from 'node:fs/promises';

import { useI18N } from 'context/i18n';

import Layout from 'components/Layout';

export default function Home({ latestComics }) {
  const { t } = useI18N();

  return (
    <>
      <Head>
        {/* <title>xkcd - Comics for developers</title> */}
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h2 className="text-3xl font-bold text-center mb-8">{t('LATEST_COMICS')}</h2>

        <section className="grid grid-cols-1 gap-5 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3">
          {latestComics.map((comic) => (
            <Link key={comic.id} href={`/comic/${comic.id}`}>
              <a className="mb-4 pb-4 mx-auto cursor-pointer">
                <h3 className="font-semibold text-center text-sm pb-2">{comic.safe_title}</h3>
                <Image src={comic.img} alt={comic.alt} width={comic.width} height={comic.height} />
              </a>
            </Link>
          ))}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  // leemos los archivos que tenemos guardados con fs
  const files = await fs.readdir('./comics');
  const latestComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8');
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);
  // console.log(latestComics);
  return {
    props: {
      latestComics,
    },
  };
}
