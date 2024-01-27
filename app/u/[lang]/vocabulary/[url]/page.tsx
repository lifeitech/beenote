import getclient from '@utils/pb-server';
import Title from './Title'
import WordList from './WordList';
import CreateWord from './CreateWord';

export default async function Home({ params }: any) {
  const url = params.url; // user-defined url only, no lang info
  const client = getclient();
  const words = await client.collection('vocabulary').getFullList(1, {filter: `url="${url}"`, sort: 'created'});
  // console.log(words);
  // get document title
  const words_doc = await client.collection('vocabulary_doc').getFirstListItem(`url="${url}"`);
  const id = words_doc.id;
  const title = words_doc.title;
  const lang = words_doc.lang;

  return (
    <div className="ml-4">
      <Title id={id} title={title} /*url={url} lang={lang}*/ />
      <WordList words={JSON.parse(JSON.stringify(words))}/>
      <CreateWord lang={lang} url={url}/>
    </div>
    // <div></div>

    )
}