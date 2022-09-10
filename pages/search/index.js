import Head from 'next/head';

import Layout from 'components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { search } from 'services/search';
import { useI18N } from 'context/i18n';

export default function Search({ query, results = [] }) {
  const { t } = useI18N();
  // const titlePage = `xkcd - Results for: ${query}`;
  return (
    <>
      <Head>
        {/* <title>{titlePage}</title> */}
        <title>{t('SEARCH_RESULTS_TITLE', results.length, query)}</title>
        <meta name="description" content={`Search Results for ${query}`} />
      </Head>

      <Layout>
        <div>
          <h1 className="text-xl pb-2 mb-4 border-b-[1px] border-slate-100">
            Resultados para: <span className="font-bold">{query}</span>
          </h1>
          {results.map((result) => (
            <Link href={`/comic/${result.id}`} key={result.id}>
              <a className="mb-4 p-2 border-[1px] border-slate-200 rounded-lg flex flex-row justify-start items-center hover:bg-slate-200">
                <Image
                  src={result.img}
                  alt={result.alt}
                  width="50"
                  height="50"
                  className="rounded-full"
                />
                <div className="ml-2">
                  <span className="text-slate-800">{result.title}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log(context);
  const { query } = context;
  const { q = '' } = query;

  const { results } = await search({ query: q });

  return {
    props: {
      query: q,
      results,
    },
  };
}
