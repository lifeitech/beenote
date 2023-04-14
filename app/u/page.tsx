import getclient from '@utils/pb-server'
import CreateLanguage from './CreateLang'
import ProfileDrop from '@utils/ProfileDrop'
import Block from '@utils/Block'
import LangIcon from '@utils/LangIcon'
import DeleteLang from './DeleteLang'

export default async function Home() {
  const client = getclient();
  const res = await client.collection('language').getFullList({sort:'created'});
  const langlist = res.map((item) => item.lang);

  return (
    <>
    <div className="p-5 bg-base-100 flex flex-col items-end">
      <ProfileDrop />
    </div>
    <div className="min-h-screen">
    <div className="text-center">
    <h1 className="text-3xl font-bold py-10">Language Notebooks</h1>
      <div className="flex flex-col gap-5 p-10 items-center">
        {res.map(item => {
          // return <Lang key={item.id} lang={item.lang} name={item.name}/>;
          return (
          <div key={item.id} className="flex flex-col gap-10 items-center">
          <Block key={item.id} link={`/u/${item.lang}`}>
                    <div className="flex flex-row gap-5 items-center">
                    <LangIcon lang={item.lang} size={32}/>
                    {item.name}
                    </div>
            </Block>
            {/* <DeleteLang key={item.id} id={item.id}/> */}
            </div>
                  )
        })}

        <CreateLanguage created={langlist}/>
    </div>
    </div>
    </div>
    </>
    )
}
