import getclient from '@utils/pb-server';
import CreateCollection from './CreateCollection';
import Block from '@utils/Block';
import DeleteCollection from './DeleteCollection';

export default async function Home({ params }: any) {
  
  const lang = params.lang;
  const client = getclient();
  const words_docs = await client.collection('vocabulary_doc').getFullList(1, {filter: `lang="${lang}"`});

  return (
    <div>
    <div className="text-4xl p-5">Vocabulary Collections</div>
    <div className="flex flex-col gap-10 m-5">
    {words_docs.map(item => {
              return (
                <div key={item.id} className='flex flex-row gap-5 items-center'>
                <Block key={item.id} link={`/u/${lang}/vocabulary/${item.url}`}>{item.title}</Block>
                <DeleteCollection id={item.id}/>
                </div>
              ) 
        })} 
    <CreateCollection lang={lang}/> 
    </div>
    </div>
    )
}