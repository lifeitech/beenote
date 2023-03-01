import getclient from '@utils/pb-server';
import CreateVocabulary from './CreateVocabulary';
import Block from '@utils/Block';
import DeleteVocabulary from './DeleteVocabulary';

export default async function Home({ params }: any) {
  
  const lang = params.lang;
  const client = getclient();
  const words_docs = await client.collection('vocabulary_doc').getFullList(1, {filter: `lang="${lang}"`});

  return (
    <div>
    <div className="text-4xl p-5">Vocabulary Notebooks</div>
    <div className="flex flex-wrap gap-10 m-5">
    {words_docs.map(item => {
              return (
                <div key={item.id} className='flex flex-col gap-10 items-stretch'>
                <Block key={item.id} link={`/u/${lang}/vocabulary/${item.url}`}>{item.title}</Block>
                <DeleteVocabulary id={item.id}/>
                </div>
              ) 
        })} 
    <CreateVocabulary lang={lang}/> 
    </div>
    </div>
    )
}