import getclient from '@utils/pb-server'
import CreateLanguage from './CreateLang'
import ProfileDrop from '@utils/ProfileDrop'
import Block from '@utils/Block'
import LangIcon from '@utils/LangIcon'
import DeleteLang from './DeleteLang'

export default async function Home() {
  const client = getclient();
  const res = await client.collection('language').getFullList();
  const langlist = res.map((item) => item.lang);

  return (
    <>
    <div className="p-5 bg-base-100 flex flex-col items-end">
      <ProfileDrop />
    </div>
    <div className="min-h-screen">
    <div className="text-center">
    <h1 className="text-3xl font-bold pt-10 pb-10">Language Notebooks</h1>
      <div className="flex flex-wrap gap-10 m-10">
        {res.map(item => {
          // return <Lang key={item.id} lang={item.lang} name={item.name}/>;
          return (
          <div key={item.id} className="flex flex-col gap-10 items-stretch">
          <Block key={item.id} link={`/u/${item.lang}`}>
                    <div className="flex flex-col gap-2 items-center">
                    <LangIcon lang={item.lang} size={50}/>
                    {item.name}
                    </div>
            </Block>
            <DeleteLang key={item.id} id={item.id}/>
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
