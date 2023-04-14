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
    <Title id={id} title={title} /*url={url} lang={lang}*/  />

    {/* <div className="flex flex-row flex-wrap max-w-max bg-secondary border-l-4 border-l-transparent rounded-lg h-fit items-center mb-2 py-2 pr-12">
    <div className="font-bold font-mono text-lg w-32 flex justify-center">word</div>
    <div className="divider divider-horizontal p-0 m-0"></div>
    <div className="font-bold font-mono text-lg w-12 flex justify-center">part</div>
    <div className="divider divider-horizontal p-0 m-0"></div>
    <div className="font-bold font-mono text-lg w-32 flex justify-center">pronunciation</div>
    <div className="divider divider-horizontal p-0 m-0"></div>
    <div className="font-bold font-mono text-lg w-48 flex justify-center">meaning</div>
    <div className="divider divider-horizontal p-0 m-0"></div>
    <div className="font-bold font-mono text-lg w-20 flex justify-center">audio</div>
    <div className="divider divider-horizontal p-0 m-0"></div>
    <div className="font-bold font-mono text-lg w-32 flex justify-center">visualization</div>
    <div className="divider divider-horizontal p-0 m-0"></div>
    </div> */}
    {/* <div className="divider"></div>  */}
    <div className="flex flex-wrap gap-2">
      {words.map(item => { 
            return <VocabularyItem key={item.id}
                            id = {item.id}
                            word={item.word}
                            part={item.part} 
                            pronun={item.pronun}
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

