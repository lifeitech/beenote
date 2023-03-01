import Link from 'next/link';
import getclient from '@utils/pb-server';
import 'remixicon/fonts/remixicon.css'
import ProfileDrop from '@utils/ProfileDrop';
import LangIcon from '@utils/LangIcon';


export default async function LanguageLayout({children, params}: {children: React.ReactNode, params: any}) {
  const lang = params.lang;
  const client = getclient();
  const langitem = await client.collection('language').getFirstListItem(`lang="${lang}"`);
  const grammar_docs = await client.collection('grammar').getFullList(1, {filter: `lang="${lang}"`});
  const custom_docs = await client.collection('custom').getFullList(1, {filter: `lang="${lang}"`});
  const words_docs = await client.collection('vocabulary_doc').getFullList(1, {filter: `lang="${lang}"`});

  return (
    <div className="drawer drawer-mobile z-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">

      <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><i className="ri-menu-unfold-fill"></i></label>

      <div className="pb-0 pt-5 pr-5 bg-base-100 flex flex-col items-end">
        <ProfileDrop />
      </div>

      {children}

      </div> 

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 pt-16 w-56 bg-primary text-base-content">

          <li><Link href={`/u`}><i className="ri-arrow-left-circle-line"></i>Languages</Link></li>

          <li><Link href={`/u/${lang}`}><LangIcon lang={lang} size={30}/> <div className="text-3xl font-bold">{langitem.name}</div></Link></li>

          <li><Link href={`/u/${lang}/alphabet`}><i className="ri-character-recognition-fill"></i> Alphabet</Link></li>


          <li><Link href={`/u/${lang}/vocabulary`}><i className="ri-message-fill"></i>Vocabulary</Link></li>

          {words_docs.length == 0 ? null : 
          <ul className="rounded-box w-48 p-2 bg-primary-focus">
            {words_docs.map(item => {
              return <li key={item.id}><Link href={`/u/${lang}/vocabulary/${item.url}`}>{item.title}</Link></li>
            })}      
          </ul>}

          <li><Link href={`/u/${lang}/grammar`}><i className="ri-book-3-fill"></i> Grammar</Link></li>

          {grammar_docs.length == 0? null : 
          <ul className="rounded-box w-48 p-2 bg-primary-focus">
            {grammar_docs.map(item => {
              return <li key={item.id}><Link href={`/u/${lang}/grammar/${item.url}`}>{item.title}</Link></li>
            })}      
          </ul> }

          <li><Link href={`/u/${lang}/custom`}><i className="ri-user-star-fill"></i> Custom</Link></li>

          {custom_docs.length == 0? null : 
          <ul className="rounded-box w-48 p-2 bg-primary-focus">
            {custom_docs.map(item => {
              return <li key={item.id}><Link href={`/u/${lang}/custom/${item.url}`}>{item.title}</Link></li>
            })}      
          </ul> }

        </ul>
      
      </div>

    </div>
    )

}
