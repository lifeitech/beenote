import getclient from '@utils/pb-server';
import VocabularyItem from './VocabularyItem';
import Title from './UpdateTitle'
import CreateWord from './CreateWord';

export default async function Home({ params }: any) {
  const url = params.url; // user-defined url only, no lang info
  const client = getclient();
  const words = await client.collection('vocabulary').getFullList(1, {filter: `url="${url}"`, sort: 'created'});
  // get document title
  const words_doc = await client.collection('vocabulary_doc').getFirstListItem(`url="${url}"`);
  const id = words_doc.id;
  const title = words_doc.title;
  const lang = words_doc.lang;

  return (
    <div className="ml-4">
    <Title id={id} title={title} /*url={url} lang={lang}*/ />
    <div className="flex flex-wrap gap-2">
      {words.map(item => { 
            return <VocabularyItem key={item.id}
                            id = {item.id}
                            word={item.word}
                            part={item.part} 
                            meaning={item.meaning}
                            audio={item.audio}
                            image={item.image}
                    />;
          })}

    </div>

    <CreateWord lang={lang} url={url}/>

    </div>

    )
}