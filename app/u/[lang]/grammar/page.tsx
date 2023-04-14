import getclient from '@utils/pb-server';
import CreateGrammar from './CreateGrammar';
import DeleteGrammar from './DeleteGrammar';
import Block from '@utils/Block';

export default async function Home({ params }: any) {

  const lang = params.lang;
  const client = getclient();
  const grammar_docs = await client.collection('grammar').getFullList(1, {filter: `lang="${lang}"`});


  return (
    <div>
    <div className="text-4xl p-5">Grammar Collections</div>

    <div className="flex flex-col gap-10 m-5">
      {grammar_docs.map(item => {
        return (
        <div key={item.id} className="flex flex-row gap-5 items-center">
          <Block key={item.id} link={`/u/${lang}/grammar/${item.url}`}>
            {item.title}
            </Block>
          <DeleteGrammar key={item.id} id={item.id} />
        </div>)
      })}

      <CreateGrammar lang={lang}/>      
    </div>
    </div>
    )
}