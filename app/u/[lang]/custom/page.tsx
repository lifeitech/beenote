import getclient from '@utils/pb-server';
import CreateCustom from './CreateCustom';
import DeleteCustom from './DeleteCustom';
import Block from '@utils/Block';

export default async function Home({ params }: any) {

  const lang = params.lang;
  const client = getclient();
  const custom_docs = await client.collection('custom').getFullList(1, {filter: `lang="${lang}"`});

  return (
    <div>
    <div className="text-4xl p-5">Custom Notebooks</div>
    <div className="flex flex-wrap gap-10 m-5">
      {custom_docs.map(item => {
        return (
        <div key={item.id} className="flex flex-col gap-10 items-stretch">
          <Block key={item.id} link={`/u/${lang}/custom/${item.url}`}>
            {item.title}
            </Block>
          <DeleteCustom key={item.id} id={item.id} />
        </div>)
      })}

      <CreateCustom lang={lang}/>      
    </div>
    </div>
    )
}